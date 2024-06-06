import Appearance from "@/View/Appearance"
import styled from "@emotion/styled"

/**
 * Light button component
 * 
 */
export default styled.button`
    color: ${() => Appearance.schema.COLOR_YELLOW.rgba()};
    background-color: transparent;
    font-family: ${() => Appearance.schema.FONT_MEDIUM};
    padding: 5px;
    font-size: 17px;
    border: none;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    gap: 10px;

    &:active {
        background-color: ${() => Appearance.theme.schema.BACKGROUND_PRIMARY.rgba()};
    }
`