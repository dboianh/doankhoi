import axios from "axios"

const model = 'gallery'

export default class galleryAPI {

    static async getAll() {
        const api = `${import.meta.env.VITE_API_URL}/${model}/get`
        return await axios.get(api)
    }

    static async getById(id) {
        const api = `${import.meta.env.VITE_API_URL}/${model}/getById/${id}`
        return await axios.get(api)
    }


    static async getPhotos(id) {
        const api = `${import.meta.env.VITE_API_URL}/${model}/getPhotoByAlbum/${id}`
        return await axios.get(api)
    }


    static async create(data){
        const api = `${import.meta.env.VITE_API_URL}/${model}/create`
        return await axios.post(api, data)
    }

    static async rename(id, data){
        const api = `${import.meta.env.VITE_API_URL}/${model}/rename/${id}`
        return await axios.put(api, data)
    }


    static async setCover(id, data){
        const api = `${import.meta.env.VITE_API_URL}/${model}/update/${id}`
        return await axios.put(api, data)
    }

    static async delete(id){
        const api = `${import.meta.env.VITE_API_URL}/${model}/delete/${id}`
        return await axios.delete(api)
    }

    //Delete photos
    static async deleteMany(data){
        const api = `${import.meta.env.VITE_API_URL}/${model}/delete`
        return await axios.post(api, data, { headers: { 'Content-Type': 'application/json' } })
    }

    static async upload(data){
        const api = `${import.meta.env.VITE_API_URL}/${model}/upload`
        return await axios.post(api, data, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
        })
    }

    
}