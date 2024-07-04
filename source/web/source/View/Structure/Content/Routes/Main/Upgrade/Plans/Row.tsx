import { IoCloseSharp, IoCheckmarkSharp } from "react-icons/io5"
import { Button, Card } from "@nextui-org/react"
import { useNavigate } from "react-router-dom"
import Appearance from "@/View/Appearance"
import { Lang } from "@/Tools/Language"
import styled from "@emotion/styled"
import Color from "@/Tools/Color"
import Plan from "@/Core/Plan"

/**
 * Row
 * 
 * @returns 
 */
export default function ({ plan }: Props) {

    /**
     * Navigate
     * 
     */
    const navigate = useNavigate()

    return <Container className={`plan-${plan.id} smooth rounded-md`} $color={plan.color}>
        <p id="name"><plan.avatar />{plan.name}</p>
        <div id="price">
            <p id="value">{plan.price}</p>
            <p id="symbol">$/<Lang>month</Lang></p>
        </div>
        <div id="features">
            <p className="label"><Lang>Max attacks</Lang></p>
            <p className="value">{plan.threads}</p>
            <p className="label"><Lang>Customize cities</Lang></p>
            <p className="value">{plan.customizeCities ? TrueFeature : FalseFeature}</p>
            <p className="label"><Lang>Customize devices</Lang></p>
            <p className="value">{plan.customizeDevices ? TrueFeature : FalseFeature}</p>
            <p className="label"><Lang>Enable proxies</Lang></p>
            <p className="value">{plan.enableProxies ? TrueFeature : FalseFeature}</p>
        </div>
        <Button variant={plan.id === 2 ? undefined : "bordered"} size="lg" onClick={() => navigate(`${plan.id}`)}><Lang>Subscribe</Lang></Button>
    </Container >
}

/**
 * True Feature
 * 
 */
const TrueFeature = <IoCheckmarkSharp style={{ color: "#5fce5f" }} />

/**
 * False Feature
 * 
 */
const FalseFeature = <IoCloseSharp style={{ color: "#ee3d3d" }} />

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
const Container = styled(Card) <{
    $color: Color
}>`
    min-width: 300px;
    display: grid;
    grid-template-rows: auto auto 1fr auto;
    padding: 20px;
    box-sizing: border-box;
    gap: 30px;
    margin: auto;

    &.plan-1, &.plan-3 {
        scale: 0.97;

        > button {
            color: ${props => props.$color.rgba()};
            border-color: ${props => props.$color.rgba()};
        }
    }

    &.plan-2 {

        > button {
            background-color: ${props => props.$color.rgba()};
        }
    }

    > #name {
        color: ${props => props.$color.rgba()};
        // text-shadow: 0 0 30px ${props => props.$color.rgba()};
        font-size: 35px;
        font-family: ${() => Appearance.schema.FONT_BOLD};
        margin: 0;
        margin-top: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 20px;
    }

    > #price {
        display: flex;
        align-items: end;
        gap: 10px;
        margin: auto;

        > #value {
            font-size: 40px;
            font-family: ${() => Appearance.schema.FONT_BOLD};
            margin: 0;
        }

        > #symbol {
            margin-bottom: 12px;
            color: ${props => props.$color.rgba()};
            font-family: ${() => Appearance.schema.FONT_LIGHT};
            user-select: none;
            opacity: 0.5;
        }
    }
    
    > #features {
        display: grid;
        grid-template-columns: 1fr auto;
        text-align: start;
        align-content: space-evenly;
        margin-inline: 15px;
        gap: 30px;

        > p {
            margin: 0;

            &.label {
                opacity: 0.5;
            }

            &.value {
                font-family: ${() => Appearance.schema.FONT_BOLD};
                color: ${props => props.$color.rgba()};
            }
        }
    }
`