export type ResolverFunction = (...args: any[]) => any

export interface IResolver {
  Query?: {
    [key: string]: ResolverFunction
  }
  Mutation?: {
    [key: string]: ResolverFunction
  }
  Subscription?: {
    [key: string]: ResolverFunction
  }
}
