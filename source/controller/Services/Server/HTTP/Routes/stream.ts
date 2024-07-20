import HttpException from "@/Services/Server/HTTP/Exception/Exceptions"
import { PuppeteerScreenRecorder } from "puppeteer-screen-recorder"
import { stream } from "hono/streaming"
import { PassThrough } from "stream"
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

    // Page
    const page = Search.pages[recordId]

    // Check page
    if (!page) throw new HttpException("This record was not found")

    // Set Content-Type
    context.header("Content-Type", "video/")

    // Create stream
    return stream(context, async function (stream) {

        // Create promise
        await new Promise(async function () {

            // Create recorder
            const recorder = new PuppeteerScreenRecorder(page)

            // Through
            const through = new PassThrough

            // Start stream
            recorder.startStream(through)

            // On data
            through.on("data", async chunk => await stream.write(chunk))

            // On abort
            stream.onAbort(async function () {

                // Stop recorder
                await recorder.stop()
            })
        })
    })
}