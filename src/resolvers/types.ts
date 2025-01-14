export type ResolverFunction = (...args: any[]) => any

export type MiddlewareFunction = (resolver: ResolverFunction, ...args: any[]) => Promise<any>

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
