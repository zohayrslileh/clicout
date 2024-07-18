import PendingException from "@/View/Exception/Exceptions/Pending"
import { Throw } from "@/Tools/Exception"
import Card from "@/View/Components/Card"
import { CiFlag1 } from "react-icons/ci"
import { Lang } from "@/Tools/Language"
import { Link } from "react-router-dom"
import AttackItem from "./AttackItem"
import Attack from "@/Core/Attack"
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

    /**
     * Running attacks promise
     * 
     */
    const runningAttacks = Attack.useRunningController()

    // Pending status
    if (runningAttacks.pending) return <Throw exception={new PendingException} />

    // Exception status
    if (runningAttacks.exception) return <Throw exception={runningAttacks.exception.current} />

    return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">

        {/** Create */}
        <Link to="create" className="contents">
            <Card circleStyle={false} className="relative active:scale-95 transition-all h-[300px] smooth grid place-content-center place-items-center gap-5">
                <CiFlag1 className="text-3xl text-foreground-500" />
                <p className="uppercase text-sm font-medium text-foreground-500"><Lang>Create New Attack</Lang></p>
                <div className="absolute right-5 bottom-5 flex items-end gap-1 text-success-400">
                    <p className="text-xl leading-none font-medium">{runningAttacks.solve.length}</p>
                    <p className="text-[12px]">/ {plan.threads} <Lang>Attack(s)</Lang></p>
                </div>
            </Card>
        </Link>

        {/** Attacks */}
        {runningAttacks.solve.map(attack => <AttackItem key={attack.id} attack={attack} />)}

    </div>
}