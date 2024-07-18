import { stream } from "hono/streaming"
import Search from "@/Core/Search"
import { Context } from "hono"
import { UUID } from "crypto"

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

    // Search
    const search = await Search.findByRecordId(recordId as UUID)

    // Set Content-Type
    context.header("Content-Type", "video/webm")

    // Set Transfer-Encoding
    context.header("Transfer-Encoding", "chunked")

    // Create stream
    return stream(context, async function (stream) {

        // Create promise
        await new Promise<void>(async function (resolve) {

            // Set chunk method
            const setChunk = async (chunk: Buffer) => stream.write(chunk)

            // On chunk
            Search.broadcast.on(`${search.id}/chunk`, setChunk)

            // On abort
            stream.onAbort(function () {

                // Off chunk
                Search.broadcast.on(`${search.id}/chunk`, setChunk)

                // Resolve
                resolve()
            })
        })
    })
}