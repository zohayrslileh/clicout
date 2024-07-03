import PendingException from "@/View/Exception/Exceptions/Pending"
import Subscription from "@/Core/Subscription"
import { Throw } from "@/Tools/Exception"
import usePromise from "@/Tools/Promise"
import User from "@/Core/User"

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

            <h1>MAIN</h1>

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