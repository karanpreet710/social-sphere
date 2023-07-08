import axios from "axios";

export const makeRequest = axios.create({
    baseURL:"https://socialsphere-backend.vercel.app/api",
    withCredentials:true
})