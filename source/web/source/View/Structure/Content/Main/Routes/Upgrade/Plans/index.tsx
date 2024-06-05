import PendingException from "@/View/Exception/Exceptions/Pending"
import { Throw } from "@/Tools/Exception"
import usePromise from "@/Tools/Promise"
import styled from "@emotion/styled"
import Plan from "@/Core/Plan"

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

    return <Container>
        Plans: {plans.solve.length}
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled.div`
`