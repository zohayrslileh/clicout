import { nextui } from "@nextui-org/theme"

/*
|------------------------------------
|  Tailwind configuration 🛠️
|------------------------------------
|
|
*/
export default {
    content: [
        "./index.html",
        "./source/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    darkMode: "class",
    plugins: [nextui()],
}