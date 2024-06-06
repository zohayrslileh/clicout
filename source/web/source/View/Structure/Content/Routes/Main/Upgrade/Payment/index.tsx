import PendingException from "@/View/Exception/Exceptions/Pending"
import { useParams } from "react-router-dom"
import { Throw } from "@/Tools/Exception"
import usePromise from "@/Tools/Promise"
import Checkout from "./Checkout"
import Plan from "@/Core/Plan"

/**
 * Payment
 * 
 * @returns 
 */
export default function () {

    /**
     * Params
     * 
     */
    const params = useParams()

    /**
     * Plan promise
     * 
     */
    const plan = usePromise(async () => await Plan.findOne(+params.plan!), [])

    // Pending status
    if (plan.pending) return <Throw exception={new PendingException} />

    // Exception status
    if (plan.exception) return <Throw exception={plan.exception.current} />

    return <Checkout plan={plan.solve} />
}