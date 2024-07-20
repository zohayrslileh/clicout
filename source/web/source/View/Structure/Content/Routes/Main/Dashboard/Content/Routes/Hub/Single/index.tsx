import PendingException from "@/View/Exception/Exceptions/Pending"
import { useParams } from "react-router-dom"
import { Throw } from "@/Tools/Exception"
import usePromise from "@/Tools/Promise"
import User from "@/Core/User"

/**
 * Single
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
     * User
     * 
     */
    const user = User.useContext()

    /**
     * Attack promise
     * 
     */
    const attackPromise = usePromise(async () => await user.findAttack(+params.id!), [])

    // Pending status
    if (attackPromise.pending) return <Throw exception={new PendingException} />

    // Exception status
    if (attackPromise.exception) return <Throw exception={attackPromise.exception.current} />

    console.log(attackPromise.solve)

    return <div className="">
    </div>
}