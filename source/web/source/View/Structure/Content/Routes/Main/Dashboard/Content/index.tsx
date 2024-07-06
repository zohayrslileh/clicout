import Exception from "@/View/Exception"
import Navbar from "./Navbar"
import Routes from "./Routes"

/**
 * Content
 * 
 * @returns
 */
export default function () {

    return <div className="relative grid gap-5 grid-rows-[auto_1fr] p-5 overflow-x-hidden overflow-y-auto">

        <Exception>

            {/** Navbar */}
            <Navbar />

            {/** Routes */}
            <Routes />

        </Exception>

    </div>
}