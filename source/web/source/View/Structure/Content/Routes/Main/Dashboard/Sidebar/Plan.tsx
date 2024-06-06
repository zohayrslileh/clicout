import styled from "@emotion/styled"
import Plan from "@/Core/Plan"

/**
 * Plan
 * 
 * @returns 
 */
export default function () {

    /**
     * Plan
     * 
     */
    const plan = Plan.useContext()

    return <Container>
        Plan: {plan.name}
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled.div`
`