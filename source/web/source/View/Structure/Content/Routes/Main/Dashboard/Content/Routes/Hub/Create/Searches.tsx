import { Checkbox, Input } from "@nextui-org/react"
import { Lang, useLang } from "@/Tools/Language"

/**
 * Searches
 * 
 * @returns 
 */
export default function ({ value, onChange }: Props) {

    /**
     * Lang
     * 
     */
    const lang = useLang()

    /**
     * Infinity
     * 
     */
    const infinity = value === 0

    return <div className="relative">
        <Input isDisabled={infinity} value={value.toString()} onValueChange={value => onChange(+value)} variant="bordered" label={lang("Number of searches")} type="number" />
        <Checkbox isSelected={infinity} onValueChange={infinity => onChange(infinity ? 0 : 1)} className="absolute right-5 top-0 bottom-0" size="sm"><Lang>Infinity</Lang></Checkbox>
    </div>
}

/**
 * Props
 * 
 */
interface Props {
    value: number
    onChange: (value: number) => void
}