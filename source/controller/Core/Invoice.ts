import Nowpay from "@/Models/Nowpay"
import zod from "zod"

/*
|-----------------------------
|  Invoice
|-----------------------------
|
| 
*/
export default class Invoice {

    /**
     * Id
     * 
     */
    public readonly id: number

    /**
     * Payment link
     * 
     */
    public readonly paymentLink: string

    /**
     * Constructor methodd
     * 
     */
    public constructor(primitiveInvoice: PrimitiveInvoice) {

        // Set id
        this.id = primitiveInvoice.id

        // Set payment link
        this.paymentLink = primitiveInvoice.invoice_url
    }

    /**
     * Create method
     * 
     * @returns
     */
    public static async create(data: unknown) {

        // Schema
        const schema = zod.object({
            priceAmount: zod.number(),
            payCurrency: zod.string()
        })

        // Validate data
        const { priceAmount, payCurrency } = schema.parse(data)

        // Ask invoice
        const invoice = await Nowpay.post<PrimitiveInvoice>("/invoice", {
            "price_amount": priceAmount,
            "price_currency": "usd",
            "pay_currency": payCurrency
        })

        return new this(invoice.data)
    }
}

/*
|-----------------------------
|  Primitive Invoice
|-----------------------------
|
| 
*/
export interface PrimitiveInvoice {
    id: number
    invoice_url: string
}