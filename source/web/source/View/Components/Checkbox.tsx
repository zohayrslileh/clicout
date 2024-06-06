import styled from "@emotion/styled"
import React from "react"

/**
 * Checkbox component
 * 
 * @returns 
 */
export default function ({ checked, onChange, ...props }: Props) {

    /**
     * Container
     * 
     */
    return <Container {...props}>
        <input type="checkbox" checked={checked} onChange={event => onChange(event.target.checked)} />
        <div />
    </Container>
}

/**
 * Props
 * 
 */
interface Props extends Omit<React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>, "children" | "onChange" | "checked"> {
    checked: boolean
    onChange: (checked: boolean) => void
}

/**
 * Container
 * 
 */
const Container = styled.label`

    > div {
        width: 10px;
        height: 10px;
        background-color: red;
    }

    > input {
        display: none;

        &:checked ~ div {
            background-color: blue;
        }
    }
`