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
}