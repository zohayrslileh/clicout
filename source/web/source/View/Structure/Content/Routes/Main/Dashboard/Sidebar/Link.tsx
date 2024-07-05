import { Button } from "@nextui-org/react"
import { IconType } from "react-icons/lib"
import { Link } from "react-router-dom"

/**
 * Link
 * 
 * @returns 
 */
export default function ({ path, icon, title, active }: Props) {

    /**
     * Icon
     * 
     */
    const Icon = icon

    return <Button to={path} variant="light" as={Link} className={`flex group text-[#b0d7ff] ${active ? "bg-[#5be49b] bg-opacity-5 text-[#5be49b]" : ""} gap-1 items-center justify-start px-[10px] py-[22px] transition-colors duration-300 transform rounded-md`}>
        <Icon className="text-2xl" />
        <span className="mx-2 text-sm font-medium">{title}</span>
    </Button>
}

/**
 * Props
 * 
 */
interface Props {
    path: string
    title: string
    icon: IconType
    active?: boolean
}