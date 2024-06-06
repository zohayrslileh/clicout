import { css, keyframes } from "@emotion/react"
import Appearance from "@/View/Appearance"
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
    issue?: boolean
}

/**
 * Container
 * 
 */
const Container = styled.label<{
    issue?: boolean
}>`
    border: 1px solid ${() => Appearance.schema.COLOR_WHITE.rgba(0.2)};
    cursor: pointer;
    width: 15px;
    height: 15px;
    position: relative;
    display: block;

    > div {
        width: 70%;
        height: 70%;
        background-color: ${() => Appearance.schema.COLOR_YELLOW.rgba()};
        position: absolute;
        left: 1px;
        right: 0;
        top: 0;
        bottom: 1px;
        margin: auto;
        transform: scale(0);
    }

    > input {
        opacity: 0;
        z-index: -1;
        pointer-events: none;

        &:hover ~ div {
            transform: scale(0.5);
        }

        &:checked ~ div {
            transform: scale(1);
        }
    }

    ${props => props.issue && css`
        animation: ${keyframes`

            0% {
                box-shadow: 0 0 20px inset rgb(179 0 0 / 70%);
            }

            80% {
                box-shadow: 0 0 20px inset rgb(179 0 0 / 70%);
            }

            100% {
                box-shadow: initial;
            }

        `} ease-in 2s;
    `}
`