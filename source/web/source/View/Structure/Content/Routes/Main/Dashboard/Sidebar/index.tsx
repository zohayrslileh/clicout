import Logo from "@/View/Components/Logo"
import Card from "@/View/Components/Card"
import Plan from "./Plan"
import Menu from "./Menu"

/**
 * Sidebar
 * 
 * @returns 
 */
export default function () {

    return <Card className="relative grid grid-rows-[auto_auto_1fr] min-w-[280px] gap-10 overflow-x-hidden overflow-y-auto rounded-sm border-0 border-e border-primary border-opacity-20 dark:border-gray-900">

        <Logo width={170} className="m-auto pt-10" />

        <Menu />

        <Plan />

    </Card>
}