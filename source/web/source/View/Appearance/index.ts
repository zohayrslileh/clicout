import armouryCrateBackground from "@/View/Media/armoury-crate-background.jpg"
import AppearanceState, { initialAppearance } from "./context"
import Language from "@/View/Language"
import styled from "@emotion/styled"
import schema from "./schema"
import fonts from "./Fonts"

/*
|-----------------------------
|  Appearance
|-----------------------------
|
|
*/
const Appearance = new AppearanceState(initialAppearance)

/*
|-----------------------------
|  Container
|-----------------------------
|
|
*/
const Container = styled.div`

    // Load fonts
    ${fonts}

    // Style sheet
    background-image: url(${armouryCrateBackground});
    direction: ${() => Language.value.direction};
    color: ${() => schema.COLOR_WHITE.rgba()};
    font-family: ${() => schema.FONT_REGULAR};
    zoom: ${() => Appearance.zoom}%;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    position: absolute;
    overflow: hidden;
    line-height: 1;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;

    * {
        transition: 90ms ease-out;
    }
`

export default Object.assign(Appearance, { Container, schema })