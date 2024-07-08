
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