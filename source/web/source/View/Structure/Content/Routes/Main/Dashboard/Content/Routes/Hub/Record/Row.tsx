import { Lang, useLang } from "@/Tools/Language"
import compiler from "@/View/Exception/compiler"
import Card from "@/View/Components/Card"
import usePromise from "@/Tools/Promise"
import { useCallback } from "react"
import toast from "react-hot-toast"
import Attack from "@/Core/Attack"
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react"
import { CiMenuKebab } from "react-icons/ci"

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
            runningAttacks.dispatch(attacks => attacks.filter(attack => attack !== attack))
        }

        catch (exception) {

            // Toast error
            toast.error(compiler(exception).message)
        }

    }, [stopPromise.execute, attack])

    return <Card circleStyle={false} className="relative active:scale-95 transition-all h-[300px] smooth grid place-content-center place-items-center gap-5">

        <div className="absolute right-5 top-5">
            <Dropdown>
                <DropdownTrigger>
                    <Button variant="light" isIconOnly className="rounded-full"><CiMenuKebab /></Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                    <DropdownItem onClick={stopAttack} className="text-danger" color="danger">
                        <Lang>Stop attack</Lang>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>

        <div className="absolute right-5 bottom-5 flex items-end gap-1 text-success-400">
            <p className="text-xl leading-none font-medium">1</p>
            <p className="text-[12px]">/ 5 <Lang>Searches</Lang></p>
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