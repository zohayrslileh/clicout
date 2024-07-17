import SearchEntity from "@/Models/Database/Entities/Search"
import EventEmitter from "events"
import Attack from "./Attack"

/*
|-----------------------------
|  Search
|-----------------------------
|
| 
*/
export default class Search {

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
     * Constructor method
     * 
     */
    public constructor(primitiveSearch: PrimitiveSearch) {

        // Set id
        this.id = primitiveSearch.id
    }

    /**
     * Create method
     * 
     * @returns
     */
    public static async create(attack: Attack) {

        // Initialize search entity
        const searchEntity = new SearchEntity

        // Set keyword
        searchEntity.keyword = attack.generateKeyword()

        // Set attack
        searchEntity.attack = await attack.entity()

        // Set city
        searchEntity.city = await (await attack.generateLocation()).entity()

        // Set user agent
        searchEntity.userAgent = await (await attack.generateUserAgent()).entity()

        // Save
        await searchEntity.save()

        // Initialize
        const search = new this(searchEntity)

        // Emit to broadcast
        Search.broadcast.emit("create", search)

        return search
    }
}

/*
|-----------------------------
|  Primitive Search
|-----------------------------
|
| 
*/
export interface PrimitiveSearch {
    id: number
}