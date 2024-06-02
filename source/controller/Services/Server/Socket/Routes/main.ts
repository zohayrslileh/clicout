import Router from "@/Tools/Socket/Router"
import { createReadStream } from "fs"

/*
|-----------------------------
| Main
|-----------------------------
|
|
*/
export default new Router(async function (main) {

    // On connection
    main.onConnection(async function (client) {

        const vedio = createReadStream("storage/video.mp4")

        vedio.on("data", data => client.socket.emit("data", data))
    })
})