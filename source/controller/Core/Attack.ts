import Country, { PrimitiveCountry } from "./Country"
import City, { PrimitiveCity } from "./City"
import puppeteer from "puppeteer"

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
     * Constructor methodd
     * 
     */
    public constructor(primitiveAttack: PrimitiveAttack) {

        // Set id
        this.id = primitiveAttack.id

        // Set keywords
        this.keywords = primitiveAttack.keywords

        // Set country
        this.country = new Country(primitiveAttack.country)

        // Set city
        this.city = new City(primitiveAttack.city)
    }

    /**
     * Start method
     * 
     * @returns
     */
    public async start() {

        // Create browser
        const browser = await puppeteer.launch()

        // Create context
        const context = browser.defaultBrowserContext()

        console.log(`Attack No ${this.id} has ben started`)
    }

    /**
     * Safe start method
     * 
     */
    public safeStart() {

        this.start().catch(_ => undefined)
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
    country: PrimitiveCountry
    city: PrimitiveCity
}