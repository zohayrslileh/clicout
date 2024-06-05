import PendingException from "@/View/Exception/Exceptions/Pending"
import { Navigate, Route, Routes } from "react-router-dom"
import { Throw } from "@/Tools/Exception"
import usePromise from "@/Tools/Promise"
import User from "@/Core/User"
import { lazy } from "react"

const Dashboard = lazy(() => import("./Dashboard"))
const Upgrade = lazy(() => import("./Upgrade"))

/**
 * Main
 * 
 * @returns 
 */
export default function ({ user }: Props) {

    /**
     * Subscription promise
     * 
     */
    const subscription = usePromise(async () => await user.subscription(), [])

    // Pending status
    if (subscription.pending) return <Throw exception={new PendingException} />

    // Exception status
    if (subscription.exception) return <Throw exception={subscription.exception.current} />

    return <User.context.Provider value={user}>

        {/** Routes */}
        <Routes>

            {/** Dashboard */}
            <Route index element={subscription.solve ? <Dashboard /> : <Navigate to="upgrade" />} />

            {/** Upgrade */}
            <Route path="upgrade" element={<Upgrade />} />

        </Routes>

    </User.context.Provider>
}

/**
 * Props
 * 
 */
interface Props {
    user: User
}