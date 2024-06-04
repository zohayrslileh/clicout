import PendingException from "@/View/Exception/Exceptions/Pending"
import { Navigate, Route, Routes } from "react-router-dom"
import { Throw } from "@/Tools/Exception"
import User from "@/Core/User"
import { lazy } from "react"

const Login = lazy(() => import("./Login"))
const Register = lazy(() => import("./Register"))

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
    if (authentication.unauthorized) return <Routes>
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />
    </Routes>

    // Exception status
    if (authentication.exception) return <Throw exception={authentication.exception.current} />

    // Authorized status
    return <Navigate to="/main" />
}