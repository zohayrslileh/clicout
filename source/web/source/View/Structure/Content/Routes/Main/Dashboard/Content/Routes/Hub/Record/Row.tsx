import { Button, Spinner } from "@nextui-org/react"
import compiler from "@/View/Exception/compiler"
import { Lang, useLang } from "@/Tools/Language"
import { useCallback, useEffect } from "react"
import { CiStopwatch } from "react-icons/ci"
import Card from "@/View/Components/Card"
import usePromise from "@/Tools/Promise"
import toast from "react-hot-toast"
import Attack from "@/Core/Attack"
import User from "@/Core/User"

/**
 * Row
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
     * Stop promise
     * 
     */
    const stopPromise = usePromise(async () => await attack.stop())

    /**
     * Searches total
     * 
     */
    const searchesTotal = namespace.useState<number>(`${attack.id}:searches-total`)
console.log(searchesTotal)
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

        namespace.socket.emit("searches-total", attack.id)

    }, [])

    return <Card circleStyle={false} className="relative active:scale-95 transition-all h-[300px] smooth grid grid-rows-[1fr_auto] gap-4 p-4">

        <div className="grid gap-5">
        </div>

        <div className="flex justify-between">
            <Button isLoading={stopPromise.pending} onClick={stopAttack} color="danger" startContent={<CiStopwatch />} size="sm"><Lang>Stop</Lang></Button>
            <div className="flex items-end gap-1 text-success-400">
                <p className="text-xl leading-none font-medium">{searchesTotal === undefined ? <Spinner size="sm" color="success" /> : searchesTotal}</p>
                <p className="text-[12px]">/ {attack.searchesTotal || "∞"} <Lang>searches</Lang></p>
            </div>
        </div>

    </Card>
}

/**
 * Props
 * 
 */
interface Props {
    attack: Attack
}