import Router from "@/Tools/Socket/Router"
import SearchLog from "@/Core/SearchLog"
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

    // On create search
    Search.broadcast.on("create", async function (search: Search) {

        // Attack
        const attack = await search.attack()

        // User
        const user = await attack.user()

        // Emit
        main.namespace.to(user.id.toString()).emit(`attack/${attack.id}/search/create`, search)
    })

    // On create search log
    SearchLog.broadcast.on("create", async function (searchLog: SearchLog) {

        // Search
        const search = await searchLog.search()

        // Attack
        const attack = await search.attack()

        // User
        const user = await attack.user()

        // Emit
        main.namespace.to(user.id.toString()).emit(`search/${search.id}/log/create`, searchLog)
    })

    // On search done
    Search.broadcast.on("done", async function (search: Search) {

        // Attack
        const attack = await search.attack()

        // User
        const user = await attack.user()

        // Emit
        main.namespace.to(user.id.toString()).emit(`attack/${attack.id}/currentSearch/done`)
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