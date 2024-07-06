import CountryEntity from "@/Models/Database/Entities/Country"
import CityEntity from "@/Models/Database/Entities/City"
import CoreException from "./Exception"
import { Like } from "typeorm"
import City from "./City"
import zod from "zod"

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
     * Find one method
     * 
     * @returns
     */
    public static async findOne(id: unknown) {

        // Country entity
        const countryEntity = await CountryEntity.findOneBy({ id: zod.number().parse(id) })

        // Check country entity
        if (!countryEntity) throw new CoreException("This country was not found")

        // Initialize country
        return new this(countryEntity)
    }

    /**
     * Find method
     * 
     * @returns
     */
    public static async find(keyword: unknown) {

        // Safe keyword
        const safeKeyword = zod.string().parse(keyword)

        // Country entities
        const countryEntities = await CountryEntity.find({ where: { name: Like(`%${safeKeyword}%`) }, take: 20 })

        // Initialize countries
        return countryEntities.map(countryEntity => new Country(countryEntity))
    }

    /**
     * Cities method
     * 
     * @returns
     */
    public async cities(keyword: unknown) {

        // Safe keyword
        const safeKeyword = zod.string().parse(keyword)

        // Primitive cities
        const primitiveCities = await CityEntity.find({ where: { country: { id: this.id }, name: Like(`%${safeKeyword}%`) }, take: 20 })

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