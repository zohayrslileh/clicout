import UnauthorizedException from "./Exception/Unauthorized"
import UserEntity from "@/Models/Database/Entities/User"
import { Signer } from "@/Models/Encryptor"
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

        // Validate data
        const { username, password } = schema.parse(data)

        // Initialize user entity
        const userEntity = new UserEntity

        // Set username
        userEntity.username = username

        // Set password
        await userEntity.setPassword(password)

        // Save
        await userEntity.save()

        return new this(userEntity)
    }

    /**
     * Login method
     * 
     * @returns
     */
    public static async login(data: unknown) {

        // Schema
        const schema = zod.object({
            username: zod.string().min(4).max(16),
            password: zod.string().min(4).max(16)
        })

        // Validate data
        const { username, password } = schema.parse(data)

        // User entity
        const userEntity = await UserEntity.findOneBy({ username })

        // Check username and password
        if (!userEntity || !await userEntity.verifyPassword(password)) throw new UnauthorizedException("Username or password incorrect")

        return new this(userEntity)
    }

    /**
     * Authentication method
     * 
     * @returns
     */
    public static async authentication(authorization: unknown) {

        // Payload
        type Payload = { id: number }

        try {

            // Verify authorization
            const payload = Signer.verify<Payload>(zod.string().parse(authorization))

            // User entity
            var userEntity = await UserEntity.findOneByOrFail({ id: payload.id })
        }

        catch {

            throw new UnauthorizedException
        }

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