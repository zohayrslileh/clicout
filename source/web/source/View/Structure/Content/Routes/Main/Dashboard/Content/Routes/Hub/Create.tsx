import TagsInput from "@/View/Components/TagsInput"
import { useState } from "react"

/**
 * Create
 * 
 * @returns 
 */
export default function () {

    /**
     * Selected
     */
    const [selected, setSelected] = useState(["papaya"])

    return <div className="grid grid-cols-2 gap-5">

        <div>
            <TagsInput value={selected} onChange={setSelected} placeHolder="Enter Fruits" />
        </div>

        <div>
            <TagsInput value={selected} onChange={setSelected} placeHolder="Enter Fruits" />
        </div>

    </div>
}