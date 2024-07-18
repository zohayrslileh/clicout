import { BASE_SERVER_URL } from "@/Models/Server/Request"
import Search from "@/Core/Search"

/**
 * Search item
 * 
 * @returns
 */
export default function ({ search }: Props) {

    return <div>
        <video src={BASE_SERVER_URL + search.id} autoPlay />
    </div>
}

/**
 * Props
 * 
 */
interface Props {
    search: Search
}