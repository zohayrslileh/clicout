import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, User as UserUI } from "@nextui-org/react"
import Authorization from "@/Models/Authorization"
import { useNavigate } from "react-router-dom"
import { Lang } from "@/Tools/Language"
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

    return <Dropdown>
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
                <Lang>Logout</Lang>
            </DropdownItem>
        </DropdownMenu>
    </Dropdown>
}