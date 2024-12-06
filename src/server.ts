import express, { Express } from 'express'

export default function createExpressServer(): Express {
  const server: Express = express()
  server.use(
    express.json(),
    express.urlencoded({
      extended: true,
      limit: '50mb'
    })
  )

  return server
}
