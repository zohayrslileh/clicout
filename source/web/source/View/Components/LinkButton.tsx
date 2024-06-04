import Appearance from "@/View/Appearance"
import styled from "@emotion/styled"

/**
 * Link button component
 * 
 * @returns 
 */
export default styled.button`
    color: ${() => Appearance.schema.COLOR_YELLOW.rgba()};
    font-family: ${() => Appearance.schema.FONT_MEDIUM};
    background-color: transparent;
    text-transform: uppercase;
    background-color: none;
    font-size: 0.9em;
    cursor: pointer;
    outline: none;
    border: none;
    padding: 0;
`