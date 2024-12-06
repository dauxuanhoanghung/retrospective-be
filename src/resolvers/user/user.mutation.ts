import userService from '../../services/user.service'

export const userMutations = {
  login: async (_: any, { user }: { user: { email: string; password: string } }) => {
    try {
      const { token, user: loggedInUser } = await userService.login(user)
      return {
        success: true,
        message: 'Login successful',
        token,
        user: loggedInUser
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        token: null,
        user: null
      }
    }
  },
  signup: async (
    _: any,
    { user }: { user: { email: string; name: string; password: string; confirmPassword: string } }
  ) => {
    try {
      const newUser = await userService.signup(user)
      return {
        success: true,
        message: 'Signup successful',
        user: newUser
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        user: null
      }
    }
  }
}
