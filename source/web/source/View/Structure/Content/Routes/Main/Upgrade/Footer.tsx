import Authorization from "@/Models/Authorization"
import { Button } from "@nextui-org/react"
import { useCallback } from "react"
import User from "@/Core/User"

/**
 * Footer
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

        // Clear Authorization
        Authorization.update("")

        // Dispatch user
        controller.dispatch(undefined)

    }, [])

    return <Button className="m-auto text-medium text-primary" variant="light" onClick={logout}>Logout</Button>
}