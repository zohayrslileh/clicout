import UserAgentEntity from "@/Models/Database/Entities/UserAgent"
import { FindOperator, IsNull, Not } from "typeorm"
import UAParser from "ua-parser-js"

/*
|-----------------------------
|  User Agent
|-----------------------------
|
| 
*/
export default class UserAgent extends UAParser {

    /**
     * Id
     * 
     */
    public readonly id: number

    /**
     * Device
     * 
     */
    public readonly device: string

    /**
     * Width
     * 
     */
    public readonly width: number

    /**
     * Height
     * 
     */
    public readonly height: number

    /**
     * Constructor methodd
     * 
     */
    public constructor(primitiveUserAgent: PrimitiveUserAgent) {

        // Call parent constructor
        super(primitiveUserAgent.value)

        // Set id
        this.id = primitiveUserAgent.id

        // Set device
        this.device = primitiveUserAgent.device

        // Set width
        this.width = primitiveUserAgent.width

        // Set height
        this.height = primitiveUserAgent.height
    }

    /**
     * Random method
     * 
     * @return
     */
    public static async random(device: string | FindOperator<any> = Not(IsNull())) {

        // UserAgent query builder
        const userAgentQueryBuilder = UserAgentEntity.createQueryBuilder().where({ device })

        // UserAgent entity
        const userAgentEntity = await userAgentQueryBuilder.select().orderBy("RAND()").getOneOrFail()

        return new this(userAgentEntity)
    }
}

/*
|-----------------------------
|  Primitive UserAgent
|-----------------------------
|
| 
*/
export interface PrimitiveUserAgent {
    id: number
    value: string
    device: string
    width: number
    height: number
}