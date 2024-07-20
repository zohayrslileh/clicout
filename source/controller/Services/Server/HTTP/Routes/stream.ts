import { stream } from "hono/streaming"
import { Context } from "hono"

/*
|-----------------------------
| Stream
|-----------------------------
|
|
*/
export default async function (context: Context) {

    // Record id
    context.req.param("record_id")

    // Create stream
    return stream(context, async function (_) {
    })
}