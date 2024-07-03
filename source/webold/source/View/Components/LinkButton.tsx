import Appearance from "@/View/Appearance"
import { Link } from "react-router-dom"
import styled from "@emotion/styled"

/**
 * Link button component
 * 
 * @returns 
 */
export default styled(Link)`
    color: ${() => Appearance.schema.COLOR_YELLOW.rgba()};
    font-family: ${() => Appearance.schema.FONT_MEDIUM};
    background-color: transparent;
    text-transform: uppercase;
    background-color: none;
    text-decoration: none;
    font-size: 0.9em;
    cursor: pointer;
    outline: none;
    border: none;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
`