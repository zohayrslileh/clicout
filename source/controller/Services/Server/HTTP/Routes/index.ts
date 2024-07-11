import { serveStatic } from "@hono/node-server/serve-static"
import Router from "@/Tools/HTTP/Router"
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
     * Web
     * 
     */
    routes.use(serveStatic({ root: "dist/web" }), serveStatic({ path: "dist/web/index.html" }))
})