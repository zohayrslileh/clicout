import PendingException from "@/View/Exception/Exceptions/Pending"
import JsonView from "@/View/Components/JsonView"
import { useParams } from "react-router-dom"
import { Throw } from "@/Tools/Exception"
import usePromise from "@/Tools/Promise"
import styled from "@emotion/styled"
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
    const plan = usePromise(async () => await Plan.findOne(+params.id!), [])

    // Pending status
    if (plan.pending) return <Throw exception={new PendingException} />

    // Exception status
    if (plan.exception) return <Throw exception={plan.exception.current} />

    return <Container>
        <JsonView json={plan.solve} />
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled.div`
`