import { ApolloServer, BaseContext } from '@apollo/server'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeTypeDefs } from '@graphql-tools/merge'
import type http from 'http'
import path from 'path'

import { resolvers } from '@/resolvers'

export default function createGraphQLServer(httpServer: http.Server) {
  // Merge all loaded type definitions into a single schema
  const typesArray = loadFilesSync(path.join(__dirname, '../**/*.graphql'))
  const typeDefs = mergeTypeDefs(typesArray)

  const server = new ApolloServer<BaseContext>({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true })
    ]
  })

  return server
}
