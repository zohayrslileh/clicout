import Button from "@/View/Components/Button"
import Card from "@/View/Components/Card"
import usePromise from "@/Tools/Promise"
import { Lang } from "@/Tools/Language"
import styled from "@emotion/styled"
import Plan from "@/Core/Plan"
import User from "@/Core/User"

/**
 * Row
 * 
 * @returns 
 */
export default function ({ plan }: Props) {

    /**
     * User
     * 
     */
    const user = User.useContext()

    /**
     * Subscribe promise
     * 
     * @returns
     */
    const subscribe = usePromise(async function () {

        await new Promise(resolve => setTimeout(resolve, 3000))

        await user.subscribe(plan, "WITHOUT")
    })

    return <Container>
        {plan.name}: {plan.price}$
        <Button onClick={subscribe.safeExecute} disabled={subscribe.pending}><Lang>Subscribe</Lang></Button>
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