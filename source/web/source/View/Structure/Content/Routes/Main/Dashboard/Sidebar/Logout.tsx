import LinkButton from "@/View/Components/LinkButton"
import { Lang } from "@/Tools/Language"
import { useCallback } from "react"
import User from "@/Core/User"

/**
 * Sidebar
 * 
 * @returns 
 */
export default function () {

    /**
     * Controller
     * 
     */
    const controller = User.useController()

    /**
     * Logout method
     * 
     * @returns
     */
    const logout = useCallback(function () {

        // Logout
        User.logout()

        // Dispatch user
        controller.dispatch(undefined)

    }, [])

    return <LinkButton to="" onClick={logout}><Lang>Logout</Lang></LinkButton>
}