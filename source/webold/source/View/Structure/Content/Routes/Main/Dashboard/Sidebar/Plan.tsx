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
        <p id="current-plan"><plan.avatar color={plan.color.hex} /> {plan.name}</p>
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled.div`
`