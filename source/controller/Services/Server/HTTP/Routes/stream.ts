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

    // Set content type
    context.header("Content-Type", "video/webm")

    // Record id
    const recordId = context.req.param("record_id")

    // Create stream
    return stream(context, async function (stream) {

    })
}