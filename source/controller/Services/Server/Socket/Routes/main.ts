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

        // User
        const user = await User.authentication(client.socket.handshake.auth.authorization)

        // On attack new search
        user.on("attack-new-search", async function (attack: Attack) {

            // Emit
            client.socket.emit(`${attack.id}:searches-total`, await attack.searchesCount())
        })

        // On searches total
        client.on("searches-total", async function (_, attackId: unknown) {

            // Attack find
            const attack = await user.findAttack(attackId)

            // Emit
            client.socket.emit(`${attack.id}:searches-total`, await attack.searchesCount())
        })
    })
})