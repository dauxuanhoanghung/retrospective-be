import { GraphQLSchema } from 'graphql'

export interface IDirective {
  name: string
  typeDefs(): string
  transform(schema: GraphQLSchema): GraphQLSchema
}
