import PendingException from "@/View/Exception/Exceptions/Pending"
import { Route, Routes } from "react-router-dom"
import { Throw } from "@/Tools/Exception"
import usePromise from "@/Tools/Promise"
import { useContext } from "react"
import User from "@/Core/User"

/**
 * Main
 * 
 * @returns 
 */
export default function () {

    /**
     * User
     * 
     */
    const user = useContext(User.context)

    /**
     * Subscription promise
     * 
     */
    const subscription = usePromise(async () => await user.subscription())

    // Pending status
    if (subscription.pending) return <Throw exception={new PendingException} />

    // Exception status
    if (subscription.exception) return <Throw exception={subscription.exception.current} />

    return <Routes>
        <Route index element={<p></p>} />
        <Route index element={<p></p>} />
    </Routes>
}