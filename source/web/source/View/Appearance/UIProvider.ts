import { NextUIProvider } from "@nextui-org/system"
import styled from "@emotion/styled"
import Appearance from "."
import "./index.css"

/*
|-----------------------------
|  UI Provider
|-----------------------------
|
|
*/
export default styled(NextUIProvider)`
    background: ${() => Appearance.theme.schema.BACKGROUND};    
    position: absolute;
    overflow: hidden;
    display: grid;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
`