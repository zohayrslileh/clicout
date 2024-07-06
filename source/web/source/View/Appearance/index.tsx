import AppearanceState, { initialAppearance } from "./context"
import React, { useEffect } from "react"
import { Global } from "@emotion/react"
import UIProvider from "./UIProvider"
import schema from "./schema"
import global from "./global"
import fonts from "./Fonts"

/*
|-----------------------------
|  Appearance
|-----------------------------
|
|
*/
const Appearance = new AppearanceState(initialAppearance)

/*
|-----------------------------
|  Container
|-----------------------------
|
|
*/
const Container = function ({ children }: React.ComponentProps<typeof React.Fragment>) {

    /**
     * Theme
     * 
     */
    const theme = Appearance.theme

    /**
     * On theme changed
     * 
     */
    useEffect(function () {

        // Set as body class
        document.body.setAttribute("class", `${theme.key} text-foreground bg-background`)

    }, [theme])

    /**
     * UI Provider
     * 
     */
    return <UIProvider>

        {/** Fonts */}
        <Global styles={fonts} />

        {/** Global Style */}
        <Global styles={global} />

        {/** Children */}
        {children}

    </UIProvider>
}

export default Object.assign(Appearance, { Container, schema })