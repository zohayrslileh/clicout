import SearchEntity from "@/Models/Database/Entities/Search"
import AttackEntity from "@/Models/Database/Entities/Attack"
import EventEmitter from "events"
import Attack from "./Attack"
import { UUID } from "crypto"

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
     * Record id
     * 
     */
    public readonly recordId: UUID

    /**
     * Constructor method
     * 
     */
    public constructor(primitiveSearch: PrimitiveSearch) {

        // Set id
        this.id = primitiveSearch.id

        // Set record id
        this.recordId = primitiveSearch.recordId
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

    /**
     * Attack
     * 
     * @returns
     */
    public async attack() {

        // Attack entity
        const attackEntity = await AttackEntity.findOneByOrFail({ searches: [{ id: this.id }] })

        return new Attack(attackEntity)
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
    recordId: UUID
}