import { Lang } from "@/Tools/Language"
import styled from "@emotion/styled"
import { ZodIssue } from "zod"

/**
 * Issue Component
 * 
 */
export default ({ issues }: { issues: ZodIssue[] }) => {

    return issues.length ? (
        <Container className="animation">
            {issues.map((issue, key) => <li key={key}><Lang>{issue.message}</Lang></li>)}
        </Container>
    ) : null
}

/**
 * Container
 * 
 */
const Container = styled.ul`
    margin: 0;
    list-style-type: none;
    font-size: 12px;
    font-weight: bold;
    color: rgb(var(--color-red));
    border-radius: 5px;
    padding: 1px;
`