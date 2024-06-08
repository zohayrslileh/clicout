import React, { useCallback, useEffect, useState } from "react"
import usePromise from "@/Tools/Promise"
import styled from "@emotion/styled"
import TextInput from "./TextInput"

/**
 * Search input
 * 
 * @returns 
 */
export default function <Option>({ options, value, onSearch, onChange, ...props }: Props<Option>) {

    /**
     * Keyword
     * 
     */
    const [keyword, setKeyword] = useState<string>("")

    /**
     * Search method
     * 
     * @returns
     */
    const search: Search<Option> = useCallback(async function (keyword: string) {

        // Custom search resolve
        if (onSearch) return await onSearch(keyword)

        // Default search resolve
        return options.filter(([_, label]) => label.startsWith(keyword))

    }, [onSearch])

    /**
     * Search promise
     * 
     */
    const searchPromise = usePromise(async () => await search(keyword), [keyword])

    /**
     * On value change
     * 
     */
    useEffect(function () {

        const option = options.find(([option]) => option === value)

        if (option) setKeyword(option[1])

    }, [value])

    /**
     * Container
     * 
     */
    return <Container {...props}>
        <TextInput value={keyword} onChange={setKeyword} />
        <ul id="items">
            {searchPromise.solve ? searchPromise.solve.map(([option, label], index) => <li key={index} onClick={() => onChange(option)}>{label}</li>) : "Loading..."}
        </ul>
    </Container>
}

/**
 * Props
 * 
 */
interface Props<Option> extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children" | "onChange"> {
    options: [Option, string][]
    onSearch?: Search<Option>
    value: Option
    onChange: (option: Option) => void
}

/**
 * Search
 * 
 */
type Search<Option> = (keyword: string) => Promise<[Option, string][]> | [Option, string][]

/**
 * Container
 * 
 */
const Container = styled.div`
`