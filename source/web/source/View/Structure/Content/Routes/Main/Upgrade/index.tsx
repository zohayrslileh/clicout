import PendingException from "@/View/Exception/Exceptions/Pending"
import { Throw } from "@/Tools/Exception"
import usePromise from "@/Tools/Promise"
import { Lang } from "@/Tools/Language"
import styled from "@emotion/styled"
import User from "@/Core/User"
import Plan from "@/Core/Plan"

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
        <p>Please choose you plan</p>
        Plans: {plans.solve.length}
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled.div`
`