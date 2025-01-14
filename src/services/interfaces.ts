import { IUser } from '~/models/user.model'

export interface IUserService {
  /**
   * Create a new user
   *
   * @param user
   */
  signup(user: { email: string; name: string; password: string; confirmPassword: string }): Promise<IUser>

  /**
   * Log in with the credentials
   *
   * @param {IUser} user
   */
  login(user: { email: string; password: string }): Promise<{ token: string; user: IUser }>
}

export interface IJWTService {
  /**
   * Sign a new JWT token
   *
   * @param {IUser} user
   */
  sign(user: IUser, isRefreshToken?: boolean): string

  /**
   * Verify a JWT token
   *
   * @param {string} token
   */
  verify(token: string, isRefreshToken?: boolean): IUser
}
