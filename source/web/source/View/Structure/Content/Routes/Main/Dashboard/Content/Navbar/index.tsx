import Breadcrumbs from "./Breadcrumbs"
import User from "./User"

/**
 * Navbar
 * 
 * @returns 
 */
export default function () {

    return <div className="grid grid-cols-[1fr_auto] gap-3 px-5 py-3 items-center sticky z-10 top-0 smooth backdrop-blur-md p-3 border rounded-lg border-primary border-opacity-20">

        <Breadcrumbs />

        <User />

    </div>
}