import { BASE_SERVER_URL } from "@/Models/Server/Request"
import { PrimitiveSearchLog } from "@/Core/SearchLog"
import Search from "@/Core/Search"
import Attack from "@/Core/Attack"
import User from "@/Core/User"

/**
 * Search item
 * 
 * @returns
 */
export default function ({ search }: Props) {

    /**
     * Attack
     * 
     */
    const attack = Attack.useContext()

    /**
     * Namespace
     * 
     */
    const namespace = User.useNamespace()

    /**
     * Logs
     * 
     */
    const logs = namespace.useStore<PrimitiveSearchLog>(`attack/${attack.id}/search/${search.id}/log/create`, 10)

    return <div>
        <video src={`${BASE_SERVER_URL}stream/${search.recordId}`} autoPlay muted />
        <div>
            {logs.map(log => <p key={log.id}>{log.title}</p>)}
        </div>
    </div>
}

/**
 * Props
 * 
 */
interface Props {
    search: Search
}