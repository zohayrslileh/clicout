import Invoice from "@/Core/Invoice"

/*
|-----------------------------
|  Tester 🧪
|-----------------------------
|
|
*/
export default async function () {

    const invoice = await Invoice.create({ priceAmount: 159, payCurrency: "usdttrc20" })

    console.log(invoice)

    console.log("The test completed successfully 🧪 ")
}