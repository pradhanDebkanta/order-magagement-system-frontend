import axios from "axios";
import { env } from "../config/EnvionmentConfig";

const service = axios.create({
    baseURL: env.API_ENDPOINT_URL,
    timeout: 60000,
    withCredentials: true
});

export default service;