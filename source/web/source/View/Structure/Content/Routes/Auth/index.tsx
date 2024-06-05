import { Navigate, Route, Routes } from "react-router-dom"
import { Update } from "@/Tools/Updater"
import User from "@/Core/User"
import { lazy } from "react"

const Register = lazy(() => import("./Register"))
const Login = lazy(() => import("./Login"))

/**
 * Auth
 * 
 * @returns 
 */
export default function ({ onSuccess }: Props) {

    /**
     * Routes
     * 
     */
    return <Routes>

        {/** Index */}
        <Route index element={<Navigate to="login" />} />

        {/** Login */}
        <Route path="login" element={<Login onSuccess={onSuccess} />} />

        {/** Register */}
        <Route path="register" element={<Register />} />

    </Routes>
}

/**
 * Props
 * 
 */
interface Props {
    onSuccess: Update<User | undefined>
}