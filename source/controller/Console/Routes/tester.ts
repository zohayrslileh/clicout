import Subscription from "@/Models/Database/Entities/Subscription"
import Plan from "@/Models/Database/Entities/Plan"
import User from "@/Models/Database/Entities/User"

/*
|-----------------------------
|  Tester 🧪
|-----------------------------
|
|
*/
export default async function () {

    const user = await User.findOneByOrFail({ id: 1 })

    const plan = await Plan.findOneByOrFail({ id: 1 })

    const subscription = await Subscription.findOneByOrFail({ id: 1 })

    console.log(user, plan, subscription)

    console.log("The test completed successfully 🧪 ")
}