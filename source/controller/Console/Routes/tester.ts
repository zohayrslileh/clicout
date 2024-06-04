import User from "@/Models/Database/Entities/User"

/*
|-----------------------------
|  Tester 🧪
|-----------------------------
|
|
*/
export default async function () {

    const user = User.findOneByOrFail({ id: 1 })

    console.log(user)

    console.log("The test completed successfully 🧪 ")
}