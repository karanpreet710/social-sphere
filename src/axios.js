import axios from "axios";

export const makeRequest = axios.create({
    baseURL:"https://https://api-socialsphere.vercel.app/api",
    withCredentials:true
})