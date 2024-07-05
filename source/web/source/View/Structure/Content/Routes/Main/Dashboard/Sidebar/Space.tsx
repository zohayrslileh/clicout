import { ReactNode } from "react"

/**
 * Space
 * 
 * @returns 
 */
export default function ({ title, children }: Props) {

    return <div className="space-y-2">
        <label className="text-xs text-gray-500 uppercase font-medium dark:text-gray-400">{title}</label>
        <div className="ms-0 grid gap-1">
            {children}
        </div>
    </div>
}

/**
 * Props
 * 
 */
interface Props {
    title: string
    children: ReactNode
}