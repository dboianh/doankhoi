import axios from "axios"

const model = 'contact'

export default class ContactAPI {

    static async getAll() {
        const api = `${import.meta.env.VITE_API_URL}/${model}/getAll`
        return await axios.get(api)
    }
    static async delete(id){
        const api = `${import.meta.env.VITE_API_URL}/${model}/delete/${id}`
        return await axios.delete(api)
    }

    static async check(id){
        const api = `${import.meta.env.VITE_API_URL}/${model}/check/${id}`
        return await axios.put(api)
    }

    static async write(data){
        const api = `${import.meta.env.VITE_API_URL}/${model}/create`
        return await axios.post(api, data)
    }

    
}