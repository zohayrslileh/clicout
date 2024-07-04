import PendingException from "@/View/Exception/Exceptions/Pending"
import { Throw } from "@/Tools/Exception"
import usePromise from "@/Tools/Promise"
import Plan from "@/Core/Plan"
import Row from "./Row"

/**
 * Plans
 * 
 * @returns 
 */
export default function () {

    /**
     * Plans promise
     * 
     */
    const plans = usePromise(async () => await Plan.find(), [])

    // Pending status
    if (plans.pending) return <Throw exception={new PendingException} />

    // Exception status
    if (plans.exception) return <Throw exception={plans.exception.current} />

    return <div className="flex flex-wrap justify-center -mx-4 smooth xl:max-w-[90%] xl:w-[90%] m-auto">
        {plans.solve.map(plan => <Row key={plan.id} plan={plan} />)}
    </div>
}