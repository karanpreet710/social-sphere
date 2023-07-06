import axios from "axios";

export const makeRequest = axios.create({
    baseURL:"https://socialsphere-backend.onrender.com/api",
    withCredentials:true
})