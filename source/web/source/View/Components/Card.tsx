import { keyframes } from "@emotion/react"
import Appearance from "@/View/Appearance"
import styled from "@emotion/styled"
import React from "react"

/**
 * Card component
 * 
 * @returns 
 */
export default function ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {

    /**
     * Container
     * 
     */
    return <Container {...props}>
        <div className="line left top horizontal"></div>
        <div className="line left top vertical"></div>
        <div className="line left bottom horizontal"></div>
        <div className="line left bottom vertical"></div>
        <div className="line right top horizontal"></div>
        <div className="line right top vertical"></div>
        <div className="line right bottom horizontal"></div>
        <div className="line right bottom vertical"></div>
        {children}
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled.div`
    border: 1px solid rgb(255 255 255 / 16%);
    backdrop-filter: blur(5px);
    position: relative;
    overflow: hidden;
    animation: ${keyframes`

        0% {
            max-height: 0;
            opacity: 0;
            border-color: ${Appearance.schema.COLOR_YELLOW.rgba(0.16)};
        }

        50% {
            opacity: 1;
        }

        75% {
            opacity: 0.5;
        }

        100% {
            max-height: 100vh;
            opacity: 1;
            border-color: rgb(255 255 255 / 16%);
        }

    `} ease-in 1s;

    > .line {
        background-color: white;
        position: absolute;

        &.left {
            left: 0;
        }

        &.right {
            right: 0;
        }

        &.top {
            top: 0;
        }

        &.bottom {
            bottom: 0;
        }

        &.horizontal {
            width: 10px;
            height: 1px;
            animation: ${keyframes`

                0% {
                    width: 100px;
                }           

                100% {
                    width: 10px;
                }           

            `} ease-in 300ms;
        }

        &.vertical {
            width: 1px;
            height: 10px;
            animation: ${keyframes`

                0% {
                    height: 100px;
                }           

                100% {
                    height: 10px;
                }           

            `} ease-in 300ms;
            animation-delay: 200ms;
        }
    }
`