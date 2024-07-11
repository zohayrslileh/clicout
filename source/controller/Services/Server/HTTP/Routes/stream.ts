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
            Attack.broadcast.on(`${AttackId}:record-chunk`, async function (chunk: Buffer) {

                /**
                 * Write chunk
                 * 
                 */
                await stream.write(chunk)
            })
        })
    })
}