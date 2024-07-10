import Router from "@/Tools/Socket/Router"
import Attack from "@/Core/Attack"
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

        // Authorization
        const authorization = client.socket.handshake.auth.authorization

        // User
        const user = await User.authentication(authorization)

        // Join
        client.socket.join(user.id.toString())
    })

    // On attack record chunk
    Attack.broadcast.on("record-chunk", function (chunk: ArrayBuffer, attack: Attack) {

        main.namespace.to(attack.user.id).emit(`${attack.id}:record-chunk`, chunk)
    })
})