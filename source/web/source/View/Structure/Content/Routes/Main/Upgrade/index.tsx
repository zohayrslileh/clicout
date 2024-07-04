import Authorization from "@/Models/Authorization"
import { Button } from "@nextui-org/react"
import { useCallback } from "react"
import User from "@/Core/User"
import Plans from "./Plans"

/**
 * Upgrade
 * 
 * @returns 
 */
export default function () {

    /**
     * User
     * 
     */
    const user = User.useContext()

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

    return (
        <div className="container grid m-auto justify-items-center">
            <div className="flex flex-wrap -mx-4">
                <div className="w-full px-4">
                    <div className="text-center mx-auto mb-10 mt-5 max-w-[510px]">
                        <h2 className="font-bold text-3xl sm:text-4xl md:text-[40px] text-dark mb-4">
                            Our Pricing Plan
                        </h2>
                        <p className="text-base text-body-color">
                            Hi, <b className="text-success">{user.username}</b> 👋. Please choose the plan that suits you.
                        </p>
                    </div>
                </div>
            </div>
            <Plans />
            <Button className="m-auto text-medium" variant="light" onClick={logout}>Logout</Button>
        </div>
    )
}