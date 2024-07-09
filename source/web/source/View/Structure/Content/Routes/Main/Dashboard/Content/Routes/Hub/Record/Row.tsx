import { Lang, useLang } from "@/Tools/Language"
import compiler from "@/View/Exception/compiler"
import { CiStopwatch } from "react-icons/ci"
import { Button } from "@nextui-org/react"
import Card from "@/View/Components/Card"
import usePromise from "@/Tools/Promise"
import { useCallback } from "react"
import toast from "react-hot-toast"
import Attack from "@/Core/Attack"

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

    return <Card circleStyle={false} className="relative active:scale-95 transition-all h-[300px] smooth grid grid-rows-[1fr_auto] gap-4 p-4">

        <div></div>

        <div className="flex justify-between">
            <Button isLoading={stopPromise.pending} onClick={stopAttack} color="danger" startContent={<CiStopwatch />} size="sm"><Lang>Stop</Lang></Button>
            <div className="flex items-end gap-1 text-success-400">
                <p className="text-xl leading-none font-medium">1</p>
                <p className="text-[12px]">/ ${attack.searches || lang("Infinity")} <Lang>Searches</Lang></p>
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