import {
  ChatTypeContext,
  CommandContext,
  CommandMiddleware,
  Context,
} from "./deps.ts"
import BaseHandlers from "./base.ts"

/** CM - Command */
class Handler<
  CT extends Context,
  CM extends string = "start",
> extends BaseHandlers<CT> {
  protected constructorClass = Handler

  cmd(command: CM | "start", middleware: CommandMiddleware<CT>) {
    const c = super.command(command, middleware)
    return c as Handler<CommandContext<CT>, CM>
  }

  start(middleware: CommandMiddleware<CT>) {
    return this.cmd("start", middleware)
  }

  get privateChat() {
    const c = super.chatType("private")
    return c as Handler<ChatTypeContext<CT, "private">, CM>
  }

  get groups() {
    const c = super.chatType(["group", "supergroup"])
    return c as Handler<ChatTypeContext<CT, "group" | "supergroup">, CM>
  }
}

export { Handler }
