import { GiBestialFangs } from "react-icons/gi"
import { useNavigate } from "react-router-dom"
import Card from "@/View/Components/Card"
import { Lang } from "@/Tools/Language"
import styled from "@emotion/styled"

/**
 * Hub
 * 
 * @returns 
 */
export default function () {

    /**
     * Navigate
     * 
     */
    const navigate = useNavigate()

    return <Container>
        <Card className="row" onClick={() => navigate("create")}>
            <GiBestialFangs size={30} />
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
        justify-items: center;
        align-items: center;
        align-content: center;
        gap: 20px;

        &:hover {
            transform: scale(0.97);

            > * {
                opacity: 0.8;
            }
        }

        > * {
            margin: auto;
            user-select: none;
            opacity: 0.4;
            text-transform: uppercase;
        }
    }
`