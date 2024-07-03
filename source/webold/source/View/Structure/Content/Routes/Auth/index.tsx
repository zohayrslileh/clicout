import { Navigate, Route, Routes } from "react-router-dom"
import { lazy } from "react"

const Register = lazy(() => import("./Register"))
const Login = lazy(() => import("./Login"))

/**
 * Auth
 * 
 * @returns 
 */
export default function () {

    /**
     * Routes
     * 
     */
    return <Routes>

        {/** Index */}
        <Route index element={<Navigate to="login" />} />

        {/** Login */}
        <Route path="login" element={<Login />} />

        {/** Register */}
        <Route path="register" element={<Register />} />

    </Routes>
}