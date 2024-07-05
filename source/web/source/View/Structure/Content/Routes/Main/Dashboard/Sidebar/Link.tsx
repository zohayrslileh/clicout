import { Button } from "@nextui-org/react"
import { IconType } from "react-icons/lib"
import { Link } from "react-router-dom"

/**
 * Link
 * 
 * @returns 
 */
export default function ({ path, icon, title, active, news }: Props) {

    /**
     * Icon
     * 
     */
    const Icon = icon

    return <Button to={path} variant="light" as={Link} className={`flex text-opacity-70 ${active ? "bg-[#20dd78] bg-opacity-10 text-opacity-1 text-[#1cb671] dark:text-[#5be49b]" : ""} gap-1 items-center justify-start px-[12px] py-[23px] transition-colors duration-300 transform rounded-md`}>
        <div className="grid grid-cols-[auto_1fr_auto] items-center w-full">
            <Icon className="text-2xl" />
            <span className="mx-2 text-sm font-medium">{title}</span>
            {news && <span className="bg-success-300 text-[11px] font-medium bg-opacity-70 rounded-full px-[8px] py-[1px]">{news}</span>}
        </div>
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
    active: boolean
    news?: number
}