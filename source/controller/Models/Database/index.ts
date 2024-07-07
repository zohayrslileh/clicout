import { DataSource } from "typeorm"
import { join } from "path"

/*
|-----------------------------
|  Database
|-----------------------------
|
| 
*/
// const database = new DataSource({
//     type: "sqlite",
//     database: "storage/database.sqlite",
//     entities: [join(__dirname, "Entities/*")]
// })

const database = new DataSource({
    type: "mariadb",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "12345679",
    database: "clicout",
    entities: [join(__dirname, "Entities/*")]
})

/*
|-----------------------------
|  Migration
|-----------------------------
|
| 
*/
const migration = async () => await require("./Migration").default()

export default Object.assign(database, { migration })