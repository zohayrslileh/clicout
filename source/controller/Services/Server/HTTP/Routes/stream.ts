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

    var firstSend = false

    // Record id
    const recordId = context.req.param("record_id")

    // Search
    const search = await Search.findByRecordId(recordId as UUID)

    // Create stream
    return stream(context, async function (stream) {

        if (!firstSend) {
            firstSend = true
            await stream.write(Buffer.from("1A45DFA39F4286810142F7810142F2810442F381084282847765626D42878102428581021853806701FFFFFFFFFFFFFF114D9B74AB4DBB8B53AB841549A96653AC81A14DBB8B53AB841654AE6B53AC81CB4DBB8C53AB841254C36753AC82011EEC010000000000006800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001549A966A52AD7B1830F42404D808C4C61766636312E332E31303457418C4C61766636312E332E3130341654AE6BCEAE0100000000000045D7810173C588", "hex"))
        }

        // Create promise
        await new Promise<void>(async function (resolve) {

            // Set chunk method
            const setChunk = async (chunk: Buffer) => await stream.write(chunk)

            // On chunk
            Search.broadcast.on(`${search.id}/chunk`, setChunk)

            // On abort
            stream.onAbort(function () {

                // Off chunk
                Search.broadcast.off(`${search.id}/chunk`, setChunk)

                // Resolve
                resolve()
            })
        })
    })
}