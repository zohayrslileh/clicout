import React, { useEffect, useState } from "react"
import Appearance from "@/View/Appearance"
import usePromise from "@/Tools/Promise"
import styled from "@emotion/styled"
import TextInput from "./TextInput"
import Card from "./Card"

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
        <Card id="items">
            <div id="content">
                {search.solve ? search.solve.map((option, index) => <div className={`item ${option === value ? "selected" : ""}`} key={index} onClick={() => onChange(option)}>{onLabel(option)}</div>) : "Loading..."}
            </div>
        </Card>
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
    position: relative;
    width: fit-content;

    > #items {
        position: absolute;
        width: fit-content;
        overflow: hidden;
        height: auto;
        margin: 0;
        width: 100%;
        box-sizing: border-box;
        display: none;
        z-index: 99;
        background-color: ${() => Appearance.schema.COLOR_DARK.rgba(0.8)};
        
        > #content {
            overflow: auto;
            box-sizing: border-box;
            height: auto;
            max-height: 300px;

            > .item {
                cursor: default;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                padding: 15px;

                &:hover, &.selected {
                    background-color: ${() => Appearance.schema.COLOR_BLUE.rgba(0.2)};
                }
            }

            &::-webkit-scrollbar {
                display: none;
            }
        }

        &:active {
            display: block;
        }
    }

    > input {
        width: 100%;
        box-sizing: border-box;

        &:focus ~ #items {
            display: block;
        }
    }
`