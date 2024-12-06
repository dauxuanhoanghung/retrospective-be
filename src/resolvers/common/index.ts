import { IResolver, ResolverFunction } from '../types'
import { commonQueries } from './common.query'

class CommonResolver implements IResolver {
  Query: { [key: string]: ResolverFunction }

  constructor(params: IResolver) {
    this.Query = params.Query || {}
  }
}

const commonResolver = new CommonResolver({ Query: commonQueries })

export default commonResolver
