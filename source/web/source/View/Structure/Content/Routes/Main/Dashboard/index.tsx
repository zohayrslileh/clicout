import PendingException from "@/View/Exception/Exceptions/Pending"
import { Throw } from "@/Tools/Exception"
import usePromise from "@/Tools/Promise"
import Content from "./Content"
import Sidebar from "./Sidebar"
import User from "@/Core/User"
import Plan from "@/Core/Plan"

/**
 * Dashboard
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
     * Plan promise
     * 
     */
    const plan = usePromise(async () => await user.plan(), [])

    // Pending status
    if (plan.pending) return <Throw exception={new PendingException} />

    // Exception status
    if (plan.exception) return <Throw exception={plan.exception.current} />

    return <Plan.context.Provider value={plan.solve}>

        <div className="grid grid-cols-[auto_1fr] h-full overflow-hidden">

            {/** Sidebar */}
            <Sidebar />

            {/** Content */}
            <Content />

        </div>

    </Plan.context.Provider>
}