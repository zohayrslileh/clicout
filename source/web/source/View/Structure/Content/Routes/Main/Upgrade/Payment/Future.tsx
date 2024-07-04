import { ReactNode } from "react"

/**
 * Future
 * 
 * @returns 
 */
export default function ({ isAvailable, color, children }: Props) {

    return isAvailable ? <li className="flex items-center">
        <svg
            aria-hidden="true"
            className="flex-shrink-0 h-4 w-4"
            style={{ color }}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
        </svg>
        <span className="font-normal leading-tight ms-3 text-base text-gray-500 dark:text-gray-400">
            {children}
        </span>
    </li> : <li className="flex decoration-gray-500 line-through">
        <svg
            aria-hidden="true"
            className="flex-shrink-0 h-4 w-4 dark:text-gray-500 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
        </svg>
        <span className="font-normal leading-tight ms-3 text-base text-gray-500">
            {children}
        </span>
    </li>
}

/**
 * Props
 * 
 */
interface Props {
    color: string
    isAvailable: boolean
    children: ReactNode
}