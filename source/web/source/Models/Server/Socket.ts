import Authorization from "@/Models/Authorization"
import Manager from "@/Tools/Socket/Manager"
import config from "@/config"

/*
|-----------------------------
|  Create manager
|-----------------------------
|
|
*/
const manager = new Manager((import.meta.env.DEV ? config.DEV_SERVER : "/") + "api", { authorization: () => Authorization.value, autoConnect: false })

export default manager