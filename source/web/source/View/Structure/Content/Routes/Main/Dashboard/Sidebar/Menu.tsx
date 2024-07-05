import { CiCalendar, CiCompass1, CiLogout, CiStar, CiUser } from "react-icons/ci"
import { useParams } from "react-router-dom"
import Space from "./Space"
import Link from "./Link"

/**
 * Menu
 * 
 * @returns 
 */
export default function () {

    /**
     * Params
     * 
     */
    const params = useParams()

    /**
     * Current route
     * 
     */
    const currentRoute = params['*']?.split('/')[0]

    return <nav className="overflow-auto px-6">
        <div className="grid gap-5">

            <Space title="hub panel">
                <Link path="hub" icon={CiCompass1} title="Hub Panel" active={currentRoute === "hub"} news={3} />
            </Space>

            <Space title="analytics">
                <Link path="history" icon={CiCalendar} title="History" active={currentRoute === "history"} />
            </Space>

            <Space title="settings">
                <Link path="profile" icon={CiUser} title="Profile" active={currentRoute === "profile"} />
                <Link path="upgrade" icon={CiStar} title="Upgrade" active={currentRoute === "upgrade"} />
                <Link path="logout" icon={CiLogout} title="Logout" active={currentRoute === "logout"} />
            </Space>

        </div>
    </nav>
}