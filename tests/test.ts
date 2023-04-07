import Handler from "../mod.ts"
import { Context } from "../src/deps.ts"

type Command = "test" | "admin"
const handler = new Handler<Context, Command>()

handler.groups.start((ctx) => ctx.reply("group"))
handler.start((ctx) => ctx.reply("start"))
handler.privateChat.cmd("admin", (ctx) => ctx.reply("admin"))
handler.cmd("test", (ctx) => ctx.reply("test"))

export { handler }
