import axios from "axios"
import { https } from "./config"

export const imageServ = {
    getAll: () => https.get("/image"),
    getAllWithSavedInfo: () => https.get("/image/saved-info"),
    getUploaded: () => https.get("/image/user-uploaded"),
    getSearch: () => { },
    getDetailById: (hinh_id: number) => https.get(`/image/detail/${hinh_id}`),
    deleteById: (hinh_id: number) => { },
    postUpload: (formData: FormData) => https.post("/image/upload", formData),
    getSaved: () => https.get("/saved-image"),
    getCheckSavedById: (hinh_id: number) => { },
    postSaveById: (hinh_id: number) => https.post(`/saved-image/save/${hinh_id}`),
    postUnsaveById: (hinh_id: number) => https.post(`/saved-image/unsave/${hinh_id}`),
}

export const commentServ = {
    getAllByImgId: (hinh_id: number) => https.get(`/comment/${hinh_id}`),
    post: (hinh_id: number, noi_dung: string) => https.post("/comment", { hinh_id, noi_dung }),
    delete: (binh_luan_id: number) => https.delete(`/comment/${binh_luan_id}`)
}

export const userServ = {
    getInfo: () => https.get("/user/info"),
    putUpdateInfo: (newChange: any) => https.put("/user/update-info", newChange),
    putUpdatePassword: () => { },
    putUpdateAvatar: (formData: FormData) => https.put("/user/update-avatar", formData),
}

export const authServ = {
    login: (data: any) => https.post("/auth/login", data),
    register: (data: any) => https.post("auth/register", data),
}