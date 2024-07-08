import axios from "axios"
import { id } from "date-fns/locale"

const model = 'news'

export default class NewsAPI {
    
    static async getAllNews() {
        const api = `${import.meta.env.VITE_API_URL}/${model}/view`
        return await axios.get(api)
    }
    
    static async getAllByAdmin(id) {
        const api = `${import.meta.env.VITE_API_URL}/${model}/getAllByAdmin/${id}`
        return await axios.get(api)
    }

    static async getByUserCreate(id) {
        const api = `${import.meta.env.VITE_API_URL}/${model}/getByUserCreate/${id}`
        return await axios.get(api)
    }

    static async getMostViewedNews() {
        const api = `${import.meta.env.VITE_API_URL}/${model}/getMostViewedNews`
        return await axios.get(api)
    }

    static async getByCategory(id){
        const api = `${import.meta.env.VITE_API_URL}/${model}/getByCategory/${id}`
        return await axios.get(api)
    }

    static async findOne(id) {
        const api = `${import.meta.env.VITE_API_URL}/${model}/viewById/${id}`
        return await axios.get(api)
    }

    static async findLatest(id) {
        const api = `${import.meta.env.VITE_API_URL}/${model}/getLatestNews/${id}`
        return await axios.get(api)
    }

    static async createOne(data) {
        const api = `${import.meta.env.VITE_API_URL}/${model}/create`
        return await axios.post(api, data, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
        })
    }

    static async delete(id){
        const api = `${import.meta.env.VITE_API_URL}/${model}/delete/${id}`
        return await axios.delete(api)
    }

    
    static async update(id, data){
        const api = `${import.meta.env.VITE_API_URL}/${model}/update/${id}`
        return await axios.put(api, data, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
        })
    }

    static async approve(id, data){
        const api = `${import.meta.env.VITE_API_URL}/${model}/approve/${id}`
        return await axios.put(api, data)
    }

    static async refuse(id, data){
        const api = `${import.meta.env.VITE_API_URL}/${model}/refuse/${id}`
        return await axios.put(api, data)
    }

    static async resend(id, data){
        const api = `${import.meta.env.VITE_API_URL}/${model}/resend/${id}`
        return await axios.put(api, data)
    }

    static async increaseView(id){
        const api = `${import.meta.env.VITE_API_URL}/${model}/views/${id}`
        return await axios.put(api)
    }

    static async search(query){
        const api = `${import.meta.env.VITE_API_URL}/${model}/search`
        return await axios.get(api, {
            params: { keyword: query }
        })
    }

    static async getCategory(query){
        const api = `${import.meta.env.VITE_API_URL}/${model}/getCategory`
        return await axios.get(api)
    }

    static async getTopicByParentId(id){
        const api = `${import.meta.env.VITE_API_URL}/${model}/getByPid/${id}`
        return await axios.get(api)
    }

    static async getDisplayHomeTopic(query){
        const api = `${import.meta.env.VITE_API_URL}/${model}/getDisplayHomeTopic`
        return await axios.get(api)
    }

    static async deleteTopic(id){
        const api = `${import.meta.env.VITE_API_URL}/${model}/topic-management/${id}`
        return await axios.delete(api)
    }

    static async createNewTopic(data) {
        const api = `${import.meta.env.VITE_API_URL}/${model}/topic-management`
        return await axios.post(api, data)
    }

    static async updateNewTopic(id, data){
        const api = `${import.meta.env.VITE_API_URL}/${model}/topic-management/${id}`
        return await axios.put(api, data)
    }

    static async getRecentAnnouncements() {
        const api = `${import.meta.env.VITE_API_URL}/${model}/getRecentAnnouncements`
        return await axios.get(api)
    }

    

}