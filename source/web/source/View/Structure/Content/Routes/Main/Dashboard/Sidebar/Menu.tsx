import { CiCalendar, CiCoinInsert, CiCompass1, CiFileOff, CiStar, CiUser } from "react-icons/ci"
import { useParams } from "react-router-dom"
import { Spinner } from "@nextui-org/react"
import { useLang } from "@/Tools/Language"
import { BiError } from "react-icons/bi"
import Attack from "@/Core/Attack"
import Space from "./Space"
import Link from "./Link"

/**
 * Menu
 * 
 * @returns 
 */
export default function () {

    /**
     * Lang
     * 
     */
    const lang = useLang()

    /**
     * Params
     * 
     */
    const params = useParams()

    /**
     * Current route
     * 
     */
    const currentRoute = params["*"]?.split("/")[0]

    /**
     * Running attacks promise
     * 
     */
    const runningAttacks = Attack.useRunningController()

    return <nav className="overflow-auto px-6 smooth">
        <div className="grid gap-5">

            <Space title={lang("hub panel")}>
                <Link path="hub" icon={CiCompass1} title={lang("Hub Panel")} active={currentRoute === "hub"} news={runningAttacks.pending ? <Spinner size="sm" /> : runningAttacks.exception ? <BiError className="text-red-400 text-lg" /> : runningAttacks.solve.length} />
                <Link path="blacklist" icon={CiFileOff} title={lang("Black List")} active={currentRoute === "blacklist"} />
            </Space>

            <Space title={lang("analytics")}>
                <Link path="history" icon={CiCalendar} title={lang("History")} active={currentRoute === "history"} />
                <Link path="payment" icon={CiCoinInsert} title={lang("Payments")} active={currentRoute === "payment"} />
            </Space>

            <Space title={lang("settings")}>
                <Link path="profile" icon={CiUser} title={lang("Profile")} active={currentRoute === "profile"} />
                <Link path="upgrade" icon={CiStar} title={lang("Upgrade")} active={currentRoute === "upgrade"} />
            </Space>

        </div>
    </nav>
}