import React, { MouseEventHandler } from "react";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowUpFromBracket,
    faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import { IHinh_anh, IHinh_anh_Luu_hinh } from "../../types/Image.type";
import { makeLink } from "../../utils/makeLink";
import { NavLink } from "react-router-dom";

interface IImageProps {
    handleSaveToGallery: any;
    img: IHinh_anh_Luu_hinh;
}

const ItemImage: React.FC<IImageProps> = ({ img, handleSaveToGallery }) => {
    const BtnDidSave = () => {
        return (
            <button
                className="text-white font-semibold bg-black rounded-3xl px-5 py-3"
                onClick={() => {
                    handleSaveToGallery(img.hinh_id, false);
                }}
            >
                Đã lưu
            </button>
        );
    };
    const BtnSave = () => {
        return (
            <button
                className="text-white font-semibold bg-red-500 rounded-3xl px-5 py-3"
                onClick={() => {
                    handleSaveToGallery(img.hinh_id, true);
                }}
            >
                Lưu
            </button>
        );
    };
    return (
        <NavLink to={`/image/${img.hinh_id}`}>
            <div className="relative w-fit rounded-2xl overflow-hidden image-items cursor-pointer mb-2">
                <img src={makeLink(img.duong_dan)} alt="" className="w-full" />
                <div className="overlay absolute top-0 left-0 w-full h-full">
                    <div className="absolute p-3 top-0 left-0 w-full h-full flex items-end justify-between flex-col">
                        {img.luu_anh?.da_luu ? <BtnDidSave /> : <BtnSave />}
                        <div className="flex-items-center space-x-2">
                            <FontAwesomeIcon
                                icon={faArrowUpFromBracket}
                                className="bg-white rounded-full p-2"
                            />
                            <FontAwesomeIcon
                                icon={faEllipsis}
                                className="bg-white rounded-full p-2"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </NavLink>
    );
};

export default ItemImage;
