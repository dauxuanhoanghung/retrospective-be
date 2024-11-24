import * as path from 'path'
import { createLogger, format, transports, Logger as WinstonLogger } from 'winston'

export interface Logger {
  info(...args: any[]): void
  warn(...args: any[]): void
  error(...args: any[]): void
  debug(...args: any[]): void
}

/**
 * A app logger class that logs messages to the console and a file.
 */
class AppLogger {
  private logger: WinstonLogger
  private static LOG_DIR = path.resolve(__dirname, '../../logs')

  constructor(filename: string = 'server.log') {
    filename = this.correctizeFilename(filename)
    filename = path.join(AppLogger.LOG_DIR, filename)
    this.logger = createLogger({
      level: 'info',
      format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => {
          return `${timestamp} [${level.toUpperCase()}]: ${message}`
        })
      ),
      transports: [new transports.Console(), new transports.File({ filename })]
    })
  }

  private correctizeFilename(filename: string): string {
    // Replace non-alphanumeric characters with underscores to avoid potential issues with file names.
    filename = filename.replace(/[^a-zA-Z0-9._-]/g, '_')
    return filename.endsWith('.log') ? filename : filename + '.log'
  }

  private formatMessage(args: any[]): string {
    return args.map((arg) => (typeof arg === 'object' ? JSON.stringify(arg) : String(arg))).join(' ')
  }

  info(...args: any[]): void {
    this.logger.info(this.formatMessage(args))
  }

  warn(...args: any[]): void {
    this.logger.warn(this.formatMessage(args))
  }

  error(...args: any[]): void {
    this.logger.error(this.formatMessage(args))
  }

  debug(...args: any[]): void {
    this.logger.debug(this.formatMessage(args))
  }
}

export { AppLogger }
export default new AppLogger()
