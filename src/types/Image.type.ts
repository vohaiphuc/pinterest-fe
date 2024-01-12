import { I_NguoiDung } from "./User.type";

export interface IHinh_anh {
    hinh_id: number;
    ten_hinh: string;
    duong_dan: string;
    mo_ta: string;
    nguoi_dung_id: number;
    luu_anh: any;
    nguoi_dung: I_NguoiDung;
}

export interface IHinh_anh_Luu_hinh extends IHinh_anh {
    luu_anh: {
        luu_anh_id: number;
        nguoi_dung_id: number;
        hinh_id: number;
        ngay_luu: Date;
        da_luu: boolean;
    }
}
