import React, { useEffect, useState } from "react"
import usePromise from "@/Tools/Promise"
import styled from "@emotion/styled"
import TextInput from "./TextInput"

/**
 * Search input
 * 
 * @returns 
 */
export default function <Option>({ options, value, onLabel, onSearch, onChange, ...props }: Props<Option>) {

    /**
     * Keyword
     * 
     */
    const [keyword, setKeyword] = useState<string>(onLabel(value))

    /**
     * Search promise
     * 
     */
    const search = usePromise(async () => await onSearch(keyword), [keyword])

    /**
     * On change value
     * 
     */
    useEffect(function () {

        // Set keyword
        setKeyword(onLabel(value))

    }, [value])

    /**
     * Container
     * 
     */
    return <Container {...props}>
        <TextInput value={keyword} onChange={setKeyword} />
        <ul id="items">
            {search.solve ? search.solve.map((option, index) => <li key={index} onClick={() => onChange(option)}>{onLabel(option)}</li>) : "Loading..."}
        </ul>
    </Container>
}

/**
 * Props
 * 
 */
interface Props<Option> extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children" | "onChange"> {
    value: Option
    options: Option[]
    onChange: (option: Option) => void
    onLabel: (option: Option) => string
    onSearch: (keyword: string) => (Promise<Option[]> | Option[])
}

/**
 * Container
 * 
 */
const Container = styled.div`
`