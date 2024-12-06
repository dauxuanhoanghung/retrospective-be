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
   * @param user
   */
  login(user: { email: string; password: string }): Promise<{ token: string; user: IUser }>
}
