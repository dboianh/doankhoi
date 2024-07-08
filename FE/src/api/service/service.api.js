import axios from "axios"

const model = 'service'

export default class ServiceAPI {

    static async getAllService() {
        const api = `${import.meta.env.VITE_API_URL}/${model}/getAllService`
        return await axios.get(api)
    }

    static async findOne(id) {
        const api = `${import.meta.env.VITE_API_URL}/${model}/get/${id}`
        return await axios.get(api)
    }


    static async addNewService(data) {
        const api = `${import.meta.env.VITE_API_URL}/${model}/addService`
        return await axios.post(api, data, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
        })
    }

    static async deleteService(id) {
        const api = `${import.meta.env.VITE_API_URL}/${model}/deleteService/${id}`
        return await axios.delete(api)
    }

    static async putUpdateServiceById(id, data) {
        const api = `${import.meta.env.VITE_API_URL}/${model}/upload/${id}`
        return await axios.put(api, data, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
        })
    }
}