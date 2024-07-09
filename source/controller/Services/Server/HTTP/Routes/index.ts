import { serveStatic } from "@hono/node-server/serve-static"
import Router from "@/Tools/HTTP/Router"
import { stream } from "hono/streaming"
import RestApi from "./RestApi"
import User from "@/Core/User"

/*
|-----------------------------
| Routes
|-----------------------------
|
|
*/
export default Router.create(function (routes) {

    routes.get("/stream", async function (context) {

        context.header("Content-Type", "video/webm")

        context.header("Content-Disposition", "attachment;filename=record.webm;")

        const user = await User.authentication("eyJwYXlsb2FkIjp7ImlkIjoxfX0=.rxNaf3V18ZWuH/Dw5Fc8Qk2rynQ/IkylTEdFp0iIcToTBvRibdJtWRcD1tYcDMy9FsGU5idEAG0V6T+ky73A+vjd+l4UHlFirHkn7TDaxMgDQGYKgsNccyLgyq2xju0WssDGL4R6Zq9gIPpJPxS5AD2+myBPWBXWZgO/L4XXsICPzSqjruADPay5pRXqdy3c0fKxP5mGLKyLt0o/XEq7wMvcDrA5SeR+wNb/GRWIcb5fITE7k4DlTxdk4nlStWv6tsmWuL31/CF0DVcsAkuy+aRb/nIeTJAEq0Ierp5vbB2srK4H207flg0KMpR5rPl4LIgahwxZfh7r3d9OBRRquw==")

        const attack = await user.findAttack(84)

        attack.safeStart()

        return stream(context, async (stream) => {

            await new Promise(function () {

                attack.on("record-chunk", async function (chunk) {

                    await stream.write(chunk)
                })

            })

        })
    })

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