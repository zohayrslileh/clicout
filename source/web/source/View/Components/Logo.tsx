import fullLogo from "@/View/Media/full-logo.png"
import styled from "@emotion/styled"

/**
 * Logo
 * 
 * @returns 
 */
export default function (props: Omit<React.ComponentProps<typeof Container>, "src" | "alt">) {

    return <Container {...props} alt="" src={fullLogo} loading="eager" />
}

/**
 * Container
 * 
 */
const Container = styled.img`
    user-select: none;
    pointer-events: none;
`