import PendingException from "@/View/Exception/Exceptions/Pending"
import { Navigate, Route, Routes } from "react-router-dom"
import { Throw } from "@/Tools/Exception"
import usePromise from "@/Tools/Promise"
import Dashboard from "./Dashboard"
import Upgrade from "./Upgrade"
import User from "@/Core/User"

/**
 * Routes
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
     * Subscription promise
     * 
     */
    const subscription = usePromise(async () => await user.subscription(), [])

    // Pending status
    if (subscription.pending) return <Throw exception={new PendingException} />

    // Exception status
    if (subscription.exception) return <Throw exception={subscription.exception.current} />

    return <Routes>
        <Route index element={subscription.solve ? <Dashboard /> : <Navigate to="upgrade" />} />
        <Route path="upgrade" element={<Upgrade />} />
    </Routes>
}