import { DependencyList, useCallback, useLayoutEffect, useState } from "react"
import { Update, update } from "./Updater"

/**
 * Promise hook with dependencies
 * 
 * @returns
 */
export default function usePromise<Solve>(executor: Executor<Solve>, dependencies: DependencyList): PromiseWithDependencies<Solve>

/**
 * Promise hook without dependencies
 * 
 * @returns
 */
export default function usePromise<Solve>(executor: Executor<Solve>): PromiseWithoutDependencies<Solve>

/**
 * Promise hook
 * 
 * @returns 
 */
export default function usePromise<Solve>(executor: Executor<Solve>, dependencies?: DependencyList) {

    /**
     * Exception state
     * 
     */
    const [exception, setException] = useState<Reference<unknown> | undefined>(undefined)

    /**
     * Solve state
     * 
     */
    const [solve, setSolve] = useState<Reference<Solve> | undefined>(undefined)

    /**
     * Pending state
     * 
     */
    const [pending, setPending] = useState<boolean>(false)

    /**
     * Reset method
     * 
     * @returns
     */
    const reset = useCallback(function () {

        // Reset exception state
        setException(undefined)

        // Reset solve state
        setSolve(undefined)

    }, [])

    /**
     * Dispatch method
     * 
     * @returns
     */
    const dispatch: Update<Solve> = useCallback(function (value) {

        // Check solve
        if (!solve) throw new Error("You can't direct update solve before promise resolve")

        setSolve({ current: update(value, solve.current) })

    }, [solve])

    /**
     * Execute method
     * 
     * @returns
     */
    const execute: Execute<Solve> = useCallback(async function () {

        // Reset solve & exception
        reset()

        // Start pending
        setPending(true)

        try {

            // Execute executor
            const solve = await executor()

            // Set solve
            setSolve({ current: solve })

            return solve

        } catch (exception) {

            // Set exception
            setException({ current: exception })

            // Throw exception
            throw exception

        } finally {

            // Stop pending
            setPending(false)
        }

    }, [executor])

    /**
     * Safe execute method
     * 
     * @returns
     */
    const safeExecute: Execute<Solve | undefined> = useCallback(async function () {

        try {

            return await execute()
        }

        catch {

            return undefined
        }

    }, [execute])

    /**
     * Layout Effect
     * 
     */
    useLayoutEffect(function () {

        // Execute
        if (dependencies) safeExecute()

    }, dependencies || [])

    /**
     * Solve status
     * 
     */
    const solveStatus = solve ? { solve: solve.current, pending: false } : undefined

    /**
     * Exception status
     * 
     */
    const exceptionStatus = exception ? { exception, pending: false } : undefined

    /**
     * Pending status
     * 
     */
    const pendingStatus = { pending: true }

    /**
     * With dependencies
     * 
     */
    const withDependencies = solveStatus || exceptionStatus || pendingStatus

    /**
     * Without dependencies
     * 
     */
    const withoutDependencies = { pending, solve, exception, reset }

    /**
     * Promise
     * 
     */
    const promise = dependencies ? withDependencies : withoutDependencies

    return { ...promise, execute, safeExecute, dispatch }
}

/**
 * Executor
 * 
 */
export type Executor<Solve> = () => (Solve | Promise<Solve>)

/**
 * Execute
 * 
 */
export type Execute<Solve> = () => Promise<Solve>

/**
 * Reset
 * 
 */
export type Reset = () => void

/**
 * Promise with dependencies
 * 
 */
export type PromiseWithDependencies<Solve> = (SolveStatus<Solve> | ExceptionStatus | PendingStatus) & {
    safeExecute: Execute<Solve | undefined>
    execute: Execute<Solve>
    dispatch: Update<Solve>
}

/**
 * Solve status
 * 
 */
export interface SolveStatus<Solve> {
    exception: undefined
    pending: false
    solve: Solve
}

/**
 * Exception status
 * 
 */
export interface ExceptionStatus {
    exception: Reference<unknown>
    solve: undefined
    pending: false
}

/**
 * Pending status
 * 
 */
export interface PendingStatus {
    exception: undefined
    solve: undefined
    pending: true
}

/**
 * Promise without dependencies
 * 
 */
export type PromiseWithoutDependencies<Solve> = {
    exception: Reference<unknown> | undefined
    safeExecute: Execute<Solve | undefined>
    solve: Reference<Solve> | undefined
    execute: Execute<Solve>
    dispatch: Update<Solve>
    pending: boolean
    reset: Reset
}

/**
 * Reference
 * 
 */
export interface Reference<Target> {
    current: Target
}