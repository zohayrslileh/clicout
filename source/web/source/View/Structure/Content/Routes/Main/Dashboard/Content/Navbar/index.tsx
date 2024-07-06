import Card from "@/View/Components/Card"
import Breadcrumbs from "./Breadcrumbs"
import User from "./User"

/**
 * Navbar
 * 
 * @returns 
 */
export default function () {

    return <Card circleStyle={false} curveStyle={false} className="grid grid-cols-[1fr_auto] gap-3 px-5 py-3 items-center sticky z-50 top-0 smooth backdrop-blur-md p-3">

        <Breadcrumbs />

        <User />

    </Card>
}