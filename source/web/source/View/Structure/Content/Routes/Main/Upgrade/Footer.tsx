import Authorization from "@/Models/Authorization"
import { Button } from "@nextui-org/react"
import { Lang } from "@/Tools/Language"
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

    return <div className="grid gap-5 justify-items-center">
        <div className="flex items-center justify-between w-[100px] opacity-70 dark:opacity-30 select-none">
            <div className="w-full h-[1px] bg-gray-300" />
            <span className="text-sm uppercase mx-6 text-gray-400"><Lang>Or</Lang></span>
            <div className="w-full h-[1px] bg-gray-300" />
        </div>
        <Button className="m-auto text-medium text-primary" variant="light" onClick={logout}><Lang>Logout</Lang></Button>
    </div>
}