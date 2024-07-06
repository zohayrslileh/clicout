import { Select, SelectItem } from "@nextui-org/react"
import { CiLaptop, CiMobile3 } from "react-icons/ci"
import { PiDevicesThin } from "react-icons/pi"
import { useLang } from "@/Tools/Language"

/**
 * Devices
 * 
 * @returns 
 */
export default function ({ value, onChange }: Props) {

    /**
     * Lang
     * 
     */
    const lang = useLang()

    return <Select
        label={lang("Select device")}
        variant="bordered"
        placeholder={lang("All devices")}
        selectedKeys={[value]}
        onSelectionChange={([key]) => onChange(key.toString())}
        startContent={icons[value]}
    >
        <SelectItem key="ALL" startContent={<PiDevicesThin />}>
            {lang("Desktop")}
        </SelectItem>
        <SelectItem key="DESKTOP" startContent={<CiLaptop />}>
            {lang("Desktop")}
        </SelectItem>
        <SelectItem key="MOBILE" startContent={<CiMobile3 />}>
            {lang("Mobile")}
        </SelectItem>
    </Select>
}

/**
 * Props
 * 
 */
interface Props {
    value: string
    onChange: (value: string) => void
}

/**
 * Iocns
 * 
 */
const icons: Record<string, JSX.Element> = {
    "ALL": <PiDevicesThin />,
    "DESKTOP": <CiLaptop />,
    "MOBILE": <CiMobile3 />
}