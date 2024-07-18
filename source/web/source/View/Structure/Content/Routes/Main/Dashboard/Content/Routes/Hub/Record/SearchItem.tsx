import Search from "@/Core/Search"

/**
 * Search item
 * 
 * @returns
 */
export default function ({ search }: Props) {

    return <div>{search.id}</div>
}

/**
 * Props
 * 
 */
interface Props {
    search: Search
}