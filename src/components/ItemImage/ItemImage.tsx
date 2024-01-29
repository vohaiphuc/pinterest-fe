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
import SaveImageButton from "../Buttons/SaveImageButton";

interface IImageProps {
    img: IHinh_anh_Luu_hinh;
}

const ItemImage: React.FC<IImageProps> = ({ img }) => {
    return (
        <div className="relative w-full h-fit rounded-2xl overflow-hidden image-items cursor-pointer mb-2">
            <NavLink
                to={`/image/${img.hinh_id}`}
                className="mx-auto w-full h-full z-10"
            >
                <img src={makeLink(img.duong_dan)} alt="" className="w-full" />
            </NavLink>
            <div className="img-btn w-full absolute top-0 left-0 flex justify-end p-3">
                <SaveImageButton
                    hinh_id={img.hinh_id}
                    isImageSaved={img.luu_anh?.da_luu ? true : false}
                />
            </div>

            <div className="img-btn w-full absolute bottom-0 left-0 flex items-end justify-between flex-col p-3">
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
    );
};

export default ItemImage;
