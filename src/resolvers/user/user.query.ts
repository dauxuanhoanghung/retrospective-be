import logger from '~/configs/logger'
import { User } from '~/models/user.model'

export const userQueries = {
  // getUser: (_: any, { id }: { id: string }) => {
  //   console.log('Getting user with id:', id)
  //   return { id, name: 'John Doe' }
  // },
  users: async (_: any, { filters }) => {
    const { filters: filterArray, logic } = filters
    logger.debug('Filters:', { ...filters })
    return []
  },
  userByEmail: async (_: any, { email }: { email: string }) => {
    logger.debug('Getting user by email:', email)
    return await User.findOne({ email: email })
  }
}
