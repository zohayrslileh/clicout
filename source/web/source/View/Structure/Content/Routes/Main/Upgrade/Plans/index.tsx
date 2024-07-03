import PendingException from "@/View/Exception/Exceptions/Pending"
import { Throw } from "@/Tools/Exception"
import usePromise from "@/Tools/Promise"
import styled from "@emotion/styled"
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

    return <Container>
        {plans.solve.map(plan => <Row key={plan.id} plan={plan} />)}
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 30px;
    margin-inline: auto;
    margin-block: 10px;
`