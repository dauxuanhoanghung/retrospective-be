import { ApolloServer } from '@apollo/server'
import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeTypeDefs } from '@graphql-tools/merge'
import path from 'path'

import { resolvers } from '@/resolvers'

// Merge all loaded type definitions into a single schema
const typesArray = loadFilesSync(path.join(__dirname, '../schemas/**/*.graphql'))
const typeDefs = mergeTypeDefs(typesArray)

const server = new ApolloServer({
  typeDefs,
  resolvers
})

export default server
