import CityEntity from "@/Models/Database/Entities/City"

/*
|-----------------------------
|  City
|-----------------------------
|
| 
*/
export default class City {

    /**
     * Id
     * 
     */
    public readonly id: number

    /**
     * Name
     * 
     */
    public name: string

    /**
     * Latitude
     * 
     */
    public latitude: number

    /**
     * Longitude
     * 
     */
    public longitude: number

    /**
     * Constructor methodd
     * 
     */
    public constructor(primitiveCity: PrimitiveCity) {

        // Set id
        this.id = primitiveCity.id

        // Set name
        this.name = primitiveCity.name

        // Set latitude
        this.latitude = primitiveCity.latitude

        // Set longitude
        this.longitude = primitiveCity.longitude
    }

    /**
     * Random method
     * 
     * @return
     */
    public static async random() {

        // City query builder
        const cityQueryBuilder = CityEntity.createQueryBuilder()

        // City entity
        const cityEntity = await cityQueryBuilder.select().orderBy("RANDOM()").getOneOrFail()

        return new this(cityEntity)
    }
}

/*
|-----------------------------
|  Primitive City
|-----------------------------
|
| 
*/
export interface PrimitiveCity {
    id: number
    name: string
    latitude: number
    longitude: number
}