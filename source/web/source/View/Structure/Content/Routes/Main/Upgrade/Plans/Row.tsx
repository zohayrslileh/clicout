import Card from "@/View/Components/Card"
import styled from "@emotion/styled"
import Plan from "@/Core/Plan"

/**
 * Row
 * 
 * @returns 
 */
export default function ({ plan }: Props) {

    return <Container>
        {plan.name}: {plan.price}$
    </Container>
}

/**
 * Props
 * 
 */
interface Props {
    plan: Plan
}

/**
 * Container
 * 
 */
const Container = styled(Card)`
    width: 300px;
`