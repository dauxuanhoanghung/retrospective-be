import { Request } from 'express'
import config from '~/configs'

export const commonQueries = {
  serverInfo: (_: any, __: any, { req }: { req: Request }) => {
    return {
      host: req?.hostname || 'localhost',
      databaseUri: config.get('MONGODB_URI'),
      databaseUser: config.get('MONGODB_USER'),
      databasePassword: config.get('MONGODB_PASSWORD'),
      frontendUrl: config.get('FRONTEND_HOST'),
      environment: process.env.NODE_ENV || 'development'
    }
  }
}
