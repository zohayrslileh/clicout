import Subscription from "@/Models/Database/Entities/Subscription"

/*
|-----------------------------
|  Tester 🧪
|-----------------------------
|
|
*/
export default async function () {

    const subscription = await Subscription.findOneByOrFail({ id: 1 })

    console.log(subscription.plan)

    console.log("The test completed successfully 🧪 ")
}