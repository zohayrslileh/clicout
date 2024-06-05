import Button from "@/View/Components/Button"
import Appearance from "@/View/Appearance"
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
    const subscribe = usePromise(async () => await user.subscribe(plan))

    return <Container className={`plan-${plan.id}`}>
        <p id="name">{plan.name}</p>
        <p id="price">
            <p id="value">{plan.price}</p>
            <p id="symbol">$</p>
        </p>
        <div></div>
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
    display: grid;
    grid-template-rows: auto auto 1fr auto;
    padding: 20px;
    box-sizing: border-box;
    gap: 20px;

    &.plan-1 {
        --unique-color: #71834e;
    }

    &.plan-1, &.plan-3 {
        transform: scale(0.97);

        &:hover {
            transform: scale(1);

            > #name {
                opacity: 1;
            }
        }
    }

    &.plan-2 {
        --unique-color: ${() => Appearance.schema.COLOR_YELLOW.rgba()};
        box-shadow: 0 0 10px ${() => Appearance.schema.COLOR_YELLOW.rgba(0.1)};

        > .line {
            background-color: ${() => Appearance.schema.COLOR_YELLOW.rgba()};
        }

        > #name {
            opacity: 1;
            color: ${() => Appearance.schema.COLOR_YELLOW.rgba()};
        }
    }

    &.plan-3 {
        --unique-color: #7355ff;
    }

    > #name {
        color: var(--unique-color);
        text-shadow: 0 0 30px var(--unique-color);
        font-size: 25px;
        font-family: ${() => Appearance.schema.FONT_BOLD};
        opacity: 0.5;
        margin: 0;
    }

    > #price {
        display: flex;
        align-items: end;
        gap: 5px;
        margin: auto;

        > #value {
            font-size: 40px;
            font-family: ${() => Appearance.schema.FONT_BOLD};
            margin: 0;
        }

        > #symbol {
            margin-bottom: 5px;
            color: var(--unique-color);
        }
    }
`