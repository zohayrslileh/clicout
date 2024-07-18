import { stream } from "hono/streaming"
import Search from "@/Core/Search"
import sleep from "@/Tools/Sleep"
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

        // Create promise
        await new Promise(async function () {

            // Wait generate page
            do {

                // Search page
                var page = Search.pages[recordId]

                // Wait same time
                await sleep(2000)

            } while (!page)

            // Create screencast
            const screencast = await page.screencast()

            // On screencast data
            screencast.on("data", function (data: Buffer) {

                // Write to stream
                stream.write(data)
            })
        })
    })
}