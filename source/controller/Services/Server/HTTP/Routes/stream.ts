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
    context.header("Content-Disposition", "attachment;filename=stream.webm;");

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

        for (const chunk of chunks) await stream.write(chunk)

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

                chunks.push(chunk)

                /**
                 * Write chunk
                 * 
                 */
                await stream.write(new Uint8Array(chunk))
            })
        })
    })
}

const chunks: Uint8Array[] = []