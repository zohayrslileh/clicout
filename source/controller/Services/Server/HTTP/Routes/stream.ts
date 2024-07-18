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
    const recordId = context.req.param("record_id")

    // Set Content-Type
    context.header("Content-Type", "video/webm")

    // Set Transfer-Encoding
    context.header("Transfer-Encoding", "chunked")

    // Create stream
    return stream(context, async function (stream) {

    })
}