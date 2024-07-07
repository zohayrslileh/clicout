import { Entity, Column, ManyToOne, OneToOne, OneToMany } from "typeorm"
import BaseEntity from "@/Tools/Database/Entity"
import Subscription from "./Subscription"
import bcrypt from "bcrypt"
import Role from "./Role"
import Attack from "./Attack"

/*
|-----------------------------
|  User model
|-----------------------------
|
| 
*/
@Entity()
export default class User extends BaseEntity {

    /**
     * Username
     * 
     */
    @Column({ type: "varchar", nullable: false, unique: true })
    declare public username: string

    /**
     * Email
     * 
     */
    @Column({ type: "varchar", nullable: false, unique: true })
    declare public email: string

    /**
     * Password
     * 
     */
    @Column({ type: "text", nullable: false })
    declare private password: string

    /**
     * Role
     * 
     */
    @ManyToOne(() => Role, role => role.users)
    declare public role: Role | undefined

    /**
     * Subscription
     * 
     */
    @OneToOne(() => Subscription, subscription => subscription.user)
    declare public subscription: Subscription | undefined

    /**
     * Attacks
     * 
     */
    @OneToMany(() => Attack, attack => attack.user)
    declare public attacks: Attack[]

    /**
     * Set password method
     * 
     * @returns
     */
    public async setPassword(password: string): Promise<void> {

        this.password = await bcrypt.hash(password, 10)
    }

    /**
     * Verify password method
     * 
     * @returns
     */
    public async verifyPassword(password: string): Promise<boolean> {

        return await bcrypt.compare(password, this.password)
    }

    /**
     * Has permission method
     * 
     * @returns
     */
    public async hasPermission(name: string) {

        // Get role
        const role = await Role.findOneBy({ users: [{ id: this.id }] })

        return !!role && await role.hasPermission(name)
    }
}