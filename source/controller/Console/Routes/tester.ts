import Plan from "@/Models/Database/Entities/Plan"

/*
|-----------------------------
|  Tester 🧪
|-----------------------------
|
|
*/
export default async function () {

    await Plan.clear()

    console.log("The test completed successfully 🧪 ")
}