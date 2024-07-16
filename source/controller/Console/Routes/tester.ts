import Attack from "@/Models/Database/Entities/Attack"

/*
|-----------------------------
|  Tester 🧪
|-----------------------------
|
|
*/
export default async function () {

    const attacks = await Attack.find()
    
    console.log(attacks)

    console.log("The test completed successfully 🧪 ");
}