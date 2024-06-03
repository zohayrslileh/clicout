import Appearance from "@/View/Appearance"
import styled from "@emotion/styled"

/**
 * Card
 * 
 */
export default styled.div`
    background-color: ${() => Appearance.theme.schema.BACKGROUND_SECONDARY.rgba(0.5)};
    backdrop-filter: blur(5px);
    border-radius: 10px;
    padding: 10px;
`