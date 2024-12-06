import userService from '../../services/user.service'

export const userMutations = {
  login: async (_: any, { user }: { user: { email: string; password: string } }) => {
    const { token, user: loggedInUser } = await userService.login(user)
    return {
      token,
      user: loggedInUser
    }
  },
  signup: async (
    _: any,
    { user }: { user: { email: string; name: string; password: string; confirmPassword: string } }
  ) => {
    const newUser = await userService.signup(user)
    return newUser
  }
}
