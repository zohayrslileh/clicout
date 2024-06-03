import request from "@/Models/Server/Request"
import zod from "zod"

/*
|-----------------------------
|  User
|-----------------------------
|
| 
*/
export default class User {

    /**
     * Id
     * 
     */
    public readonly id: number

    /**
     * Username
     * 
     */
    public username: string

    /**
     * Constructor methodd
     * 
     */
    public constructor(primitiveUser: PrimitiveUser) {

        // Set id
        this.id = primitiveUser.id

        // Set username
        this.username = primitiveUser.username
    }

    /**
     * Create method
     * 
     * @returns
     */
    public static async create(data: unknown) {

        // Schema
        const schema = zod.object({
            username: zod.string().min(4).max(16),
            password: zod.string().min(4).max(16)
        })

        // Create user
        const primitiveUser = await request<PrimitiveUser>({
            method: "POST",
            url: "/access/register",
            data: schema.parse(data)
        })

        return new this(primitiveUser)
    }

    /**
     * Find by access info method
     * 
     * @returns
     */
    public static async findByAccessInfo(data: unknown) {

        // Schema
        const schema = zod.object({
            username: zod.string().min(4).max(16),
            password: zod.string().min(4).max(16)
        })

        // Get user
        const primitiveUser = await request<PrimitiveUser>({
            method: "POST",
            url: "/access/login",
            data: schema.parse(data)
        })

        return new this(primitiveUser)
    }

    /**
     * Find by authorization method
     * 
     * @returns
     */
    public static async findByAuthorization(authorization: unknown) {

        // Payload
        type Payload = { id: number }

        // Verify authorization
        const payload = Signer.verify<Payload>(zod.string().parse(authorization))

        // User entity
        const userEntity = await UserEntity.findOneBy({ id: payload.id })

        // Check user entity
        if (!userEntity) throw new UnauthorizedException

        return new this(userEntity)
    }

    /**
     * Create authorization method
     * 
     * @returns
     */
    public createAuthorization(): string {

        return Signer.sign({ id: this.id })
    }
}

/*
|-----------------------------
|  Primitive User
|-----------------------------
|
| 
*/
export interface PrimitiveUser {
    id: number
    username: string
}