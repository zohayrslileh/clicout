import { BASE_SERVER_URL } from "@/Models/Server/Request"
import Search from "@/Core/Search"

/**
 * Search item
 * 
 * @returns
 */
export default function ({ search }: Props) {

    return <video src={`${BASE_SERVER_URL}stream/${search.recordId}`} controls autoPlay />
}

/**
 * Props
 * 
 */
interface Props {
    search: Search
}