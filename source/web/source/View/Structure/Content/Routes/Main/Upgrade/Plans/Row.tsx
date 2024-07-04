import { useNavigate } from "react-router-dom"
import { Button } from "@nextui-org/react"
import Appearance from "@/View/Appearance"
import Card from "@/View/Components/Card"
import { Lang } from "@/Tools/Language"
import Plan from "@/Core/Plan"
import Future from "./Future"

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

    return <div className="w-full md:w-1/2 lg:w-1/3 px-4" style={{ scale: plan.recommended ? "1" : "0.98" }}>
        <Card className="grid py-10 px-8 sm:p-12 lg:py-10 lg:px-6 xl:p-12">
            <span className="text-primary font-semibold text-lg block mb-4" style={{ color: plan.color.hex }}>
                {plan.name}
            </span>
            <h2 className="font-bold text-dark mb-5 text-[42px]">
                ${plan.price}
                <span className="text-base text-body-color font-medium">
                    / month
                </span>
            </h2>
            <p className="text-base text-body-color pb-8 border-b border-foreground border-opacity-20" style={{ fontFamily: Appearance.schema.FONT_LIGHT }}>
                <Lang>{plan.description}</Lang>.
            </p>
            <ul className="my-7 space-y-5" role="list">
                <Future isAvailable={!!plan.threads} color={plan.color.hex}><Lang>Launch</Lang> {plan.threads} <Lang>Attack(s) same time</Lang></Future>
                <Future isAvailable={plan.customizeLocation} color={plan.color.hex}><Lang>Customize location</Lang></Future>
                <Future isAvailable={plan.customizeDevices} color={plan.color.hex}><Lang>Customize devices</Lang></Future>
                <Future isAvailable={plan.enableProxies} color={plan.color.hex}><Lang>Enable proxies</Lang></Future>
            </ul>
            {
                plan.recommended
                    ? <Button size="lg" color="primary" className="text-background" style={{ backgroundColor: plan.color.hex }} onClick={() => navigate(`${plan.id}`)}><Lang>Subscribe</Lang></Button>
                    : <Button size="lg" color="primary" variant="bordered" style={{ color: plan.color.hex, borderColor: plan.color.hex }} onClick={() => navigate(`${plan.id}`)}><Lang>Subscribe</Lang></Button>
            }
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