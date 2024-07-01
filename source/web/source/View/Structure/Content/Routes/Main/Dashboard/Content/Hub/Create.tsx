import PendingException from "@/View/Exception/Exceptions/Pending"
import SearchInput from "@/View/Components/SearchInput"
import TextInput from "@/View/Components/TextInput"
import Checkbox from "@/View/Components/Checkbox"
import { Lang, useLang } from "@/Tools/Language"
import { GiFlamingSheet } from "react-icons/gi"
import Button from "@/View/Components/Button"
import { useCallback, useState } from "react"
import { IoIosClose } from "react-icons/io"
import { PrimitiveCity } from "@/Core/City"
import Appearance from "@/View/Appearance"
import Card from "@/View/Components/Card"
import { Throw } from "@/Tools/Exception"
import usePromise from "@/Tools/Promise"
import styled from "@emotion/styled"
import Country from "@/Core/Country"

/**
 * Create
 * 
 * @returns 
 */
export default function () {

    /**
     * Lang
     * 
     */
    const lang = useLang()

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
     * Domains
     * 
     */
    const [domains, setDomains] = useState<string[]>([])

    /**
     * Domain
     * 
     */
    const [domain, setDomain] = useState<string>("")

    /**
     * Domains action state
     * 
     */
    const [domainsAction, setDomainsAction] = useState<"CLICK" | "SKIP">("SKIP")

    /**
     * Country
     * 
     */
    const [country, setCountry] = useState<Country | undefined>(undefined)

    /**
     * City
     * 
     */
    const [city, setCity] = useState<PrimitiveCity | undefined>(undefined)

    /**
     * Append keyword method
     * 
     * @returns
     */
    const appendKeyword = useCallback(function () {

        if (!keyword || keywords.length >= 20) return

        setKeywords(keywords => [...keywords, keyword.trim()])

        setKeyword("")

    }, [keyword])

    /**
     * Remove keyword method
     * 
     * @returns
     */
    const removeKeyword = useCallback(function (keyword: string) {

        setKeywords(keywords => keywords.filter(item => item !== keyword))

    }, [])

    /**
     * Append domain method
     * 
     * @returns
     */
    const appendDomain = useCallback(function () {

        if (!domain || domains.length >= 20 || !/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(domain)) return

        setDomains(domains => [...domains, domain.trim()])

        setDomain("")

    }, [domain])

    /**
     * Remove domain method
     * 
     * @returns
     */
    const removeDomain = useCallback(function (domain: string) {

        setDomains(domains => domains.filter(item => item !== domain))

    }, [])

    /**
     * Countries promise
     * 
     */
    const countries = usePromise(async function () {

        const countries = await Country.find()

        setCountry(countries[0])

        return countries

    }, [])

    /**
     * Cities promise
     * 
     */
    const cities = usePromise(async () => country ? await country.cities() : undefined, [country])

    // Pending status
    if (countries.pending) return <Throw exception={new PendingException} />

    // Exception status
    if (countries.exception) return <Throw exception={countries.exception.current} />

    /**
     * Cities list
     * 
     */
    const citiesList = cities.solve

    return <Container>
        <div id="left">
            <div className="card">
                <div id="title"><Lang>Keywords</Lang></div>
                <div id="body">
                    <div id="items">
                        {keywords.map(keyword => <p className="item" key={keyword}>{keyword}<IoIosClose size={18} onClick={() => removeKeyword(keyword)} /></p>)}
                    </div>
                    <p id="size">{keywords.length}/20 <button onClick={() => setKeywords([])}><Lang>Clear all</Lang></button></p>
                </div>
                <div id="text-zone">
                    <TextInput
                        placeholder={lang("Enter new keyword")}
                        value={keyword} onChange={keyword => setKeyword(keyword.slice(0, 20))}
                        onKeyDown={event => event.key === "Enter" && appendKeyword()}
                        disabled={keywords.length >= 20}
                    />
                    <button onClick={appendKeyword}><Lang>Add</Lang></button>
                </div>
            </div>
            <div className="card" id="domains">
                <div id="title">
                    <Lang>Domains</Lang>
                    <label>
                        <Checkbox checked={domainsAction === "SKIP"} onChange={() => setDomainsAction("SKIP")} />
                        <p><Lang>Ignore this domains</Lang></p>
                    </label>
                    <label>
                        <Checkbox checked={domainsAction === "CLICK"} onChange={() => setDomainsAction("CLICK")} />
                        <p><Lang>Click this domains</Lang></p>
                    </label>
                </div>
                <div id="body">
                    <div id="items">
                        {domains.map(domain => <p className="item" key={domain}>{domain}<IoIosClose size={18} onClick={() => removeDomain(domain)} /></p>)}
                    </div>
                    <p id="size">{domains.length}/20 <button onClick={() => setDomains([])}><Lang>Clear all</Lang></button></p>
                </div>
                <div id="text-zone">
                    <TextInput
                        placeholder={lang("Enter new domain")}
                        value={domain} onChange={domain => setDomain(domain.slice(0, 20))}
                        onKeyDown={event => event.key === "Enter" && appendDomain()}
                        disabled={domains.length >= 20}
                    />
                    <button onClick={appendDomain}><Lang>Add</Lang></button>
                </div>
            </div>
        </div>
        <div id="right">
            {country && <SearchInput<Country>
                options={countries.solve}
                onLabel={country => country.name}
                onSearch={keyword => countries.solve.filter(country => country.name.startsWith(keyword))}
                value={country}
                onChange={country => setCountry(country)}
                placeholder="Select Country"
                style={{ width: "300px" }}
            />}
            {citiesList && <SearchInput<PrimitiveCity | undefined>
                options={citiesList}
                onLabel={city => city ? city.name : ""}
                onSearch={keyword => citiesList.filter(city => city.name.startsWith(keyword))}
                value={city}
                placeholder="Select City"
                onChange={city => setCity(city)}
                style={{ width: "300px" }}
            />}
            {city && <a href={`https://www.google.com/maps/@${city.latitude},${city.longitude},12z`} target="_blank">Goole Maps</a>}
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
        grid-template-rows: 1fr 1fr;
        gap: 20px;
        overflow: auto;

        > .card {
            display: grid;
            grid-template-rows: auto 1fr auto;
            position: relative;
            overflow: auto;
            padding: 1px;

            > #title {
                margin: 0;
                margin-bottom: 10px;
                font-size: 13px;
                opacity: 0.8;
            }

            > #body {
                border: 1px solid ${() => Appearance.schema.COLOR_WHITE.rgba(0.16)};
                border-bottom: none;
                position: relative;
                overflow: auto;
                overflow: auto;
                display: grid;
                grid-template-rows: 1fr auto;
                gap: 10px;

                > #items {
                    overflow: auto;
                    padding: 10px;
                    padding-bottom: 0;

                    ::-webkit-scrollbar {
                        display: none;
                    }

                    > .item {
                        margin: 0;
                        display: inline-flex;
                        margin-inline-end: 10px;
                        margin-block-end: 10px;
                        background-color: ${() => Appearance.schema.COLOR_BLUE.rgba(0.2)};
                        border: 1px solid ${() => Appearance.schema.COLOR_WHITE.rgba(0.2)};
                        padding: 6px 5px;
                        font-size: 11px;
                        align-items: center;
                        gap: 5px;
                        box-shadow: 0 0 10px ${() => Appearance.schema.COLOR_WHITE.rgba(0.16)};

                        > svg {
                            cursor: pointer;
                        }
                    }
                }

                > #size {
                    color: ${() => Appearance.schema.COLOR_YELLOW.rgba()};
                    font-size: 13px;
                    justify-self: end;
                    opacity: 0.5;
                    margin: 0;
                    display: inline-flex;
                    align-items: center;
                    gap: 5px;
                    padding: 10px;
                    padding-top: 0;

                    > button {
                        padding: 0;
                        border: none;
                        background-color: transparent;
                        color: ${() => Appearance.schema.COLOR_WHITE.rgba()};
                        text-transform: uppercase;
                        cursor: pointer;
                        outline: none;
                    }
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
                    outline: none;
                }
            }
        }

        > #domains {

            > #title {
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
        padding: 2px;
        overflow: auto;
    }

    > #bottom {
        grid-area: bottom;
        justify-self: end;
        width: 200px;
        gap: 15px;
    }
`