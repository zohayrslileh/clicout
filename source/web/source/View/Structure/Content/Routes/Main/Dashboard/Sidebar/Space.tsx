import { ReactNode } from "react"

/**
 * Space
 * 
 * @returns 
 */
export default function ({ title, children }: Props) {

    return <nav className="-mx-3 space-y-6 ">
        <div className="space-y-3 ">
            <label className="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">{title}</label>
            {children}
        </div>
    </nav>
}

/**
 * Props
 * 
 */
interface Props {
    title: string
    children: ReactNode
}