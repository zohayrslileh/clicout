import request from "@/Models/Server/Request"

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

        // Ask primitive countrys
        const primitiveCountrys = await request<PrimitiveCountry[]>({ url: "/main/country" })

        // Initialize countrys
        return primitiveCountrys.map(primitiveCountry => new this(primitiveCountry))
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