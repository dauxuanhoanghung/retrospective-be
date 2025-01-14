import jwt from 'jsonwebtoken'

import config from '~/configs'
import ConfigService from '~/configs/config.service'
import { IUser } from '~/models/user.model'
import { IJWTService } from './interfaces'

class JWTService implements IJWTService {
  static readonly SECRET_KEY: string = 'JWT_SECRET'
  static readonly ACCESS_EXPIRES_IN: string = 'JWT_ACCESS_EXPIRES_IN'
  static readonly REFRESH_EXPIRES_IN: string = 'JWT_REFRESH_EXPIRES_IN'

  private readonly secret: string
  private readonly expirations: { access: string; refresh: string }

  /**
   * @constructor
   * @param {ConfigService} configService
   */
  constructor(readonly configService: ConfigService) {
    this.secret = configService.get<string>(JWTService.SECRET_KEY)
    this.expirations = {
      access: configService.get<string>(JWTService.ACCESS_EXPIRES_IN) || '1h',
      refresh: configService.get<string>(JWTService.REFRESH_EXPIRES_IN) || '7d'
    }
  }

  /**
   * Sign a new JWT token
   *
   * @param {IUser} user
   */
  sign(user: IUser, isRefreshToken?: boolean): string {
    const expiresIn = isRefreshToken ? this.expirations.refresh : this.expirations.access

    const payload = {
      id: user.id,
      email: user.email
      // roles: user.roles
    }

    return jwt.sign(payload, this.secret, {
      expiresIn: expiresIn
    })
  }

  /**
   * Verify a JWT token
   *
   * @param {string} token
   */
  verify(token: string, isRefreshToken?: boolean): IUser {
    try {
      const decoded = jwt.verify(token, this.secret) as IUser
      return decoded
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new Error('Token has expired')
      }
      if (error instanceof jwt.JsonWebTokenError) {
        throw new Error('Invalid token')
      }
      throw new Error('Token verification failed')
    }
  }
}

export default new JWTService(config)
