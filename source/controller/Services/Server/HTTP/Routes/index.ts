import { serveStatic } from "@hono/node-server/serve-static"
import { streamSSE } from "hono/streaming"
import Router from "@/Tools/HTTP/Router"
import Screen from "@/Core/Screen"
import RestApi from "./RestApi"

/*
|-----------------------------
| Routes
|-----------------------------
|
|
*/
export default Router.create(function (routes) {

    /**
     * Rest Api
     * 
     */
    routes.route("/api", RestApi)

    /**
     * Screen
     * 
     */
    routes.get("/screen", function (context) {

        return streamSSE(context, async function (stream) {

            context.header("Content-Type", "video/webm")

            if (!Screen.chunks.length) await stream.write("Empty")

            else for (const chunk of Screen.chunks) await stream.write(new Uint8Array(chunk))
        })
    })

    /**
     * Web
     * 
     */
    routes.use(serveStatic({ root: "dist/web" }), serveStatic({ path: "dist/web/index.html" }))
})