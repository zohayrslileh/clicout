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
     * Content Disposition
     * 
     */
    context.header("Content-Disposition", "attachment;filename=video.mp4;");

    /**
     * AttackId
     * 
     */
    const AttackId = context.req.param("id")

    /**
     * Stream
     * 
     */
    return stream(context, async function (stream) {

        /**
         * Create promise
         * 
         */
        await new Promise(function () {

            /**
             * On record chunk
             * 
             */
            Attack.broadcast.on(`${AttackId}:record-chunk`, async function (chunk: Uint8Array) {

                /**
                 * Write chunk
                 * 
                 */
                await stream.write(chunk)
            })
        })
    })
}