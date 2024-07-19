import axios from "axios"

interface Product {
    title: string
    description: string
    price: number
    imageURL: string
}

interface Subcategory {
    name: string
    products: Product[]
}

interface Category {
    name: string
    subcategories: Subcategory[]
}

interface Supermarket {
    name: string
    address: string
    phoneNumber: string
    categories: Category[]
}

const Authorization = "eyJraWQiOiJvbGQiLCJhbGciOiJSUzUxMiJ9.eyJpYXQiOjE3MjE0MTE3NTMsImlzcyI6ImF1dGgiLCJleHAiOjE3MjE0MTI5NTMsInJvbGUiOiJBQ0NFU1MiLCJwYXlsb2FkIjoie1widXNlclJvbGVcIjpcIkNVU1RPTUVSXCIsXCJpc1N0YWZmXCI6ZmFsc2UsXCJwZXJtaXNzaW9uR3JvdXBzXCI6W10sXCJjaXR5R3JvdXBzXCI6W10sXCJ1c2VySWRcIjoxNzM1Mzc4NjcsXCJkZXZpY2VJZFwiOjIxMDgxODQwNjEsXCJncmFudFR5cGVcIjpcIlBBU1NXT1JEXCJ9IiwidmVyc2lvbiI6IlYyIiwianRpIjoiNDU1NzAzOWQtYzk4OS00ZjFmLThlOWYtZTMzYzdlNzY1OTNkIn0.loh-_59BKb7VlXgqZUe6gLeKFQc9aC5jBIy2_20pVashAAN9oN3OjiT3CJTsdSbtpi_DhnIwMdVpxOgx5Gz5-HDaiAOb-fTMx250Z6UDLIV3HAQ4ROh7QteHCrQNeQV2QlliFRFi7qu1wfwapmKmziRSGuDuPeXCxpF3rMGEK3OgnLHeKWYaZuMdbzBeba_UTzlOUzNfEsDa3J4iMNglmuSxLnRlBkEBaiIbz_XC125wWbIk6KeiiiyQsNADaPp44w3JLdU8gMeI2Qs9soi-egMAFr-8FBGTtNiOzIwVCbMnro6Rz9Cde3RPDY_rjnmj5N-b1usuPwFjh17mlze_kw"

const instance = axios.create({
    baseURL: "https://api.glovoapp.com/",
    headers: {
        "Authorization": Authorization,
        "Glovo-Location-City-Code": "MAR"
    }
})

export default async function () {

    const response = await instance.get<Supermarket[]>("v3/feeds/categories/4")

    return response.data
}