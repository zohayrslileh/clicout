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
export default class User extends UserEntity {

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

        // Validate data
        const { username, password } = schema.parse(data)

        // Get user
        const user = await User.findOneBy({ username })

        // Check username and password
        if (!user || !await user.verifyPassword(password)) throw new UnauthorizedException("Username or password incorrect")

        return user
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

        // User
        const user = await User.findOneBy({ id: payload.id })

        // Check user
        if (!user) throw new UnauthorizedException

        return user
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