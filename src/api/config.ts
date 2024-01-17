import axios from "axios";
import { userLocalServ } from "./localService";

export const BASE_URL = 'https://pinterest-api.phucdev.io.vn/'
// export const BASE_URL = 'http://localhost:8080/'

export const https = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        'Authorization': `Bearer ${userLocalServ.get()?.token}`
    }
});
