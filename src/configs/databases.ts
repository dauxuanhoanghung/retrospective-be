// src/configs/database.ts
import mongoose from 'mongoose'
import logger from '~/configs/logger'
import ConfigService from './config.service'

const config = new ConfigService()

const connectToDatabase = async () => {
  const mongoUri = config.get<string>('MONGODB_URI', 'mongodb://localhost:27017/mydatabase')
  const user = config.get<string>('MONGODB_USER', '')
  const password = config.get<string>('MONGODB_PASSWORD', '')
  try {
    await mongoose.connect(mongoUri, {
      user,
      pass: password
    })
    logger.info('Successfully connected to the database')
  } catch (error) {
    logger.error('Database connection error:', error)
    process.exit(1)
  }
}

export default connectToDatabase
