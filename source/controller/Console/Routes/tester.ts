import AttackView from "@/Models/Database/Entities/AttackView"

/*
|-----------------------------
|  Tester 🧪
|-----------------------------
|
|
*/
export default async function () {

    const attacks = await AttackView.find()
    
    console.log(attacks)

    console.log("The test completed successfully 🧪 ");
}