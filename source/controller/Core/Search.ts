import AttackEntity from "@/Models/Database/Entities/Attack"
import SearchEntity from "@/Models/Database/Entities/Search"
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

        // Set attack
        searchEntity.attack = await AttackEntity.findOneByOrFail({ id: attack.id })

        // Save
        await searchEntity.save()

        // Initialize search
        return new this(searchEntity)
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