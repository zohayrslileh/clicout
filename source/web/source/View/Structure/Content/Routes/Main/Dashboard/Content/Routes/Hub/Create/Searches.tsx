import { Slider, Tab, Tabs } from "@nextui-org/react"
import { useCallback, useState } from "react"
import { useLang } from "@/Tools/Language"

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
     * Tap
     * 
     */
    const [tap, setTap] = useState<string>(value ? "specific" : "infinity")

    /**
     * Handle change
     * 
     * @returns
     */
    const handleChange = useCallback(function (tap: string) {

        // Set tap
        setTap(tap)

        // On change callback
        onChange(tap === "infinity" ? 0 : 1)

    }, [])

    return <Tabs aria-label="Taps" variant="bordered" className="w-full block" selectedKey={tap} onSelectionChange={key => handleChange(key.toString())}>
        <Tab key="specific" title={lang("Specific")}>
            <Slider
                label={lang("Number of searches")}
                size="sm"
                minValue={1}
                maxValue={60}
                value={value}
                onChange={value => typeof value === "number" && onChange(tap === "infinity" ? 0 : value)}
                getValue={searches => `${searches} ${lang("of")} 60 Searches`}
            />
        </Tab>
        <Tab key="infinity" isDisabled={false} title={lang("Infinity")} />
    </Tabs>
}

/**
 * Props
 * 
 */
interface Props {
    value: number
    onChange: (value: number) => void
}