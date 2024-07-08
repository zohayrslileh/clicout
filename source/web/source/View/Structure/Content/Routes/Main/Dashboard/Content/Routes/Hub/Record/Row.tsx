import Card from "@/View/Components/Card"
import { Lang } from "@/Tools/Language"
import { Link } from "react-router-dom"
import Attack from "@/Core/Attack"

/**
 * Row
 * 
 * @returns
 */
export default function ({ attack }: Props) {

    attack

    return <Link to="create" className="contents">
        <Card circleStyle={false} className="relative active:scale-95 transition-all h-[300px] smooth grid place-content-center place-items-center gap-5">
            <div className="absolute right-5 bottom-5 flex items-end gap-1 text-success-400">
                <p className="text-xl leading-none font-medium">1</p>
                <p className="text-[12px]">/ 5 <Lang>Searches</Lang></p>
            </div>
        </Card>
    </Link>
}

/**
 * Props
 * 
 */
interface Props {
    attack: Attack
}