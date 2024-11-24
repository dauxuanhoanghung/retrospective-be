import { IResolver, ResolverFunction } from '../types'
import { userMutations } from './user.mutation'

class UserResolver implements IResolver {
  Query: { [key: string]: ResolverFunction }
  Mutation: { [key: string]: ResolverFunction }
  Subscription: { [key: string]: ResolverFunction }

  constructor(params: IResolver) {
    this.Query = params.Query || {}
    this.Mutation = params.Mutation || {}
    this.Subscription = params.Subscription || {}
  }
}

const userResolver = new UserResolver({ Mutation: userMutations })

export default userResolver