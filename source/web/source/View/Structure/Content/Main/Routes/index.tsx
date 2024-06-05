import { Navigate, Route, Routes } from "react-router-dom"
import Dashboard from "./Dashboard"
import Upgrade from "./Upgrade"

/**
 * Routes
 * 
 * @returns 
 */
export default function () {

    return <Routes>
        <Route index element={false ? <Dashboard /> : <Navigate to="upgrade" />} />
        <Route path="upgrade" element={<Upgrade />} />
    </Routes>
}