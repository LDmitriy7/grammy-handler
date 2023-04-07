import { Composer, Context, Middleware, NextFunction } from "./deps.ts"

type MaybePromise<T> = T | Promise<T>

function pass<C extends Context>(_ctx: C, next: NextFunction) {
  return next()
}

class BaseHandler<CT extends Context> extends Composer<CT> {
  protected constructorClass: typeof Composer = Composer

  filter<D extends CT>(
    predicate: (ctx: CT) => ctx is D,
    ...middleware: Array<Middleware<D>>
  ): Composer<D>
  filter(
    predicate: (ctx: CT) => MaybePromise<boolean>,
    ...middleware: Array<Middleware<CT>>
  ): Composer<CT>
  filter(
    predicate: (ctx: CT) => MaybePromise<boolean>,
    ...middleware: Array<Middleware<CT>>
  ) {
    const composer = new this.constructorClass(...middleware)
    this.branch(predicate, composer, pass)
    return composer
  }
}

export default BaseHandler
