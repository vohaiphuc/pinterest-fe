import { I_NguoiDung } from "./User.type";

export interface I_BinhLuan {
    binh_luan_id: number;
    nguoi_dung_id: number;
    hinh_id: number;
    ngay_binh_luan: Date;
    noi_dung: string;
    nguoi_dung: Partial<I_NguoiDung>
}