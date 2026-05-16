import axios from "axios";

const api = axios.create({
    baseURL: '/data',
    headers: {
        "Content-Type": "application/json",
    }
})

export default api