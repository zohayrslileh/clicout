import Logo from "@/View/Components/Logo"
import Card from "@/View/Components/Card"
import Upgrade from "./Upgrade"
import Menu from "./Menu"

/**
 * Sidebar
 * 
 * @returns 
 */
export default function () {

    return <Card className="relative grid grid-rows-[auto_1fr_auto] min-w-[280px] gap-10 overflow-x-hidden overflow-y-auto rounded-sm border-0 border-e border-primary border-opacity-20 dark:border-gray-900">

        <Logo width={150} className="m-auto pt-10" />

        <Menu />

        <Upgrade />

    </Card>
}