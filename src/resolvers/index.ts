import { IResolvers } from '@graphql-tools/utils'

import commonResolver from './common'
import userResolver from './user'

export const resolvers: IResolvers = {
  Query: {
    hello: (_: any, args: { name?: string }) => 'Hello from Apollo Server! ' + args.name,
    ...userResolver.Query,
    ...commonResolver.Query
  },
  Mutation: {
    ...userResolver.Mutation
  },
  Subscription: {
    ...userResolver.Subscription
  }
}
