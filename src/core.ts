import { Context, NextFunction } from "./deps.ts"

export type MaybePromise<T> = T | Promise<T>

export function pass<C extends Context>(_: C, next: NextFunction) {
  return next()
}
