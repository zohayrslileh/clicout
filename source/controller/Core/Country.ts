import CountryEntity from "@/Models/Database/Entities/Country"
import CityEntity from "@/Models/Database/Entities/City"

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

        // Country entities
        const countryEntities = await CountryEntity.find()

        // Initialize countrys
        return countryEntities.map(countryEntity => new Country(countryEntity))
    }

    /**
     * Cities method
     * 
     * @returns
     */
    public async cities(limit: number = 20) {

        // Initialize countrys
        return await CityEntity.find({ where: { country: { id: this.id } }, take: limit })
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