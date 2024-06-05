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
        {plans.map(plan => <Row plan={plan} />)}
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
`