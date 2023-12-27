import axios from "axios"
import { https } from "./config"

export const imageServ = {
    getAll: () => { },
    getUploaded: () => { },
    getSearch: () => { },
    getDetailById: (hinh_id: number) => { },
    deleteById: (hinh_id: number) => { },
    postUpload: () => { },
    getSaved: () => { },
    getCheckSavedById: (hinh_id: number) => { },
    postSaveById: (hinh_id: number) => { },
    postUnsaveById: (hinh_id: number) => { },
}

export const commentServ = {
    getAllByImgId: (hinh_id: number) => { },
    post: () => { },
}

export const userServ = {
    getInfo: () => { },
    putUpdateInfo: () => { },
    putUpdatePassword: () => { },
    putUpdateAvatar: () => { },
}

export const authServ = {
    login: (data: any) => https.post("/auth/login", data),
    register: (data: any) => https.post("auth/register", data),
}