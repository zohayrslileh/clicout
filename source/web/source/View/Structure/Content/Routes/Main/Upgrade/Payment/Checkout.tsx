import { IoCloseSharp, IoCheckmarkSharp } from "react-icons/io5"
import { useNavigate } from "react-router-dom"
import Subscription from "@/Core/Subscription"
import Appearance from "@/View/Appearance"
import { Button } from "@nextui-org/react"
import { SiTether } from "react-icons/si"
import Card from "@/View/Components/Card"
import usePromise from "@/Tools/Promise"
import { Lang } from "@/Tools/Language"
import styled from "@emotion/styled"
import Color from "@/Tools/Color"
import { Fragment } from "react"
import Plan from "@/Core/Plan"
import User from "@/Core/User"
import config from "@/config"

/**
 * Checkout
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
     * User
     * 
     */
    const user = User.useContext()

    /**
     * Subscription controller
     * 
     */
    const subscriptionController = Subscription.useController()

    /**
     * Subscribe promise
     * 
     */
    const subscribe = usePromise(async function () {

        // Create subscription
        const subscription = await user.subscribe(plan)

        if (typeof subscription === "string") window.open(subscription, "_self")

        else {

            subscriptionController.dispatch(subscription)

            navigate("/main")
        }
    })

    return <Container $color={plan.color}>
        <div id="content" className={`plan-${plan.id}`}>
            <div id="info">
                <p id="name"><plan.avatar />{plan.name}</p>
                <div id="features">
                    <p className="label"><Lang>Max attacks</Lang></p>
                    <p className="value">{plan.threads}</p>
                    <p className="label"><Lang>Customize location</Lang></p>
                    <p className="value">{plan.customizeLocation ? TrueFeature : FalseFeature}</p>
                    <p className="label"><Lang>Customize devices</Lang></p>
                    <p className="value">{plan.customizeDevices ? TrueFeature : FalseFeature}</p>
                    <p className="label"><Lang>Enable proxies</Lang></p>
                    <p className="value">{plan.enableProxies ? TrueFeature : FalseFeature}</p>
                </div>
            </div>
            <div id="payment">
                <div id="price">
                    <p id="value">{plan.price}</p>
                    <p id="symbol">$/<Lang>month</Lang></p>
                </div>
                <div id="methods">
                    {plan.price ? <Fragment>
                        <Button onClick={subscribe.safeExecute} disabled={subscribe.pending}><SiTether /><Lang>Payment</Lang></Button>
                        <div id="contact">
                            <p><Lang>Or</Lang></p>
                            <a href={config.TELEGRAM_CONTACT} target="_blank"><Lang>Telegram Contact</Lang></a>
                        </div>
                    </Fragment> : <Button onClick={subscribe.safeExecute} disabled={subscribe.pending}><Lang>Active</Lang></Button>}
                </div>
            </div>
        </div>
    </Container>
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
    width: fit-content;
    margin: auto;

    > #content {
        padding: 40px;
        box-sizing: border-box;
        gap: 40px;
        display: grid;
        grid-template-columns: 1fr 1fr;

        &.plan-2 {
            box-shadow: 0 0 10px ${() => Appearance.schema.COLOR_YELLOW.rgba(0.1)};

            > #name {
                opacity: 1;
                color: ${() => Appearance.schema.COLOR_YELLOW.rgba()};
            }
        }

        > .line {
            background-color: ${props => props.$color.rgba()};
        }

        > #info {
            display: grid;
            gap: 40px;

            > #name {
                color: ${props => props.$color.rgba()};
                text-shadow: 0 0 30px ${props => props.$color.rgba()};
                font-size: 35px;
                font-family: ${() => Appearance.schema.FONT_BOLD};
                margin: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 20px;
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
        }

        > #payment {
            display: grid;
            grid-template-rows: auto 1fr;
            gap: 40px;

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
                    color: ${props => props.$color.rgba()};
                }
            }

            > #methods {
                display: grid;
                align-self: end;
                gap: 10px;

                > #contact {
                    display: grid;
                    gap: 10px;

                    > p {
                        margin: 0;
                        font-size: 12px;
                        opacity: 0.3;
                    }
                    
                    > a {
                        text-decoration: none;
                        font-size: 13px;
                    }
                }
            }
        }
    }
`