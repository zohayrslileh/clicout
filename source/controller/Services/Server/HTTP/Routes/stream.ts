import { stream } from "hono/streaming"
import Attack from "@/Core/Attack"
import { Context } from "hono"

/*
|-----------------------------
|  Stream
|-----------------------------
|
|
*/
export default async function (context: Context) {

    /**
     * Content Type
     * 
     */
    context.header("Content-Type", "video/webm")

    /**
     * Attack id
     * 
     */
    const attackId = +context.req.param("id")

    /**
     * Attack
     * 
     */
    const [_, page] = Attack.running.find(([attack]) => attack.id === attackId) || []

    /**
     * Check page
     * 
     */
    if (!page) throw new Error

    /**
     * Stream
     * 
     */
    return stream(context, async function (stream) {

        /**
         * Create promise
         * 
         */
        await new Promise(async function () {

            /**
             * Create screencast
             * 
             */
            const screencast = await page.screencast()

            /**
             * On screencast data
             * 
             */
            screencast.on("data", async (chunk: Buffer) => await stream.write(chunk))

            /**
             * On stream abort
             * 
             */
            stream.onAbort(async () => await screencast.stop())
        })
    })
}