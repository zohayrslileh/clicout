import Logo from "@/View/Components/Logo"
import Card from "@/View/Components/Card"
import Contact from "./Contact"
import Menu from "./Menu"

/**
 * Sidebar
 * 
 * @returns 
 */
export default function () {

    return <Card className="relative grid grid-rows-[auto_1fr_auto] smooth min-w-[275px] gap-10 overflow-x-hidden overflow-y-auto rounded-[0px] border-0 border-e border-primary border-opacity-20 dark:border-gray-900">

        <Logo width={170} className="m-auto pt-10" />

        <Menu />

        <Contact />

    </Card>
}