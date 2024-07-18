import Router from "@/Tools/Socket/Router"
import Search from "@/Core/Search"
import User from "@/Core/User"

/*
|-----------------------------
| Main
|-----------------------------
|
|
*/
export default new Router(async function (main) {

    // On new search
    Search.broadcast.on("create", async function (search: Search) {

        // Attack
        const attack = await search.attack()

        // User
        const user = await attack.user()

        // Emit
        main.namespace.to(user.id.toString()).emit(`attack/${attack.id}/search/create`, search)
    })

    // On connection
    main.onConnection(async function (client) {

        // User
        const user = await User.authentication(client.socket.handshake.auth.authorization)

        // Join
        client.socket.join(user.id.toString())

        // On attack info
        client.on("attack/info", async function (_, attackId: unknown) {

            // Attack find
            const attack = await user.findAttack(attackId)

            // Searches count
            const searchesCount = await attack.searchesCount()

            // Current search
            const currentSearch = await attack.currentSearch()

            // Emit attack info
            client.socket.emit(`attack/${attack.id}/info`, searchesCount, currentSearch)
        })
    })
})