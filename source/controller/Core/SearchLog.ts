import SearchLogEntity from "@/Models/Database/Entities/SearchLog"
import SearchEntity from "@/Models/Database/Entities/Search"
import EventEmitter from "events"
import Search from "./Search"

/*
|-----------------------------
|  SearchLog
|-----------------------------
|
| 
*/
export default class SearchLog {

    /**
     * Broadcast
     * 
     */
    public static readonly broadcast = new EventEmitter

    /**
     * Id
     * 
     */
    public readonly id: number

    /**
     * Title
     * 
     */
    public readonly title: string

    /**
     * Constructor method
     * 
     */
    public constructor(primitiveSearchLog: PrimitiveSearchLog) {

        // Set id
        this.id = primitiveSearchLog.id

        // Set title
        this.title = primitiveSearchLog.title
    }

    /**
     * Create method
     * 
     * @returns
     */
    public static async create(search: Search, title: string) {

        // Initialize search log entity
        const searchLogEntity = new SearchLogEntity

        // Set search
        searchLogEntity.search = await search.entity()

        // Set title
        searchLogEntity.title = title

        // Save
        await searchLogEntity.save()

        // Initialize
        const searchLog = new this(searchLogEntity)

        // Emit to broadcast
        this.broadcast.emit("create", searchLog)

        return searchLog
    }

    /**
     * Search
     * 
     * @returns
     */
    public async search() {

        // Search entity
        const searchEntity = await SearchEntity.findOneByOrFail({ logs: [{ id: this.id }] })

        return new Search(searchEntity)
    }
}

/*
|-----------------------------
|  Primitive SearchLog
|-----------------------------
|
| 
*/
export interface PrimitiveSearchLog {
    id: number
    title: string
}