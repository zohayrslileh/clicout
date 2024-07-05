import Logo from "@/View/Components/Logo"
import Menu from "./Menu"

/**
 * Sidebar
 * 
 * @returns 
 */
export default function () {

    return <div className="relative min-w-[280px] grid grid-rows-[auto_1fr] gap-10 overflow-x-hidden overflow-y-auto p-10 border-e-1 border-gray-200 dark:border-gray-900">

        <Logo width={150} className="m-auto" />

        <Menu />

    </div>
}