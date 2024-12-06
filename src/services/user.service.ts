// src/services/user.service.ts
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import ConfigService from '~/configs/config.service'
import logger from '~/configs/logger'
import config from '../configs'
import { IUser, User } from '../models/user.model'
import { IUserService } from './interfaces'

class UserService implements IUserService {
  private readonly secretKey: string
  constructor(config: ConfigService) {
    this.secretKey = config.get<string>('JWT_SECRET', '')
  }

  private normalizeEmail(email: string): string {
    const [local, domain] = email.trim().toLowerCase().split('@')
    // For Gmail, remove dots and handle `+` suffix
    if (domain === 'gmail.com' || domain === 'googlemail.com') {
      return local.split('+')[0].replace(/\./g, '') + '@' + domain
    }
    return email.trim().toLowerCase()
  }

  async signup(user: { email: string; name: string; password: string; confirmPassword: string }): Promise<IUser> {
    if (user.password !== user.confirmPassword) {
      throw new Error('Passwords do not match')
    }

    // Normalize email & Check if user already exists
    const normalizedEmail = this.normalizeEmail(user.email)
    const existingUser = await User.findOne({ email: normalizedEmail })
    if (existingUser) {
      throw new Error('Email is already registered')
    }

    const hashedPassword = await bcrypt.hash(user.password, 10)
    const newUser = new User({
      email: user.email,
      name: user.name,
      password: hashedPassword
    })

    await newUser.save()
    logger.debug('User saved', newUser)
    return newUser
  }

  async login(user: { email: string; password: string }): Promise<{ token: string; user: IUser }> {
    const existingUser = await User.findOne({ email: user.email })
    if (!existingUser) {
      throw new Error('User not found')
    }

    const isPasswordValid = await bcrypt.compare(user.password, existingUser.password)
    if (!isPasswordValid) {
      throw new Error('Invalid password')
    }

    const token = jwt.sign({ id: existingUser._id, email: existingUser.email }, this.secretKey, {
      expiresIn: '1h'
    })

    return { token, user: existingUser }
  }
}

export default new UserService(config)
