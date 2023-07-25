import axios from "axios";

export const makeRequest = axios.create({
    baseURL:"https://api-socialsphere.onrender.com/api",
    withCredentials:true
})