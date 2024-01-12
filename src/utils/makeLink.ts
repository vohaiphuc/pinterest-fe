import { BASE_URL } from "../api/config"

export const makeLink = (duong_dan: string): string => {
    return duong_dan ? BASE_URL + duong_dan : ""
}