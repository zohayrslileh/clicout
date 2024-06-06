import Card from "@/View/Components/Card"
import { Lang } from "@/Tools/Language"
import styled from "@emotion/styled"

/**
 * Hub
 * 
 * @returns 
 */
export default function () {

    return <Container>
        <Card className="row">
            <p><Lang>Create new attack</Lang></p>
        </Card>
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled.div`
    
    > .row {
        width: 300px;
        height: 300px;
        display: grid;
        cursor: pointer;

        &:hover {
            transform: scale(0.97);

            > p {
                opacity: 0.8;
            }
        }

        > p {
            margin: auto;
            user-select: none;
            opacity: 0.4;
        }
    }
`