import request from "@/Models/Server/Request"
import City, { PrimitiveCity } from "./City"

/*
|-----------------------------
|  Country
|-----------------------------
|
| 
*/
export default class Country {

    /**
     * Id
     * 
     */
    public readonly id: number

    /**
     * Code
     * 
     */
    public code: string

    /**
     * Name
     * 
     */
    public name: string

    /**
     * Constructor methodd
     * 
     */
    public constructor(primitiveCountry: PrimitiveCountry) {

        // Set id
        this.id = primitiveCountry.id

        // Set code
        this.code = primitiveCountry.code

        // Set name
        this.name = primitiveCountry.name
    }

    /**
     * Find method
     * 
     * @returns
     */
    public static async find() {

        // Ask primitive countries
        const primitiveCountries = await request<PrimitiveCountry[]>({ url: "/main/country" })

        // Initialize countries
        return primitiveCountries.map(primitiveCountry => new this(primitiveCountry))
    }

    /**
     * Cities method
     * 
     * @returns
     */
    public async cities() {

        // Ask primitive cities
        const primitiveCities = await request<PrimitiveCity[]>({ url: `/main/country/${this.id}/cities` })

        // Initialize cities
        return primitiveCities.map(primitiveCity => new City(primitiveCity))
    }
}

/*
|-----------------------------
|  Primitive Country
|-----------------------------
|
| 
*/
export interface PrimitiveCountry {
    id: number
    code: string
    name: string
}