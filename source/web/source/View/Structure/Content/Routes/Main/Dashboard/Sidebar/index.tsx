import Logo from "@/View/Components/Logo"
import Menu from "./Menu"

/**
 * Sidebar
 * 
 * @returns 
 */
export default function () {

    return <div className="relative grid grid-rows-[auto_1fr] gap-10 overflow-x-hidden overflow-y-auto p-10">

        <Logo width={150} />

        <Menu />

    </div>
}