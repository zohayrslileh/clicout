import AttackEntity from "@/Models/Database/Entities/Attack"
import SearchEntity from "@/Models/Database/Entities/Search"
import UserEntity from "@/Models/Database/Entities/User"
import Country, { PrimitiveCountry } from "./Country"
import City, { PrimitiveCity } from "./City"
import UserAgent from "./UserAgent"
import sleep from "@/Tools/Sleep"
import List from "@/Tools/List"
import Search from "./Search"
import User from "./User"

/*
|-----------------------------
|  Attack
|-----------------------------
|
| 
*/
export default class Attack {

    /**
     * Id
     * 
     */
    public readonly id: number

    /**
     * Keywords
     * 
     */
    public readonly keywords: List<string>

    /**
     * Country
     * 
     */
    public readonly country: Country | undefined

    /**
     * City
     * 
     */
    public readonly city: City | undefined

    /**
     * Device
     * 
     */
    public readonly device: string | undefined

    /**
     * Searches total
     * 
     */
    public readonly searchesTotal: number

    /**
     * Constructor method
     * 
     */
    public constructor(primitiveAttack: PrimitiveAttack) {

        // Set id
        this.id = primitiveAttack.id

        // Set keywords
        this.keywords = new List(primitiveAttack.keywords)

        // Set country
        this.country = primitiveAttack.country ? new Country(primitiveAttack.country) : undefined

        // Set city
        this.city = primitiveAttack.city ? new City(primitiveAttack.city) : undefined

        // Set device
        this.device = primitiveAttack.device || undefined

        // Set searches total
        this.searchesTotal = primitiveAttack.searchesTotal
    }

    /**
     * Entity
     * 
     * @returns
     */
    public async entity() {

        return await AttackEntity.findOneByOrFail({ id: this.id })
    }

    /**
     * Generate keyword method
     * 
     * @returns
     */
    public generateKeyword() {

        return this.keywords.next()
    }

    /**
     * Generate location method
     * 
     * @returns
     */
    public async generateLocation() {

        return this.city || (this.country ? await this.country.randomCity() : await City.random())
    }

    /**
     * Generate user agent method
     * 
     * @returns
     */
    public async generateUserAgent() {

        return await UserAgent.random(this.device)
    }

    /**
     * Start method
     * 
     * @returns
     */
    private async start() {

        // Wait same time
        await sleep(1000)

        // Open attack loop
        do {

            // Check if is stoped
            if (await this.isStoped()) return

            // Check is done
            if (await this.searchesLeft() < 1) return await this.stop()

            // Create search
            const search = await Search.create(this)

            // Launch search
            await search.launch()

        } while (true)
    }

    /**
     * Safe start method
     * 
     * @returns
     */
    public safeStart() {

        this.start().catch(_ => console.log(_))
    }

    /**
     * Stop method
     * 
     * @returns
     */
    public async stop() {

        // Ettack entity
        const attackEntity = await AttackEntity.findOneByOrFail({ id: this.id })

        // Set status
        attackEntity.status = "STOPPED"

        // Save
        await attackEntity.save()
    }

    /**
     * Searches count
     * 
     * @returns
     */
    public async searchesCount() {

        return await SearchEntity.countBy({ attack: { id: this.id } })
    }

    /**
     * Current search
     * 
     * @returns
     */
    public async currentSearch() {

        return await SearchEntity.findOne({
            where: { attack: { id: this.id } },
            order: { id: "DESC" }
        }) || undefined
    }

    /**
     * User
     * 
     * @returns
     */
    public async user() {

        // User entity
        const userEntity = await UserEntity.findOneByOrFail({ attacks: [{ id: this.id }] })

        return new User(userEntity)
    }

    /**
     * Is stoped
     * 
     * @returns
     */
    public async isStoped() {

        // Entity
        const entity = await this.entity()

        return entity.status === "STOPPED"
    }

    /**
     * Searches left
     * 
     * @returns
     */
    public async searchesLeft() {

        return this.searchesTotal > 0 ? (this.searchesTotal - await this.searchesCount()) : Infinity
    }
}

/*
|-----------------------------
|  Primitive Attack
|-----------------------------
|
| 
*/
export interface PrimitiveAttack {
    id: number
    keywords: string[]
    country: PrimitiveCountry | null
    city: PrimitiveCity | null
    device: string | null
    searchesTotal: number
}