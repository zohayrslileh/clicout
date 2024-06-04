import TextInput from "@/Tools/MaterialUI/TextInput"
import Appearance from "@/View/Appearance"
import { css } from "@emotion/react"
import styled from "@emotion/styled"

/**
 * Text input component
 * 
 */
export default styled(TextInput)`
    box-shadow: 0 0 80px inset ${() => Appearance.schema.COLOR_YELLOW.rgba(0.03)};
    border: 1px solid ${() => Appearance.schema.COLOR_WHITE.rgba(0.16)};
    color: ${() => Appearance.schema.COLOR_WHITE.rgba()};
    font-family: ${() => Appearance.schema.FONT_MEDIUM};
    border-color: 1px solid transparent;
    background-color: transparent;
    backdrop-filter: blur(5px);
    position: relative;
    overflow: hidden;
    cursor: pointer;
    outline: none;
    padding: 15px;

    &:hover, &:active, &:focus {
        box-shadow: 0 0 30px inset ${() => Appearance.schema.COLOR_YELLOW.rgba(0.1)};
    }

    &:focus {
        border-color: ${() => Appearance.schema.COLOR_YELLOW.rgba(0.7)};
    }

    ${props => props.issue && css`
        box-shadow: 0 0 20px inset rgb(179 0 0 / 45%);
    `}
`