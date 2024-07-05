import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, User as UserUI } from "@nextui-org/react"
import Authorization from "@/Models/Authorization"
import { useNavigate } from "react-router-dom"
import { useCallback } from "react"
import User from "@/Core/User"

/**
 * Navbar
 * 
 * @returns 
 */
export default function () {

    /**
     * Navigate
     * 
     */
    const navigate = useNavigate()

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

    return <div className="grid grid-cols-[1fr_auto] gap-3 px-5 py-3 items-center sticky z-10 top-0 backdrop-blur-md p-3 border rounded-lg border-primary border-opacity-20">

        <p></p>
        <Dropdown>
            <DropdownTrigger>
                <UserUI
                    name="M. Customer"
                    className="text-sm cursor-pointer"
                    description={`@${user.username}`}
                    avatarProps={{
                        name: user.username,
                        size: "sm"
                    }}
                />
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
                <DropdownItem onClick={() => navigate("profile")} key="edit">Edit Profile</DropdownItem>
                <DropdownItem key="delete" onClick={logout} className="text-danger" color="danger">
                    Logout
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </div>
}