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

        // On searches total
        client.on("searches-total", async function (_, attackId: unknown) {

            // Attack find
            const attack = await user.findAttack(attackId)

            // Emit
            client.socket.emit(`${attackId}:searches-total`, await attack.searchesCount())
        })
    })
})