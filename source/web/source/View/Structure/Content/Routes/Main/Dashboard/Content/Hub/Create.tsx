import TextInput from "@/View/Components/TextInput"
import Checkbox from "@/View/Components/Checkbox"
import { GiFlamingSheet } from "react-icons/gi"
import Button from "@/View/Components/Button"
import { useCallback, useState } from "react"
import Appearance from "@/View/Appearance"
import Card from "@/View/Components/Card"
import { Lang } from "@/Tools/Language"
import styled from "@emotion/styled"

/**
 * Create
 * 
 * @returns 
 */
export default function () {

    /**
     * Keywords
     * 
     */
    const [keywords, setKeywords] = useState<string[]>([])

    /**
     * Keyword
     * 
     */
    const [keyword, setKeyword] = useState<string>("")

    /**
     * Domains action state
     * 
     */
    const [domainsAction, setDomainsAction] = useState<"CLICK" | "SKIP">("CLICK")

    /**
     * Append keyword method
     * 
     * @returns
     */
    const appendKeyword = useCallback(function () {

        setKeywords(keywords => [...keywords, keyword])

        setKeyword("")

    }, [keyword])

    return <Container>
        <div id="left">
            <div className="card">
                <p><Lang>Keywords</Lang></p>
                <div id="body">
                    <div id="content">{keywords.map(keyword => <p key={keyword}>{keyword}</p>)}</div>
                    <p id="size">0/20</p>
                </div>
                <div id="text-zone">
                    <TextInput placeholder="Add new keyword" value={keyword} onChange={keyword => setKeyword(keyword.slice(0, 20))} />
                    <button onClick={appendKeyword}><Lang>Add</Lang></button>
                </div>
            </div>
            <div className="card" id="domains">
                <p>
                    <Lang>Domains</Lang>
                    <label>
                        <Checkbox checked={domainsAction === "CLICK"} onChange={() => setDomainsAction("CLICK")} />
                        <p><Lang>Click all and skip this domains</Lang></p>
                    </label>
                    <label>
                        <Checkbox checked={domainsAction === "SKIP"} onChange={() => setDomainsAction("SKIP")} />
                        <p><Lang>Skip all and click this domains</Lang></p>
                    </label>
                </p>
                <div id="body">
                    <p id="size">0/20</p>
                </div>
                <div id="text-zone">
                    <TextInput placeholder="Add new domain" value="" onChange={x => x} />
                    <button><Lang>Add</Lang></button>
                </div>
            </div>
        </div>
        <div id="right">
            RIGHT
        </div>
        <Button id="bottom"><GiFlamingSheet /><Lang>Launch Attack</Lang></Button>
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled(Card)`
    display: grid; 
    grid-template-columns: 1fr 1fr; 
    grid-template-rows: 1fr auto; 
    grid-template-areas: 
        "left right"
        "bottom bottom";
    gap: 20px;
    padding: 20px;

    > #left {
        grid-area: left;
        display: grid;
        gap: 20px;

        > .card {
            display: grid;
            grid-template-rows: auto 1fr auto;
            position: relative;

            > p {
                margin: 0;
                margin-bottom: 10px;
                font-size: 13px;
                opacity: 0.5;
            }

            > #body {
                border: 1px solid ${() => Appearance.schema.COLOR_WHITE.rgba(0.16)};
                border-bottom: none;
                position: relative;
                overflow: auto;
                padding: 15px;

                > #content {
                    
                    > p {
                        margin: 0;
                        display: inline-block;
                        margin-inline-end: 10px;
                        background-color: red;
                        padding: 6px 13px;
                    }
                }

                > #size {
                    color: ${() => Appearance.schema.COLOR_YELLOW.rgba()};
                    position: absolute;
                    right: 15px;
                    bottom: 15px;
                    font-size: 13px;
                    opacity: 0.5;
                    margin: 0;
                }
            }

            > #text-zone {
                position: relative;
                display: grid;

                > button {
                    position: absolute;
                    right: 15px;
                    bottom: 15px;
                    padding: 0;
                    border: none;
                    background-color: transparent;
                    color: ${() => Appearance.schema.COLOR_WHITE.rgba()};
                    text-transform: uppercase;
                    cursor: pointer;
                }
            }
        }

        > #domains {

            > p {
                display: grid;
                grid-template-columns: 100px 1fr 1fr;

                > label {
                    display: flex;
                    align-items: center;
                    gap: 10px;

                    > p {
                        margin: 0;
                    }
                }
            }
        }
    }

    > #right {
        grid-area: right;
    }

    > #bottom {
        grid-area: bottom;
        justify-self: end;
        width: 200px;
        gap: 15px;
    }
`