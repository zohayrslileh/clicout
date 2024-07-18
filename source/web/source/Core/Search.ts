
/*
|-----------------------------
|  Search
|-----------------------------
|
| 
*/
export default class Search {

    /**
     * Id
     * 
     */
    public readonly id: number

    /**
     * Record id
     * 
     */
    public readonly recordId: string

    /**
     * Constructor methodd
     * 
     */
    public constructor(primitiveSearch: PrimitiveSearch) {

        // Set id
        this.id = primitiveSearch.id

        // Set record id
        this.recordId = primitiveSearch.recordId
    }
}

/*
|-----------------------------
|  Primitive Search
|-----------------------------
|
| 
*/
export interface PrimitiveSearch {
    id: number
    recordId: string
}