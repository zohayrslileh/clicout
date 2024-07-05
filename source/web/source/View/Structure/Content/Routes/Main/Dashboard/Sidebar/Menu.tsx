import { CiMusicNote1 } from "react-icons/ci"
import Space from "./Space"
import Link from "./Link"

/**
 * Menu
 * 
 * @returns 
 */
export default function () {

    return <nav className="-mx-3 space-y-6 ">
        <Space title="analytics">
            <Link path="/">
                <CiMusicNote1 className="text-lg" />
                <span className="mx-2 text-sm font-medium">Dashboard</span>
            </Link>
        </Space>
    </nav>
}