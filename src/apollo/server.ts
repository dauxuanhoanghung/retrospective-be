import { ApolloServer, BaseContext } from '@apollo/server'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeTypeDefs } from '@graphql-tools/merge'
import { makeExecutableSchema } from '@graphql-tools/schema'
import type http from 'http'
import path from 'path'

import { resolvers } from '@/resolvers'
import { printSchema } from 'graphql'
import logger from '~/configs/logger'
import { DirectiveManager } from '~/graphql/directives/registry'

export default function createGraphQLServer(httpServer: http.Server) {
  const directiveManager = new DirectiveManager()

  // Merge all loaded type definitions into a single schema
  const typesArray = loadFilesSync(path.join(__dirname, '../**/*.graphql'))
  const typeDefs = [...directiveManager.getTypeDefs(), mergeTypeDefs(typesArray)]

  let schema = makeExecutableSchema({
    typeDefs,
    resolvers
  })

  schema = directiveManager.applyDirectives(schema)

  logger.debug('GraphQL schema: ', printSchema(schema))

  const server = new ApolloServer<BaseContext>({
    schema,
    csrfPrevention: true,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true })
    ]
  })

  return server
}
