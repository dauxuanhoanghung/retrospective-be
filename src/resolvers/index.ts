import { IResolvers } from '@graphql-tools/utils'

import CommonResolver from './common'
import { ResolverRegistry } from './resolver.registry'
import { IResolver } from './types'
import UserResolver from './user'

const defaultResolvers: IResolver = {
  Query: {
    hello: (_: any, args: { name?: string }) => 'Hello from Apollo Server! ' + args.name
  }
}

const registry = new ResolverRegistry([CommonResolver, UserResolver], defaultResolvers)

export const resolvers: IResolvers = registry.build()
