
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
        country: "US",
        direction: "ltr",
        dictionary: async () => await import("./en-US")
    },
    {
        name: "Français",
        key: "fr-FR",
        country: "FR",
        direction: "ltr",
        dictionary: async () => await import("./fr-FR")
    },
    {
        name: "Русский",
        key: "ru-RU",
        country: "RU",
        direction: "ltr",
        dictionary: async () => await import("./ru-RU")
    },
    {
        name: "中文",
        key: "zh-CN",
        country: "CN",
        direction: "ltr",
        dictionary: async () => await import("./zh-CN")
    }
]

export default languages