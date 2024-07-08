import axios from "axios"

const model = 'outline'

export default class BannerAPI { 

    static async create(data) {
        const api = `${import.meta.env.VITE_API_URL}/${model}/banner/create`
        return await axios.post(api, data, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
        })
    }

    static async check(index) {
        const api = `${import.meta.env.VITE_API_URL}/${model}/banner/check/${index}`
        return await axios.get(api)
    }

    static async getAll() {
        const api = `${import.meta.env.VITE_API_URL}/${model}/banner/get`
        return await axios.get(api)
    }


    static async getOne(id) {
        const api = `${import.meta.env.VITE_API_URL}/${model}/banner/get/${id}`
        return await axios.get(api)
    }


    static async delete(id) {
        const api = `${import.meta.env.VITE_API_URL}/${model}/banner/delete/${id}`
        return await axios.delete(api)
    }

    static async update(id, data){
        const api = `${import.meta.env.VITE_API_URL}/${model}/banner/update/${id}`
        return await axios.put(api, data, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
        })
    }
}