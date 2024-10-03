export const userMutations = {
  login: (_: any, { user }: { user: { email: string; name: string } }) => {
    console.log('User login details:', user)
    return {
      email: user.email,
      name: user.name
    }
  }
}
