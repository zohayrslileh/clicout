import Exception from "@/View/Exception"
import Routes from "./Routes"

/**
 * Content
 * 
 * @returns 
 */
export default function () {

    return <div className="relative grid overflow-x-hidden overflow-y-auto">

        <Exception>

            {/** Routes */}
            <Routes />

        </Exception>

    </div>
}