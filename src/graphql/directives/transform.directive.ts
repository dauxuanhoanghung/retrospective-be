import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils'
import { defaultFieldResolver, DirectiveLocation, GraphQLSchema } from 'graphql'

import { IDirective } from '../types'
import { captialize, join } from '../utils'

enum TransformType {
  LOWERCASE = 'LOWERCASE',
  UPPERCASE = 'UPPERCASE',
  CAPITALIZE = 'CAPITALIZE',
  REVERSE = 'REVERSE'
}

export class TransformDirective implements IDirective {
  readonly name = 'transform'
  readonly locations = [DirectiveLocation.FIELD_DEFINITION, DirectiveLocation.FIELD]

  typeDefs(): string {
    return `
      """
      Transform directive to apply transformations to string values

      """
      directive @${this.name} (
        """
        The type of transformation to apply
        """
        type: TransformType!
      ) on ${join(this.locations)}
    `
  }

  transform(schema: GraphQLSchema): GraphQLSchema {
    return mapSchema(schema, {
      [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
        const directive = getDirective(schema, fieldConfig, this.name)?.[0]
        if (directive) {
          const { resolve = defaultFieldResolver } = fieldConfig
          const { type } = directive
          fieldConfig.resolve = async function (source, args, context, info) {
            const result = await resolve(source, args, context, info)
            if (typeof result === 'string') {
              return TransformDirective.transformValue(result, type)
            }
            return result
          }
          return fieldConfig
        }
      }
    })
  }

  /**
   * Applies the specified transformation to a string value
   * @param {string} value - The string to transform
   * @param {} type The type of transformation to apply
   * @returns The transformed string
   */
  protected static transformValue(value: string, type: string): string {
    switch (type) {
      case TransformType.LOWERCASE:
        return value.toLowerCase()
      case TransformType.UPPERCASE:
        return value.toUpperCase()
      case TransformType.CAPITALIZE:
        return value
          .split(' ')
          .map((word) => captialize(word))
          .join(' ')
      case TransformType.REVERSE:
        return value.split('').reverse().join('')
      default:
        return value
    }
  }
}
