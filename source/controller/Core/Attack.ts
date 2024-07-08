
/*
|-----------------------------
|  Attack
|-----------------------------
|
| 
*/
export default class Attack {

    /**
     * Id
     * 
     */
    public readonly id: number

    /**
     * Keywords
     * 
     */
    public readonly keywords: string[]

    /**
     * Constructor methodd
     * 
     */
    public constructor(primitiveAttack: PrimitiveAttack) {

        // Set id
        this.id = primitiveAttack.id

        // Set keywords
        this.keywords = primitiveAttack.keywords
    }

    /**
     * Start method
     * 
     * @returns
     */
    public async start() {

        console.log(`Attack No ${this.id} has ben started`)
    }

    /**
     * Safe start method
     * 
     */
    public safeStart() {

        this.start().catch(_ => undefined)
    }
}

/*
|-----------------------------
|  Primitive Attack
|-----------------------------
|
| 
*/
export interface PrimitiveAttack {
    id: number
    keywords: string[]
}