
/*
|-----------------------------
|  SearchLog
|-----------------------------
|
| 
*/
export default class SearchLog {

    /**
     * Id
     * 
     */
    public readonly id: number

    /**
     * Title
     * 
     */
    public readonly title: string

    /**
     * Constructor method
     * 
     */
    public constructor(primitiveSearchLog: PrimitiveSearchLog) {

        // Set id
        this.id = primitiveSearchLog.id

        // Set title
        this.title = primitiveSearchLog.title
    }
}

/*
|-----------------------------
|  Primitive SearchLog
|-----------------------------
|
| 
*/
export interface PrimitiveSearchLog {
    id: number
    title: string
}