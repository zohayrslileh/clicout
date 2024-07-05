import { PiPlayPauseDuotone } from "react-icons/pi";

/**
 * Menu
 * 
 * @returns 
 */
export default function () {

    return <nav className="-mx-3 space-y-6 ">
        <div className="space-y-3 ">
            <label className="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">analytics</label>
            <a className="flex items-center p-3 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" href="#">
                <PiPlayPauseDuotone />
                <span className="mx-2 text-sm font-medium">Dashboard</span>
            </a>
        </div>
    </nav>
}