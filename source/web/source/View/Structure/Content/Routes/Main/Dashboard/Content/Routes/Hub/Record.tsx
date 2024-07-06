import { Button, Card } from "@nextui-org/react"
import { useNavigate } from "react-router-dom"
import { CiFlag1 } from "react-icons/ci"
import { Lang } from "@/Tools/Language"

/**
 * Record
 * 
 * @returns
 */
export default function () {

    /**
     * Navigate
     * 
     */
    const navigate = useNavigate()

    return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <Card isPressable as={Button} onClick={() => navigate("create")} className="relative h-[300px] smooth grid place-content-center place-items-center gap-5">
            <CiFlag1 className="text-3xl" />
            <h1 className="uppercase"><Lang>Create New Attack</Lang></h1>
            <div className="absolute right-5 bottom-5 flex items-end gap-1 text-success-500">
                <p className="text-3xl leading-none font-medium">0</p>
                <p>/ 2 <Lang>Attack(s)</Lang></p>
            </div>
        </Card>
    </div>
}