import { expressMiddleware } from '@apollo/server/express4'
import cors from 'cors'
import { Request, Response } from 'express'

import apolloServer from './apollo/server'
import config from './configs'
import connectToDatabase from './configs/databases'
import logger from './configs/logger'
import server from './server'

const PORT = config.get<number>('PORT', 8080)
const FRONTEND_HOST = config.get<string>('FRONTEND_HOST', 'http://localhost:3000')

server.use(
  '/graphql',
  cors({
    origin: FRONTEND_HOST,
    credentials: true
  })
)

async function start() {
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
