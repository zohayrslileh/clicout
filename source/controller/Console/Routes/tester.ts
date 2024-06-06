import Nowpay from "@/Models/Nowpay"

/*
|-----------------------------
|  Tester 🧪
|-----------------------------
|
|
*/
export default async function () {

    const response = await Nowpay.post("/invoice", {
        "price_amount": 59,
        "price_currency": "usd",
        "pay_currency": "usdttrc20"
    })

    console.log(response.data)

    console.log("The test completed successfully 🧪 ")
}