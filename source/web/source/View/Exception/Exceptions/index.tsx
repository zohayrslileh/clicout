import { BiError } from "react-icons/bi"
import { Chip } from "@nextui-org/react"

/*
|-----------------------------
|  View Exception
|-----------------------------
|
|
*/
export default class ViewException extends Error {

    /**
     * View component
     * 
     * @returns
     */
    public view() {

        return <Chip
            className="m-auto rounded-lg p-4"
            variant="flat"
            color="danger"
            startContent={<BiError />}
        >
            {this.message}
        </Chip>
    }
}