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

    // Authorized status
    if (!authentication.unauthorized) return <Navigate to="/main" />

    // Exception status
    if (authentication.exception) return <Throw exception={authentication.exception.current} />

    // Unauthorized status
    return <Login />
}