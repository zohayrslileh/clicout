import { useNavigate } from "react-router-dom"
import Subscription from "@/Core/Subscription"
import { Button } from "@nextui-org/react"
import Appearance from "@/View/Appearance"
import { SiTether } from "react-icons/si"
import Card from "@/View/Components/Card"
import usePromise from "@/Tools/Promise"
import { Lang } from "@/Tools/Language"
import { Fragment } from "react"
import Plan from "@/Core/Plan"
import User from "@/Core/User"
import Future from "./Future"
import config from "@/config"

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

    return <div className="w-auto m-auto px-3 smooth" style={{ scale: plan.recommended ? "1" : "0.98" }}>
        <Card className="grid grid-cols-2 py-10 px-8 sm:p-12 lg:py-10 lg:px-6 xl:p-12 gap-20">
            <div className="grid">
                <span className="text-primary font-semibold text-lg block mb-4" style={{ color: plan.color.hex }}>
                    {plan.name}
                </span>
                <p className="text-base text-body-color pb-8 border-b border-foreground border-opacity-20" style={{ fontFamily: Appearance.schema.FONT_LIGHT }}>
                    <Lang>{plan.description}</Lang>.
                </p>
                <ul className="my-7 space-y-5" role="list">
                    <Future isAvailable={!!plan.threads} color={plan.color.hex}><Lang>Launch</Lang> {plan.threads} <Lang>Attack(s) same time</Lang></Future>
                    <Future isAvailable={plan.customizeLocation} color={plan.color.hex}><Lang>Customize location</Lang></Future>
                    <Future isAvailable={plan.customizeDevices} color={plan.color.hex}><Lang>Customize devices</Lang></Future>
                    <Future isAvailable={plan.enableProxies} color={plan.color.hex}><Lang>Enable proxies</Lang></Future>
                </ul>
            </div>
            <div className="grid">
                <h2 className="font-bold text-dark mb-5 text-[42px]">
                    {plan.price ? <Fragment>
                        ${plan.price}
                        <span className="text-base text-body-color font-medium">
                            / <Lang>month</Lang>
                        </span>
                    </Fragment> : <Lang>Free</Lang>}
                </h2>
                <div className="grid">
                    {
                        plan.price
                            ? <Button size="lg" color="success" onClick={subscribe.safeExecute} isLoading={subscribe.pending}><SiTether /><Lang>Payment</Lang></Button>
                            : <Button size="lg" color="success" onClick={subscribe.safeExecute} isLoading={subscribe.pending}><Lang>Active</Lang></Button>
                    }
                    <div className="flex items-center justify-between m-auto w-[100px] opacity-70 dark:opacity-30 select-none">
                        <div className="w-full h-[1px] bg-gray-300" />
                        <span className="text-sm uppercase mx-6 text-gray-400">Or</span>
                        <div className="w-full h-[1px] bg-gray-300" />
                    </div>
                    <a href={config.TELEGRAM_CONTACT} className="m-auto text-medium text-primary"><Lang>Telegram Contact</Lang></a>
                </div>
            </div>
        </Card>
    </div>
}

/**
 * Props
 * 
 */
interface Props {
    plan: Plan
}