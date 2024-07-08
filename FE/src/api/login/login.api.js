import axios from "axios"

const model = 'user'

export default class LoginAPI {

    static async login(data) {
        const api = `${import.meta.env.VITE_API_URL}/${model}/login`
        return await axios.post(api, data)
    }
}