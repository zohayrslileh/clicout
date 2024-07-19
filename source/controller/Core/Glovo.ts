import Json from "@/Tools/Json"
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

const Authorization = "eyJraWQiOiJvbGQiLCJhbGciOiJSUzUxMiJ9.eyJpYXQiOjE3MjE0MTg1NzUsImlzcyI6ImF1dGgiLCJleHAiOjE3MjE0MTk3NzUsInJvbGUiOiJBQ0NFU1MiLCJwYXlsb2FkIjoie1widXNlclJvbGVcIjpcIkNVU1RPTUVSXCIsXCJpc1N0YWZmXCI6ZmFsc2UsXCJwZXJtaXNzaW9uR3JvdXBzXCI6W10sXCJjaXR5R3JvdXBzXCI6W10sXCJ1c2VySWRcIjoxNzM1Mzc4NjcsXCJkZXZpY2VJZFwiOjIxMDgxODQwNjEsXCJncmFudFR5cGVcIjpcIlBBU1NXT1JEXCJ9IiwidmVyc2lvbiI6IlYyIiwianRpIjoiY2E4M2E0ZmYtMzg2My00ZGNiLTk4ZDAtNTM0MjE4NjFlYzcwIn0.RCaIq42H0im2Bzev_BsNcGgD3RFxBTQR6NBGjqpl5oE8IkcCKvaWvM3d-7qMT3_HBF9ewfOrVmTwWAKUJ3q2XLTAsNvICSBqxgWCimvBDwXtOkQUgdR6cOR_jIgai3iwAG2LEIEE5gVjB52QVe7o8VHb7nu2PDOEsrWpBVCVQZL_4KqlkArq5uiD5DmM0t178rRSx5kC4vMEaarpBNgcLQXpU_iofeybswoTU2lkTeBVesKqEBhZodqCM8M-vzv2f2_je_EM_tBvN-selLP475LLfFpPFaF_5woH7SOAfdAPvwZkjm3DRM2ZfNbYJuN5KNskVFQeuASjFVyn1I7p_g"

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

    const response = await instance.get(`/v3/stores/${storeId}/addresses/${addressId}/node/store_menu`)

    console.log(`${storeId}:Fetch:Categories ${new Date}`)

    return await handleCategories(response.data.data.elements)
}

async function fetchSupermarkets() {

    const supermarkets: Supermarket[] = []

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

        break
    }

    return supermarkets
}

export default async function () {

    new Json("storage/supermarkets.json").update(await fetchSupermarkets())
}