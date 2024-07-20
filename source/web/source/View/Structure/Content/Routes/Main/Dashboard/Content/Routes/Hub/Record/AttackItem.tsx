import { useCallback, useEffect, useState } from "react"
import Search, { PrimitiveSearch } from "@/Core/Search"
import { Button, Spinner } from "@nextui-org/react"
import compiler from "@/View/Exception/compiler"
import { Lang, useLang } from "@/Tools/Language"
import { CiStopwatch } from "react-icons/ci"
import Card from "@/View/Components/Card"
import usePromise from "@/Tools/Promise"
import SearchItem from "./SearchItem"
import toast from "react-hot-toast"
import Attack from "@/Core/Attack"
import User from "@/Core/User"

/**
 * Attack item
 * 
 * @returns
 */
export default function ({ attack }: Props) {

    /**
     * Lang
     * 
     */
    const lang = useLang()

    /**
     * Namespace
     * 
     */
    const namespace = User.useNamespace()

    /**
     * Running attacks promise
     * 
     */
    const runningAttacks = Attack.useRunningController()

    /**
     * Searches count
     * 
     */
    const [searchesCount, setSearchesCount] = useState<number>(0)

    /**
     * Current search
     * 
     */
    const [currentSearch, setCurrentSearch] = useState<Search | undefined>(undefined)

    /**
     * Stop promise
     * 
     */
    const stopPromise = usePromise(async () => await attack.stop())

    /**
     * On info
     * 
     */
    namespace.useOn(`attack/${attack.id}/info`, function (searchesCount: number, currentSearch: PrimitiveSearch | undefined) {

        // Set current search
        if (currentSearch) setCurrentSearch(new Search(currentSearch))

        // Set searches count
        setSearchesCount(searchesCount)
    })

    /**
     * On new search
     * 
     */
    namespace.useOn(`attack/${attack.id}/search/create`, function (currentSearch: PrimitiveSearch) {

        // Set current search
        setCurrentSearch(new Search(currentSearch))

        // Set searches count
        setSearchesCount(searchesCount => searchesCount + 1)
    })

    /**
     * Stop attack method
     * 
     * @returns
     */
    const stopAttack = useCallback(async function () {

        try {

            // Execute stop promise
            await stopPromise.execute()

            // Toast success
            toast.success(lang("Attack has been stopped successfully"))

            // Running attacks refetch
            runningAttacks.dispatch(attacks => attacks.filter(item => item !== attack))
        }

        catch (exception) {

            // Toast error
            toast.error(compiler(exception).message)
        }

    }, [stopPromise.execute, attack])

    /**
     * Effect
     * 
     */
    useEffect(function () {

        // Ask attack info
        namespace.socket.emit("attack/info", attack.id)

    }, [])

    return <Card circleStyle={false} className="relative active:scale-95 transition-all h-[300px] smooth grid grid-rows-[1fr_auto] gap-4 p-4">

        <Attack.context.Provider value={attack}>

            <div className="grid gap-5">
                {currentSearch ? <SearchItem search={currentSearch} /> : <Spinner />}
            </div>

            <div className="flex justify-between">
                <Button isLoading={stopPromise.pending} onClick={stopAttack} color="danger" startContent={<CiStopwatch />} size="sm"><Lang>Stop</Lang></Button>
                <div className="flex items-end gap-1 text-success-400">
                    <p className="text-xl leading-none font-medium">{searchesCount}</p>
                    <p className="text-[12px]">/ {attack.searchesTotal || "∞"} <Lang>searches</Lang></p>
                </div>
            </div>

        </Attack.context.Provider>

    </Card>
}

/**
 * Props
 * 
 */
interface Props {
    attack: Attack
}