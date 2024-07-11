import { serveStatic } from "@hono/node-server/serve-static"
import Router from "@/Tools/HTTP/Router"
import RestApi from "./RestApi"
import stream from "./stream"

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
     * Stream
     * 
     */
    routes.get("/stream/:id", stream)

    /**
     * Web
     * 
     */
    routes.use(serveStatic({ root: "dist/web" }), serveStatic({ path: "dist/web/index.html" }))
})