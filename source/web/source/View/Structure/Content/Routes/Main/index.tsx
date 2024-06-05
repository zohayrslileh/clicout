import User from "@/Core/User"
import Routes from "./Routes"

/**
 * Main
 * 
 * @returns 
 */
export default function ({ user }: Props) {

    /**
     * User provider
     * 
     */
    return <User.context.Provider value={user}>

        {/** Routes */}
        <Routes />

    </User.context.Provider>
}

/**
 * Props
 * 
 */
interface Props {
    user: User
}