import { ZodIssue } from "zod"
import ViewException from "."

/*
|-----------------------------
|  Unprocessable Entity
|-----------------------------
|
|
*/
export default class UnprocessableEntity extends ViewException {

    /**
     * Issues
     * 
     */
    public readonly issues: ZodIssue[]

    /**
     * Constructor method
     * 
     */
    public constructor(issues: ZodIssue[]) {

        // Call parent constructor
        super(issues[0].message)

        // Set issues
        this.issues = issues
    }
}