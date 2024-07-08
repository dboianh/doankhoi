import axios from "axios"

const model = 'outline'

export default class NavbarAPI { 

    static async create(data) {
        const api = `${import.meta.env.VITE_API_URL}/${model}/navbar/create`
        return await axios.post(api, data)
    }

    static async getAll() {
        const api = `${import.meta.env.VITE_API_URL}/${model}/navbar/get`
        return await axios.get(api)
    }

    static async delete(id) {
        const api = `${import.meta.env.VITE_API_URL}/${model}/navbar/delete/${id}`
        return await axios.delete(api)
    }

    static async update(id, data) {
        const api = `${import.meta.env.VITE_API_URL}/${model}/navbar/update/${id}`
        return await axios.put(api, data)
    }
    
    static async getById(id) {
        const api = `${import.meta.env.VITE_API_URL}/${model}/navbar/get/${id}`
        return await axios.get(api)
    }
}