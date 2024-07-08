import axios from "axios"

const model = 'portal'

export default class ProductAPI {
    
    
    static async getAll() {
        const api = `${import.meta.env.VITE_API_URL}/${model}/getAll`
        return await axios.get(api)
    }
    
    static async getOne(id) {
        const api = `${import.meta.env.VITE_API_URL}/${model}/getOne/${id}`
        return await axios.get(api)
    }
    
    static async delete(id) {
        const api = `${import.meta.env.VITE_API_URL}/${model}/delete/${id}`
        return await axios.delete(api)
    }
    
    static async create(data) {
        const api = `${import.meta.env.VITE_API_URL}/${model}/create`
        return await axios.post(api, data, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
        })
    }


    static async update(id, data){
        const api = `${import.meta.env.VITE_API_URL}/${model}/update/${id}`
        return await axios.put(api, data, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
        })
    }

    
    

}