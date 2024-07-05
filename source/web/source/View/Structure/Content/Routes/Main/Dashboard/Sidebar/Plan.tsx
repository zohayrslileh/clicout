import { Button, Card } from "@nextui-org/react"
import { Lang } from "@/Tools/Language"
import { CiStar } from "react-icons/ci"
import { Link } from "react-router-dom"
import Plan from "@/Core/Plan"

/**
 * Plan
 * 
 * @returns 
 */
export default function () {

    /**
     * Plan
     * 
     */
    const plan = Plan.useContext()

    return <Card className="grid grid-rows-[1fr_auto] gap-4 self-end p-5 m-6 mt-0 bg-gradient-to-r from-primary-300 bg-primary-200 shadow-none justify-center">
        <p className="text-yellow-500 font-medium">Your plan: {plan.name}</p>
        <Button color="success" as={Link} to="upgrade" startContent={<CiStar />}><Lang>Upgrade</Lang></Button>
    </Card>
}