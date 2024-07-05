import { CiMusicNote1, CiPalette } from "react-icons/ci"
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

    return <nav className="-mx-3 space-y-6">

        <Space title="hub panel">
            <Link path="hub" icon={CiMusicNote1} title="Hub Panel" active={currentRoute === "hub"} />
        </Space>

        <Space title="analytics">
            <Link path="palette" icon={CiPalette} title="Palette" active={currentRoute === "palette"} />
            <Link path="analytics" icon={CiMusicNote1} title="Dashboard" />
        </Space>

        <Space title="settings">
            <Link path="analytics" icon={CiMusicNote1} title="Dashboard" />
            <Link path="analytics" icon={CiMusicNote1} title="Dashboard" />
        </Space>

    </nav>
}