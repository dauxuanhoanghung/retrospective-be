// directives/DirectiveManager.ts
import { GraphQLSchema } from 'graphql'

import { IDirective } from '../types'
import { LowerDirective } from './lower.directive'
import { UpperDirective } from './upper.directive'

export class DirectiveManager {
  private directives: IDirective[] = []

  constructor() {
    this.directives = [new UpperDirective(), new LowerDirective()]
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
