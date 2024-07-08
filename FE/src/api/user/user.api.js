import axios from "axios"
import { useCookies } from 'react-cookie';

const model = 'user';

export default class UserAPI {      

    static async getAllUser(){
        const api = `${import.meta.env.VITE_API_URL}/${model}/userList`
        return await axios.get(api)
    }

    static async createAccountUser(data){
        const api = `${import.meta.env.VITE_API_URL}/${model}/registration`
        return await axios.post(api, data)
    }

    static async updateUserById(id, data){
        const api = `${import.meta.env.VITE_API_URL}/${model}/updateUser/${id}`
        return await axios.put(api, data, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
    }

    static async updateProfileById(id, data){
        const api = `${import.meta.env.VITE_API_URL}/${model}/updateProfile/${id}`
        return await axios.put(api, data, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
    }

    static async deleteUserById(id){
        const api = `${import.meta.env.VITE_API_URL}/${model}/deleteUser/${id}`
        return await axios.delete(api)
    }
    
    static async getUserById(id){
        const api = `${import.meta.env.VITE_API_URL}/${model}/getUserById/${id}`
        return await axios.get(api)
    }

    static async changePassword(id, data){
        const api = `${import.meta.env.VITE_API_URL}/${model}/changePassword/${id}`
        return await axios.put(api, data)
    }

    //API - ROLE 
    static async getRoles(){
        const api = `${import.meta.env.VITE_API_URL}/${model}/getRoles`
        return await axios.get(api)
    }

}