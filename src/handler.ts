import { MaybePromise, pass } from "./core.ts"
import {
  ChatTypeContext,
  CommandContext,
  CommandMiddleware,
  Composer,
  Context,
  Middleware,
} from "./deps.ts"

export class Handler<C extends Context = Context, CM extends string = string>
  extends Composer<C> {
  command(
    command: CM,
    middleware: CommandMiddleware<C>,
  ): Handler<CommandContext<C>, CM> {
    return super.command(command, middleware) as Handler<CommandContext<C>, CM>
  }

  start(middleware: CommandMiddleware<C>) {
    return this.command("start" as CM, middleware)
  }

  get private() {
    const c = this.chatType("private")
    return c as Handler<ChatTypeContext<C, "private">, CM>
  }

  get groups() {
    const c = this.chatType(["group", "supergroup"])
    return c as Handler<ChatTypeContext<C, "group" | "supergroup">, CM>
  }

  filter<D extends C>(
    predicate: (ctx: C) => ctx is D,
    ...middleware: Array<Middleware<D>>
  ): Handler<D, CM>
  filter(
    predicate: (ctx: C) => MaybePromise<boolean>,
    ...middleware: Array<Middleware<C>>
  ): Handler<C, CM>
  filter(
    predicate: (ctx: C) => MaybePromise<boolean>,
    ...middleware: Array<Middleware<C>>
  ) {
    const handler = new Handler<C, CM>(...middleware)
    this.branch(predicate, handler, pass)
    return handler
  }
}
