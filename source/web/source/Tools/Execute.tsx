import { Fragment, useEffect } from "react"

/**
 * Execute component
 * 
 * @returns
 */
export default function Exception({ executor }: Props) {

    /**
     * On load
     * 
     */
    useEffect(executor, [])

    /**
     * Fragment
     * 
     */
    return <Fragment />
}

/**
 * Props
 * 
 */
interface Props {
    executor: () => void
}