import ClickEntity from "@/Models/Database/Entities/Click"
import SearchEntity from "@/Models/Database/Entities/Search"
import EventEmitter from "events"
import Search from "./Search"

/*
|-----------------------------
|  Click
|-----------------------------
|
| 
*/
export default class Click {

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
     * Url
     * 
     */
    public readonly url: URL

    /**
     * Constructor method
     * 
     */
    public constructor(primitiveClick: PrimitiveClick) {

        // Set id
        this.id = primitiveClick.id

        // Set url
        this.url = new URL(primitiveClick.url)
    }

    /**
     * Create method
     * 
     * @returns
     */
    public static async create(search: Search, url: URL) {

        // Initialize search log entity
        const clickEntity = new ClickEntity

        // Set search
        clickEntity.search = await search.entity()

        // Set url
        clickEntity.url = url.href

        // Save
        await clickEntity.save()

        // Initialize
        const click = new this(clickEntity)

        // Emit to broadcast
        this.broadcast.emit("create", click)

        return click
    }

    /**
     * Search
     * 
     * @returns
     */
    public async search() {

        // Search entity
        const searchEntity = await SearchEntity.findOneByOrFail({ clicks: [{ id: this.id }] })

        return new Search(searchEntity)
    }
}

/*
|-----------------------------
|  Primitive Click
|-----------------------------
|
| 
*/
export interface PrimitiveClick {
    id: number
    url: string
}