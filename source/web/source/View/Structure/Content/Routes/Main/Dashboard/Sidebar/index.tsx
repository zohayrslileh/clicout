import Logo from "@/View/Components/Logo"
import Contact from "./Contact"
import Menu from "./Menu"

/**
 * Sidebar
 * 
 * @returns 
 */
export default function () {

    return <div className="relative grid grid-rows-[auto_1fr_auto] min-w-[275px] gap-10 overflow-x-hidden overflow-y-auto border-e border-primary border-opacity-20 dark:border-gray-900">

        <Logo width={170} className="m-auto pt-10 smooth" />

        <Menu />

        <Contact />

    </div>
}