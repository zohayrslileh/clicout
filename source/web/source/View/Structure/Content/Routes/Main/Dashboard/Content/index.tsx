import PendingException from "@/View/Exception/Exceptions/Pending"
import { Throw } from "@/Tools/Exception"
import Exception from "@/View/Exception"
import { Suspense } from "react"

/**
 * Content
 * 
 * @returns 
 */
export default function () {

    return <div className="relative overflow-x-hidden overflow-y-auto bg-blue-700">

        <Exception>

            <Suspense fallback={<Throw exception={new PendingException} />}>

                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>

            </Suspense>

        </Exception>

    </div>
}