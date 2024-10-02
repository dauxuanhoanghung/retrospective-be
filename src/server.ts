import express, { Express } from 'express'

const server: Express = express()
server.use(
  express.json(),
  express.urlencoded({
    extended: true,
    limit: '50mb',
  })
)
export default server
