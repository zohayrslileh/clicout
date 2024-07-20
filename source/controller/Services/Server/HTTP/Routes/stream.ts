import { stream } from "hono/streaming"
import Search from "@/Core/Search"
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

    // Search
    const search = await Search.findByRecordId(recordId)

    // Create stream
    return stream(context, async function (stream) {

        // Create promise
        await new Promise<void>(async function (resolve) {

            // Write chunk method
            const writeChunk = async (chunk: Buffer) => await stream.write(chunk)

            // Write recorder chunks
            for (const chunk of search.recorderChunks()) await stream.write(chunk)

            // On chunk
            Search.broadcast.on(`${search.id}/chunk`, writeChunk)

            // On abort
            stream.onAbort(function () {

                // Off chunk
                Search.broadcast.off(`${search.id}/chunk`, writeChunk)

                // Solve promise
                resolve()
            })
        })
    })
}