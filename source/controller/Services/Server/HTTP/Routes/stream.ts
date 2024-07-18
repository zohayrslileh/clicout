import HttpException from "@/Services/Server/HTTP/Exception/Exceptions"
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

    // Search page
    const page = Search.pages[recordId]

    // Check page
    if (!page) throw new HttpException("Not found this stream")

    // Set Content-Type
    context.header("Content-Type", "video/webm")

    // Set Transfer-Encoding
    context.header("Transfer-Encoding", "chunked")

    // Create stream
    return stream(context, async function (stream) {

        // Create promise
        await new Promise<void>(async function (resolve) {

            // Create screencast
            const screencast = await page.screencast()

            // On stream abort
            stream.onAbort(async function () {

                // Stop screencast
                await screencast.stop()

                // Resolve
                resolve()
            })

            // On screencast data
            screencast.on("data", function (data: Buffer) {

                // Write to stream
                stream.write(data)
            })
        })
    })
}