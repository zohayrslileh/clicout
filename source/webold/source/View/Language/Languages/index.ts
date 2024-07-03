
/*
|-----------------------------
|  Languages
|-----------------------------
|
|
*/
const languages = [
    {
        name: "English",
        key: "en-US",
        direction: "ltr",
        dictionary: async () => await import("./en-US")
    },
    {
        name: "Français",
        key: "fr-FR",
        direction: "ltr",
        dictionary: async () => await import("./fr-FR")
    }
]

export default languages