import { GraphQLSchema } from 'graphql'

import { IDirective } from '../types'
import { TransformDirective } from './transform.directive'

export class DirectiveManager {
  private directives: IDirective[] = []

  constructor() {
    this.directives = [new TransformDirective()]
  }

  getTypeDefs(): string[] {
    return this.directives.map((directive) => directive.typeDefs())
  }

  applyDirectives(schema: GraphQLSchema): GraphQLSchema {
    return this.directives.reduce((currentSchema, directive) => {
      return directive.transform(currentSchema)
    }, schema)
  }
}
