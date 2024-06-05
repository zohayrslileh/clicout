import PendingException from "@/View/Exception/Exceptions/Pending"
import { Throw } from "@/Tools/Exception"
import usePromise from "@/Tools/Promise"
import { Lang } from "@/Tools/Language"
import styled from "@emotion/styled"
import User from "@/Core/User"
import Plan from "@/Core/Plan"
import Plans from "./Plans"

/**
 * Upgrade
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
     * Plans promise
     * 
     */
    const plans = usePromise(async () => await Plan.find(), [])

    // Pending status
    if (plans.pending) return <Throw exception={new PendingException} />

    // Exception status
    if (plans.exception) return <Throw exception={plans.exception.current} />

    return <Container>
        <h1><Lang>Welcome</Lang>, {user.username}</h1>
        <p>Please choose the plan that suits you.</p>
        <Plans plans={plans.solve} />
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled.div`
`