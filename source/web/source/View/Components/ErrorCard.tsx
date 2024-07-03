import { BiError } from "react-icons/bi"
import { Chip } from "@nextui-org/react"

/**
 * Error card
 * 
 * @returns
 */
export default function ({ message }: Props) {

    return <Chip className="rounded-lg p-4 min-w-full" variant="flat" color="danger" startContent={<BiError />}>
        {message}
    </Chip>
}

/**
 * Props
 * 
 */
interface Props {
    message: string
}