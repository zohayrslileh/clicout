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

    // On connection
    main.onConnection(async function (client) {

        // User
        const user = await User.authentication(client.socket.handshake.auth.authorization)

        // Join
        client.socket.join(user.id.toString())
    })
})