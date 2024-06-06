import { LuStar, LuUsers2, LuUsers } from "react-icons/lu"
import { Link, useParams } from "react-router-dom"
import Appearance from "@/View/Appearance"
import { Lang } from "@/Tools/Language"
import styled from "@emotion/styled"

/**
 * Menu
 * 
 * @returns 
 */
export default function () {

    /**
     * Params
     * 
     */
    const params = useParams()

    /**
     * This route
     * 
     */
    const thisRoute = params['*']?.split('/')[0]

    return <Container>
        {items.map(item => (
            <Link key={item.route} to={item.route} className={thisRoute === item.route ? "active" : undefined}>
                <item.Icon size={20} strokeWidth={1.5} />
                <p><Lang>{item.name}</Lang></p>
                <div className="line right bottom horizontal"></div>
                <div className="line left bottom horizontal"></div>
                <div className="line right bottom vertical"></div>
                <div className="line right top horizontal"></div>
                <div className="line left bottom vertical"></div>
                <div className="line left top horizontal"></div>
                <div className="line right top vertical"></div>
                <div className="line left top vertical"></div>
            </Link>
        ))}
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled.div`
    overflow: hidden;
    padding: 10px;
    display: grid;
    gap: 10px;
    height: fit-content;
    margin-inline: 7px;

    > a {
        font-family: ${() => Appearance.schema.FONT_MEDIUM};
        display: flex;
        align-items: center;
        gap: 10px;
        color: ${() => Appearance.theme.schema.CONTENT_COLOR.rgba()};
        text-decoration: none;
        padding-inline-end: 30px;
        padding-inline-start: 15px;
        position: relative;

        &.active, &:hover {
            
            > .line {

                &.horizontal {
                    width: 10px;
                }

                &.vertical {
                    height: 10px;
                }
            }
        }

        > p {
            margin: 15px;
        }

        > .line {
            background-color: ${() => Appearance.schema.COLOR_WHITE.rgba()};
            box-shadow: 0 0 5px white;
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
                width: 0;
                height: 1px;
            }

            &.vertical {
                width: 1px;
                height: 0;
            }
        }
    }
`

/**
 * Items
 * 
 */
const items = [
    {
        route: "session",
        name: "Sessions",
        Icon: LuStar
    },
    {
        route: "judge",
        name: "Judges",
        Icon: LuUsers
    },
    {
        route: "participant",
        name: "Participants",
        Icon: LuUsers2
    }
]