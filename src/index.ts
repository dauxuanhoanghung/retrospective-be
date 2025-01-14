import { expressMiddleware } from '@apollo/server/express4'
import cors from 'cors'
import { Express, Request, Response } from 'express'
import http from 'http'

import createGraphQLServer from './apollo/server'
import { getGraphqlUploadExpress } from './apollo/utils'
import config from './configs'
import connectToDatabase from './configs/databases'
import logger from './configs/logger'
import createExpressServer from './server'

const server: Express = createExpressServer()

async function bootstrap() {
  const PORT = config.get<number>('PORT', 8080)
  const FRONTEND_HOST = config.get<string>('FRONTEND_HOST', 'http://localhost:3000')

  const apolloServer = createGraphQLServer(http.createServer(server))
  await apolloServer.start()
  await connectToDatabase()
  server.use(
    cors<cors.CorsRequest>({
      origin: FRONTEND_HOST,
      allowedHeaders: ['Authorization', 'Content-Type'],
      credentials: true
    })
  )

  /**
   * REST API routes
   */
  server.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript with Express!')
  })

  /**
   * GraphQL API routes
   */
  const graphqlUploadExpress = await getGraphqlUploadExpress()
  server.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }))
  server.use(expressMiddleware(apolloServer))

  server.listen(PORT, () => {
    logger.info(`🚀 Server listening at: ${PORT}`)
    logger.info(`🗿 GraphQL endpoint: http://localhost:${PORT}/graphql`)
  })
}

bootstrap().catch((err) => {
  logger.error(err)
})
