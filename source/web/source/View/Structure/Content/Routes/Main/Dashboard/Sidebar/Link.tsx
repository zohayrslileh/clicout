import { Link } from "react-router-dom"
import { ReactNode } from "react"

/**
 * Link
 * 
 * @returns 
 */
export default function ({ path, children }: Props) {

    return <Link to={path} className="flex items-center p-3 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
        {children}
    </Link>
}

/**
 * Props
 * 
 */
interface Props {
    path: string
    children: ReactNode
}