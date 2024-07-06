import Card from "@/View/Components/Card"
import { CiFlag1 } from "react-icons/ci"
import { Lang } from "@/Tools/Language"
import { Link } from "react-router-dom"
import Plan from "@/Core/Plan"

/**
 * Record
 * 
 * @returns
 */
export default function () {

    /**
     * Plan
     * 
     */
    const plan = Plan.useContext()

    return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <Link to="create">
            <Card circleStyle={false} className="relative active:scale-95 transition-all h-[300px] smooth grid place-content-center place-items-center gap-5">
                <CiFlag1 className="text-3xl text-foreground-500" />
                <p className="uppercase text-sm font-medium text-foreground-500"><Lang>Create New Attack</Lang></p>
                <div className="absolute right-5 bottom-5 flex items-end gap-1 text-success-500">
                    <p className="text-3xl leading-none font-medium">0</p>
                    <p className="text-sm">/ {plan.threads} <Lang>Attack(s)</Lang></p>
                </div>
            </Card>
        </Link>
    </div>
}