import axios from "axios";

const model = "attached";

export default class AttachAPI {

  static async attach(data) {
    const api = `${import.meta.env.VITE_API_URL}/${model}/upload`;
    return await axios.post(api, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  static async update(id, data) {
    const api = `${import.meta.env.VITE_API_URL}/${model}/update/${id}`;
    return await axios.put(api, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  static async delete(id){
    const api = `${import.meta.env.VITE_API_URL}/${model}/delete/${id}`
    return await axios.delete(api)
  }

}
