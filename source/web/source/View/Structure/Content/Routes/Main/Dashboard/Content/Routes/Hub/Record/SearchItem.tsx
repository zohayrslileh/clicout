import Search from "@/Core/Search"

/**
 * Search item
 * 
 * @returns
 */
export default function ({ search }: Props) {

    return <p>{search.recordId}</p>
}

/**
 * Props
 * 
 */
interface Props {
    search: Search
}