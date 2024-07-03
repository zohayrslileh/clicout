import { Navigate, Route, Routes } from "react-router-dom"
import { lazy } from "react"

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
        <Route path="register" element={<h1>Register</h1>} />

    </Routes>
}