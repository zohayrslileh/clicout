import AttackEntity from "@/Models/Database/Entities/Attack"
import Country, { PrimitiveCountry } from "./Country"
import City, { PrimitiveCity } from "./City"
import UserAgent from "./UserAgent"
import Search from "./Search"

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
    public readonly keywords: string[]

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
     * Total searches
     * 
     */
    public readonly totalSearches: number

    /**
     * Constructor method
     * 
     */
    public constructor(primitiveAttack: PrimitiveAttack) {

        // Set id
        this.id = primitiveAttack.id

        // Set keywords
        this.keywords = primitiveAttack.keywords

        // Set country
        this.country = primitiveAttack.country ? new Country(primitiveAttack.country) : undefined

        // Set city
        this.city = primitiveAttack.city ? new City(primitiveAttack.city) : undefined

        // Set device
        this.device = primitiveAttack.device || undefined

        // Set total searches
        this.totalSearches = primitiveAttack.totalSearches
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

        // Create search
        const search = await Search.create(this)

        return search
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
    totalSearches: number
}