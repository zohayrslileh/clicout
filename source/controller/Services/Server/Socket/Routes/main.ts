import Router from "@/Tools/Socket/Router"
import User from "@/Core/User"

/*
|-----------------------------
| Main
|-----------------------------
|
|
*/
export default new Router(async function (main) {

    // Set namespace
    User.namespace = main.namespace

    // On connection
    main.onConnection(async function (client) {

        // Authorization
        const authorization = client.socket.handshake.auth.authorization

        // User
        const user = await User.authentication(authorization)

        // Join
        client.socket.join(user.id.toString())
    })
})