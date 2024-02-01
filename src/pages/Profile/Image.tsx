import React from "react";
import "./assets/style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowUpFromBracket,
    faEllipsis,
} from "@fortawesome/free-solid-svg-icons";

interface IImageProps {
    src: string;
}

const Image: React.FC<IImageProps> = ({ src }) => {
    const handleSave = () => {
        console.log("Save to personal's gallery");
    };
    return (
        <div className="relative w-fit rounded-2xl overflow-hidden image-items cursor-pointer">
            <img src={src} alt="" className="w-full" />
            <div className="overlay absolute top-0 left-0 w-full h-full">
                <div className="absolute p-3 top-0 left-0 w-full h-full flex items-end justify-between flex-col">
                    <button
                        className="text-white font-semibold bg-red-500 rounded-3xl px-5 py-3"
                        onClick={handleSave}
                    >
                        Lưu
                    </button>
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
    );
};

export default Image;
