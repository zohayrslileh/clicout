import { PassThrough } from "stream"
import ffmpeg from "fluent-ffmpeg"
import Json from "@/Tools/Json"

/*
|-----------------------------
|  Tester 🧪
|-----------------------------
|
|
*/
export default async function () {

    const chunks = new Json<string[]>("storage/record.json").value

    const through = new PassThrough

    ffmpeg().input(through).output("storage/output.webm")

    through.write(Buffer.from("1a45dfa3", "hex"))

    for (const chunk of chunks.slice(Math.round(chunks.length / 2) - 1)) through.write(Buffer.from(chunk, "hex"))

    through.end()

    console.log("The test completed successfully 🧪 ")
}