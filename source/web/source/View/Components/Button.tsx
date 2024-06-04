import PromiseButton from "./PromiseButton"
import Appearance from "@/View/Appearance"
import styled from "@emotion/styled"
import React from "react"

/**
 * Button component
 * 
 * @returns 
 */
export default function ({ children, ...props }: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {

    /**
     * Container
     * 
     */
    return <Container {...props}>
        <div className="ship"></div>
        {children}
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled(PromiseButton)`
    background-color: transparent;
    box-shadow: 0 0 80px inset ${() => Appearance.schema.COLOR_YELLOW.rgba(0.03)};
    border: 1px solid ${() => Appearance.schema.COLOR_WHITE.rgba(0.16)};
    color: ${() => Appearance.schema.COLOR_WHITE.rgba()};
    font-family: ${() => Appearance.schema.FONT_MEDIUM};
    border-color: 1px solid transparent;
    backdrop-filter: blur(5px);
    position: relative;
    overflow: hidden;
    cursor: pointer;
    outline: none;
    padding: 15px;

    > .ship {
        background-color: ${() => Appearance.schema.COLOR_WHITE.rgba()};
        position: absolute;
        right: -42px;
        top: 0;
        width: 70px;
        height: 18px;
        transform: rotate(45deg);
    }

    &:hover, &:active, &:focus {
        box-shadow: 0 0 30px inset ${() => Appearance.schema.COLOR_YELLOW.rgba(0.1)};
        color: ${() => Appearance.schema.COLOR_YELLOW.rgba(0.7)};

        > .ship {
            background-color: ${() => Appearance.schema.COLOR_YELLOW.rgba(1)};
        }
    }

    &:focus {
        border-color: ${() => Appearance.schema.COLOR_YELLOW.rgba(0.7)};
    }

    &:disabled {
        pointer-events: none;
        user-select: none;
        opacity: 0.7;
    }
`