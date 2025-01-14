import { IResolvers } from '@graphql-tools/utils'
import { IResolver } from './types'

/**
 * ResolverRegistry is a class that holds all the resolvers and merges them into a single object.
 */
export class ResolverRegistry {
  /**
   * @type {IResolver[]}
   */
  private instances: IResolver[] = []
  /**
   * @type {IResolver}
   */
  private default: IResolver = {}

  /**
   *
   * @param {IResolver[]} resolvers
   * @param {IResolver} defaultResolvers
   */
  constructor(resolvers: IResolver[] = [], defaultResolvers: IResolver = {}) {
    this.instances = resolvers
    this.default = defaultResolvers
  }

  addResolver(resolver: IResolver): void {
    this.instances.push(resolver)
  }

  build(): IResolvers {
    const operations: (keyof IResolver)[] = ['Query', 'Mutation', 'Subscription']
    const combinedResolver: IResolvers = {}

    for (const op of operations) {
      const mergedOps = this.mergeOperations(op)
      if (mergedOps) {
        combinedResolver[op] = mergedOps
      }
    }

    return combinedResolver
  }

  private mergeOperations(type: keyof IResolver) {
    const mergedOps = this.instances.reduce(
      (merged, resolver) => {
        if (resolver[type]) {
          return { ...merged, ...resolver[type] }
        }
        return merged
      },
      { ...this.default[type] }
    )

    return Object.keys(mergedOps).length > 0 ? mergedOps : undefined
  }
}
