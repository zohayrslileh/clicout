import HttpException from "@/Services/Server/HTTP/Exception/Exceptions"
import { PuppeteerScreenRecorder } from "puppeteer-screen-recorder"
import { stream } from "hono/streaming"
import Search from "@/Core/Search"
import { Context } from "hono"
import { PassThrough } from "stream"

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

    // Create stream
    return stream(context, async function (_) {

        // Create recorder
        const recorder = new PuppeteerScreenRecorder(page)

        const through = new PassThrough()

        recorder.startStream(through) // This accepte Writable
    })
}