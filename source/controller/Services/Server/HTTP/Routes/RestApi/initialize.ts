import { MiddlewareHandler } from "hono"

/*
|-----------------------------
|  Initialize Middleware
|-----------------------------
|
|
*/
const initialize: MiddlewareHandler = async function (context, next) {

    // Set Access-Control-Allow-Origin
    context.header("Access-Control-Allow-Origin", "*")

    // Set Access-Control-Allow-Headers
    context.header("Access-Control-Allow-Headers", "*")

    // Set Access-Control-Allow-Methods
    context.header("Access-Control-Allow-Methods", "*")

    return await next()
}

export default initialize