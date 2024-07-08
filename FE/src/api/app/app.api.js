import axios from "axios"

const model = 'app'

export default class AppAPI {

    static async getStatistic() {
        const api = `${import.meta.env.VITE_API_URL}/${model}/getStatistic`
        return await axios.get(api)
    }

    static async getVisits() {
        const api = `${import.meta.env.VITE_API_URL}/${model}/visits`
        return await axios.get(api)
    }

    static async updateVisits() {
        const api = `${import.meta.env.VITE_API_URL}/${model}/visits/update`
        return await axios.put(api)
    }

    static async updatePageviews() {
        const api = `${import.meta.env.VITE_API_URL}/${model}/pageviews/update`
        return await axios.put(api)
    }
}