import UnauthorizedException from "./Exception/Unauthorized"
import UserEntity from "@/Models/Database/Entities/User"
import { Signer } from "@/Models/Encryptor"

/*
|-----------------------------
|  User
|-----------------------------
|
| 
*/
export default class User extends UserEntity {

    /**
     * Create authorization method
     * 
     * @returns
     */
    public createAuthorization(): string {

        return Signer.sign({ id: this.id })
    }

    /**
     * Find by authorization method
     * 
     * @returns
     */
    public static async findByAuthorization(authorization: string) {

        // Payload
        type Payload = { id: number }

        // Verify authorization
        const payload = Signer.verify<Payload>(authorization)

        // User
        const user = await User.findOneBy({ id: payload.id })

        // Check user
        if (!user) throw new UnauthorizedException

        return user
    }
}