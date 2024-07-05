import { Button } from "@nextui-org/react"
import { Link } from "react-router-dom"
import { ReactNode } from "react"

/**
 * Link
 * 
 * @returns 
 */
export default function ({ path, children }: Props) {

    return <Button to={path} variant="light" as={Link} className="flex text-[#919eab] gap-1 items-center justify-start px-6 py-[22px] transition-colors duration-300 transform rounded-md hover:">
        {children}
    </Button>
}

/**
 * Props
 * 
 */
interface Props {
    path: string
    children: ReactNode
}