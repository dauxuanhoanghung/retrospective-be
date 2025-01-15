import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils'
import { defaultFieldResolver, GraphQLSchema } from 'graphql'

import { IDirective } from '../types'

export class LowerDirective implements IDirective {
  name = 'lower'

  typeDefs(): string {
    return `
      """
      Lower the value of a string field
      """
      directive @${this.name} on FIELD_DEFINITION
    `
  }

  transform(schema: GraphQLSchema): GraphQLSchema {
    return mapSchema(schema, {
      [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
        const upperDirective = getDirective(schema, fieldConfig, this.name)?.[0]
        if (upperDirective) {
          const { resolve = defaultFieldResolver } = fieldConfig
          fieldConfig.resolve = async function (source, args, context, info) {
            const result = await resolve(source, args, context, info)
            if (typeof result === 'string') {
              return result.toLowerCase()
            }
            return result
          }
          return fieldConfig
        }
      }
    })
  }
}
