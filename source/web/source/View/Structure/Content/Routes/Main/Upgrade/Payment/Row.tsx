import { useNavigate } from "react-router-dom"
import Button from "@/View/Components/Button"
import Appearance from "@/View/Appearance"
import Card from "@/View/Components/Card"
import { Lang } from "@/Tools/Language"
import styled from "@emotion/styled"
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

    /**
     * True Feature
     * 
     */
    const TrueFeature = <b style={{ color: "#5fce5f" }}>✓</b>

    /**
     * False Feature
     * 
     */
    const FalseFeature = <b style={{ color: "#ee3d3d" }}>✗</b>

    return <Container>
        <div id="content" className={`plan-${plan.id}`}>
            <div id="info">
                <p id="name">{plan.name}</p>
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
            </div>
            <div id="payment">
                <p id="price">
                    <p id="value">{plan.price}</p>
                    <p id="symbol">$/<Lang>month</Lang></p>
                </p>
                <div id="methods">
                    <Button onClick={() => navigate(`${plan.id}`)}><Lang>Subscribe</Lang></Button>
                </div>
            </div>
        </div>
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
    width: fit-content;
    margin: auto;

    > #content {
        padding: 40px;
        box-sizing: border-box;
        gap: 40px;
        display: grid;
        grid-template-columns: 1fr 1fr;

        &.plan-1 {
            --unique-color: #71834e;
        }

        &.plan-2 {
            --unique-color: ${() => Appearance.schema.COLOR_YELLOW.rgba()};
            box-shadow: 0 0 10px ${() => Appearance.schema.COLOR_YELLOW.rgba(0.1)};

            > #name {
                opacity: 1;
                color: ${() => Appearance.schema.COLOR_YELLOW.rgba()};
            }
        }

        &.plan-3 {
            --unique-color: #7355ff;
        }

        > .line {
            background-color: var(--unique-color);
        }

        > #info {
            display: grid;
            gap: 20px;

            > #name {
                color: var(--unique-color);
                text-shadow: 0 0 30px var(--unique-color);
                font-size: 35px;
                font-family: ${() => Appearance.schema.FONT_BOLD};
                margin: 0;
                margin-bottom: 20px;
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
                        color: var(--unique-color);
                    }
                }
            }
        }

        > #payment {
            display: grid;
            grid-template-rows: auto 1fr;

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

            > #methods {
                display: grid;
                align-self: end;
            }
        }
    }
`