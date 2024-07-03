import PendingException from "@/View/Exception/Exceptions/Pending"
import { Navigate, Route, Routes } from "react-router-dom"
import Subscription from "@/Core/Subscription"
import { Throw } from "@/Tools/Exception"
import usePromise from "@/Tools/Promise"
import User from "@/Core/User"
import { lazy } from "react"

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

        <Subscription.controller.Provider value={subscription}>

            {/** Routes */}
            <Routes>

                {/** Upgrade */}
                <Route path="upgrade/*" element={<Upgrade />} />

                {/** Dashboard */}
                <Route path="*" element={subscription.solve ? <p>Dashboard</p> : <Navigate to="upgrade" />} />

            </Routes>

        </Subscription.controller.Provider>

    </User.context.Provider>
}

/**
 * Props
 * 
 */
interface Props {
    user: User
}