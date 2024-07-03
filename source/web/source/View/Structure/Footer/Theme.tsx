import { GoSun, GoMoon } from "react-icons/go"
import themes from "@/View/Appearance/Themes"
import { Tab, Tabs } from "@nextui-org/react"
import Appearance from "@/View/Appearance"
import { useCallback } from "react"

/**
 * Theme
 * 
 * @returns 
 */
export default function () {

    /**
     * Handle change
     * 
     * @returns
     */
    const handleChange = useCallback(function (key: string) {

        // Theme
        const theme = themes.find(theme => theme.key === key)

        // Change theme
        Appearance.theme = theme || themes[0]

    }, [])

    return <Tabs
        radius="full"
        variant="bordered"
        className="justify-self-end"
        classNames={{
            tabList: "border-1"
        }}
        selectedKey={Appearance.theme.key}
        onSelectionChange={key => handleChange(key.toString())}
    >
        <Tab key="light" title={<GoSun />} />
        <Tab key="dark" title={<GoMoon />} />
    </Tabs>
}