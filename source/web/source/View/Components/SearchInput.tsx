import React, { useState } from "react"
import styled from "@emotion/styled"
import TextInput from "./TextInput"

/**
 * Search input
 * 
 * @returns 
 */
export default function <Option>({ options, value, onSearch, onChange, onLabel, ...props }: Props<Option>) {

    /**
     * Keyword
     * 
     */
    const [keyword, setKeyword] = useState("")

    /**
     * Container
     * 
     */
    return <Container {...props}>
        <TextInput value={keyword} onChange={setKeyword} />
        <ul id="items">
            {onSearch(options, keyword).map((option, index) => <li key={index} onClick={() => onChange(option)}>{onLabel(option)}</li>)}
        </ul>
    </Container>
}

/**
 * Props
 * 
 */
interface Props<Option> extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children" | "onChange"> {
    options: Option[]
    onLabel: (option: Option) => React.ReactNode
    onSearch: (options: Option[], keyword: string) => Option[]
    value: Option
    onChange: (option: Option) => void
}

/**
 * Container
 * 
 */
const Container = styled.div`
`