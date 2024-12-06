import { expressMiddleware } from '@apollo/server/express4'
import cors from 'cors'
import { Express, Request, Response } from 'express'
import http from 'http'

import createGraphQLServer from './apollo/server'
import config from './configs'
import connectToDatabase from './configs/databases'
import logger from './configs/logger'
import createExpressServer from './server'

const PORT = config.get<number>('PORT', 8080)
const FRONTEND_HOST = config.get<string>('FRONTEND_HOST', 'http://localhost:3000')

const server: Express = createExpressServer()
server.use(
  '/graphql',
  cors<cors.CorsRequest>({
    origin: FRONTEND_HOST,
    allowedHeaders: ['Authorization', 'Content-Type'],
    credentials: true
  })
)

async function start() {
  const apolloServer = createGraphQLServer(http.createServer(server))
  await apolloServer.start()
  await connectToDatabase()
  server.use(expressMiddleware(apolloServer))
  server.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript with Express!')
  })

  server.listen(PORT, () => {
    logger.info(`🚀 Server listening at: ${PORT}`)
    logger.info(`🗿 GraphQL endpoint: http://localhost:${PORT}/graphql`)
  })
}

start().catch((err) => logger.error(err))
