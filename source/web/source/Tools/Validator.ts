import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import zod, { ZodIssue, ZodType, infer as Infer } from "zod"

/**
 * Validator hook
 * 
 * @returns
 */
export default function useValidator<Schema extends ZodType>(schema: (z: typeof zod) => Schema, data: unknown, timeout: number = 1000) {

    /**
     * Timer
     * 
     */
    const timer = useRef<number | undefined>(undefined)

    /**
     * Primitive Issues
     * 
     */
    const [primitiveIssues, setPrimitiveIssues] = useState<ZodIssue[]>([])

    /**
     * Issues
     * 
     */
    const issues = useMemo(() => createIssues(primitiveIssues), [primitiveIssues])

    /**
     * Validate
     * 
     * @returns
     */
    const validate: () => (undefined | Infer<Schema>) = useCallback(function () {

        // Clear timer
        if (timer.current) clearTimeout(timer.current)

        // Validate
        const validate = schema(zod).safeParse(data)

        // Set Issues
        if (!validate.success) setPrimitiveIssues(validate.error.issues)

        // Set empty Issues
        else setPrimitiveIssues([])

        // Create timer
        timer.current = setTimeout(() => setPrimitiveIssues([]), timeout)

        return validate.success ? validate.data : undefined

    }, [data])

    /**
     * On change data
     * 
     */
    useEffect(() => {

        // Set empty Issues
        setPrimitiveIssues([])

    }, [data])

    return { issues, validate }
}

/**
 * Create issues method
 * 
 * @returns
 */
export function createIssues(issues: ZodIssue[], basePath?: string | number): Issues {

    // Create object with other props
    return Object.assign([...issues], {

        /**
         * Path method
         *  
         * @returns 
         */
        path: (...paths: (string | number)[]) => {

            // Define full path
            const fullPath = `${basePath ? (basePath + "/" + paths.join("/")) : paths.join("/")}`

            return createIssues(issues.filter(issue => issue.path.join("/").startsWith(fullPath)), fullPath)
        },

        /**
         * Self method
         *  
         * @returns 
         */
        self: (...paths: (string | number)[]) => {

            // Define full path
            const fullPath = `${basePath ? (basePath + "/" + paths.join("/")) : paths.join("/")}`

            return issues.filter(issue => issue.path.join("/") === fullPath)
        },

        /**
         * Has method
         *  
         * @returns 
         */
        has: (...paths: (string | number)[]) => {

            // Define full path
            const fullPath = `${basePath ? (basePath + "/" + paths.join("/")) : paths.join("/")}`

            return !!createIssues(issues.filter(issue => issue.path.join("/").startsWith(fullPath)), fullPath).length
        },

        /**
         * Message
         *  
         */
        message: issues[0] ? issues[0].message : undefined
    })
}

/**
 * Issues
 * 
 */
export type Issues = ZodIssue[] & {
    path: (...paths: (string | number)[]) => ZodIssue[] & Issues
    self: (...paths: (string | number)[]) => ZodIssue[]
    has: (...paths: (string | number)[]) => boolean
    message: string | undefined
}