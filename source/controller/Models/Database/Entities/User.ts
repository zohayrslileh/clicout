import { Entity, Column, ManyToOne, OneToOne } from "typeorm"
import BaseEntity from "@/Tools/Database/Entity"
import Subscription from "./Subscription"
import bcrypt from "bcrypt"
import Role from "./Role"

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
     * Get role method
     * 
     * @returns
     */
    public async getRole() {

        return await Role.findOneBy({ users: [{ id: this.id }] })
    }

    /**
     * Has role method
     * 
     * @returns
     */
    public async hasRole(name: string) {

        // Get role
        const role = await this.getRole()

        return role && role.name === name
    }

    /**
     * Has permission method
     * 
     * @returns
     */
    public async hasPermission(name: string) {

        // Get role
        const role = await this.getRole()

        return !!role && await role.hasPermission(name)
    }
}