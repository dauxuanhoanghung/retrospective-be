import dotenv from 'dotenv'
import path from 'path'

// Load environment variables from the .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') })

class ConfigService {
  private readonly envConfig: { [key: string]: string | undefined }

  constructor() {
    this.envConfig = process.env
  }

  get<T = string>(key: string, defaultValue?: T): T {
    const value = this.envConfig[key]

    if (value === undefined) {
      return defaultValue as T
    }

    return this.parseValue<T>(value, defaultValue)
  }

  private parseValue<T>(value: string, defaultValue?: T): T {
    if (typeof defaultValue === 'number') {
      return parseFloat(value) as T
    }

    if (typeof defaultValue === 'boolean') {
      return (value === 'true') as T
    }

    // Default case: return as string
    return value as T
  }
}

export default ConfigService
