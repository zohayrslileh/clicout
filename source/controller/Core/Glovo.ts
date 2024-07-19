import { writeFile } from "fs/promises"
import sleep from "@/Tools/Sleep"
import axios from "axios"

interface Product {
    title: string
    description: string
    price: number
    imageURL: string
}

interface ParentCategory {
    name: string
    subcategories: Category[]
}

interface SubCategory {
    name: string
    products: Product[]
}

type Category = ParentCategory | SubCategory

interface Supermarket {
    name: string
    address: string
    phoneNumber: string
    categories: Category[]
}

const Authorization = "eyJraWQiOiJvbGQiLCJhbGciOiJSUzUxMiJ9.eyJpYXQiOjE3MjE0MjI2MjgsImlzcyI6ImF1dGgiLCJleHAiOjE3MjE0MjM4MjgsInJvbGUiOiJBQ0NFU1MiLCJwYXlsb2FkIjoie1widXNlclJvbGVcIjpcIkNVU1RPTUVSXCIsXCJpc1N0YWZmXCI6ZmFsc2UsXCJwZXJtaXNzaW9uR3JvdXBzXCI6W10sXCJjaXR5R3JvdXBzXCI6W10sXCJ1c2VySWRcIjoxNzM1Mzc4NjcsXCJkZXZpY2VJZFwiOjIxMDgxODQwNjEsXCJncmFudFR5cGVcIjpcIlBBU1NXT1JEXCJ9IiwidmVyc2lvbiI6IlYyIiwianRpIjoiMjRmMjY3NTYtYjJkZS00NThkLWFhOWUtYWVhZjhiM2M2ZTA0In0.AFyzKxmtUNDv5b7e4t02ZTchrFXBcIHMmKVFaJpA9YQKOEtRgIFyI18DyAqScAYdhyXMz61_O479FDZG2-BhkrezcS_BIQ0hnT73Zfoce5qS-77A5MXqmqna47eJkmKuSaGWh9H1TphmFG_3k7BWJDK3Ye3OYvY512t2LZrOTeOK7WuoOq3EUI2wkJ34g0BIPRQoac-qNjCeGnOnZDX3aGVQIgJ45jL4tTINHX3CmMWGUMSq6yI4M3vA9P713yiPnAFTOQCDf3_r_fZENfyj5vRjuSw9RncWFcRx7NeffUZou-OwBl2dK_XtmaD75H86cIStFKey0Ir070RpcqDoow"

const instance = axios.create({
    baseURL: "https://api.glovoapp.com/",
    headers: {
        "Authorization": Authorization,
        "Glovo-Location-City-Code": "MAR",
        "Glovo-App-Platform": "web",
        "Glovo-Language-Code": "fr"
    }
})

async function fetchProducts(path: string, categoryName: string) {

    const products: Product[] = []

    do {

        try {

            const response = await instance.get(`/v3/${path}`)

            console.log(`${categoryName}:Fetch:Products ${new Date}`)

            for (const grid of response.data.data.body) {

                for (const primativeProduct of grid.data.elements) {

                    const data = primativeProduct.data

                    const product: Product = {
                        title: data.name,
                        description: data.description,
                        price: data.price,
                        imageURL: data.imageUrl
                    }

                    products.push(product)
                }
            }

            break
        }

        catch (exception: any) {

            console.error(exception.message)

            await sleep(1 * 1000)

            if (exception.response.status === 429) continue

            else break
        }

    } while (true)

    return products
}

async function handleCategories(primativeCategories: any[]) {

    const categories: Category[] = []

    for (const primativeCategory of primativeCategories) {

        const tracking = primativeCategory.tracking

        if (tracking.collectionType === "TOP_SELLERS") continue

        const elements = primativeCategory.elements

        const action = primativeCategory.action

        const category: Category = elements.length ? {
            name: primativeCategory.name,
            subcategories: await handleCategories(elements),
        } : {
            name: primativeCategory.name,
            products: await fetchProducts(action.data.path, primativeCategory.name)
        }

        categories.push(category)
    }

    return categories
}

async function fetchCategories(storeId: number, addressId: number) {

    do {

        try {

            const response = await instance.get(`/v3/stores/${storeId}/addresses/${addressId}/node/store_menu`)

            console.log(`${storeId}:Fetch:Categories ${new Date}`)

            return await handleCategories(response.data.data.elements)

            break
        }

        catch (exception: any) {

            console.error(exception.message)

            await sleep(1 * 1000)

            continue
        }

    } while (true)
}

async function fetchSupermarkets() {

    const supermarkets: Supermarket[] = []

    do {

        try {

            const response = await instance.get("/v3/feeds/categories/4")

            console.log(`Fetch:Supermarkets ${new Date}`)

            for (const primativeSupermarket of response.data.elements) {

                const singleData = primativeSupermarket.singleData

                if (!singleData) continue

                const storeData = singleData.storeData

                if (!storeData) continue

                const store = storeData.store

                const supermarket: Supermarket = {
                    name: store.name,
                    address: store.address,
                    phoneNumber: store.phoneNumber,
                    categories: await fetchCategories(store.id, store.addressId)
                }

                supermarkets.push(supermarket)
            }

            break
        }

        catch (exception: any) {

            console.error(exception.message)

            await sleep(1 * 1000)

            continue
        }

    } while (true)

    return supermarkets
}

export default async function () {

    await writeFile(`storage/supermarkets.json`, JSON.stringify(await fetchSupermarkets()))
}