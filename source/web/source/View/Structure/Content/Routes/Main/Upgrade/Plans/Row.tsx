import JsonView from "@/View/Components/JsonView"
import Button from "@/View/Components/Button"
import Card from "@/View/Components/Card"
import usePromise from "@/Tools/Promise"
import { Lang } from "@/Tools/Language"
import styled from "@emotion/styled"
import Plan from "@/Core/Plan"
import User from "@/Core/User"
import Appearance from "@/View/Appearance"

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
    const subscribe = usePromise(async () => await user.subscribe(plan))

    return <Container className={`plan-${plan.id}`}>
        {plan.name}: {plan.price}$
        <Button onClick={subscribe.safeExecute} disabled={subscribe.pending}><Lang>Subscribe</Lang></Button>
        {subscribe.solve ? <JsonView json={subscribe.solve.current} /> : undefined}
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
    display: grid;
    grid-template-rows: 1fr auto;
    padding: 20px;
    box-sizing: border-box;

    &.plan-1, &.plan-3 {
        transform: scale(0.97);

        &:hover {
            transform: scale(1);
        }
    }

    &.plan-2 {
        box-shadow: 0 0 10px ${() => Appearance.schema.COLOR_YELLOW.rgba(0.1)};

        > .line {
            background-color: ${() => Appearance.schema.COLOR_YELLOW.rgba()};
        }
    }
`