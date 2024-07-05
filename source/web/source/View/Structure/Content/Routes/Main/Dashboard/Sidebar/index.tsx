import Logo from "@/View/Components/Logo"
import Menu from "./Menu"

/**
 * Sidebar
 * 
 * @returns 
 */
export default function () {

    return <div className="relative grid grid-rows-[auto_1fr] min-w-[280px] gap-10 overflow-x-hidden overflow-y-auto border-e-1 border-gray-200 dark:border-gray-900">

        <Logo width={150} className="m-auto pt-10" />

        <Menu />

    </div>
}