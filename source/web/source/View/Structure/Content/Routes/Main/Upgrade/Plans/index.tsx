import styled from "@emotion/styled"
import Plan from "@/Core/Plan"
import Row from "./Row"

/**
 * Plans
 * 
 * @returns 
 */
export default function ({ plans }: Props) {

    return <Container>
        {plans.map(plan => <Row key={plan.id} plan={plan} />)}
    </Container>
}

/**
 * Props
 * 
 */
interface Props {
    plans: Plan[]
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