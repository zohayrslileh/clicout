import PendingException from "@/View/Exception/Exceptions/Pending"
import { Navigate } from "react-router-dom"
import { Throw } from "@/Tools/Exception"
import User from "@/Core/User"
import Login from "./Login"

/**
 * Auth
 * 
 * @returns 
 */
export default function () {

    /**
     * Authentication
     * 
     */
    const authentication = User.useAuthentication()

    // Pending status
    if (authentication.pending) return <Throw exception={new PendingException} />

    // Unauthorized status
    if (authentication.unauthorized) return <Login />

    // Exception status
    if (authentication.exception) return <Throw exception={authentication.exception.current} />

    // Authorized status
    return <Navigate to="/main" />
}