import React, { useEffect, useRef, useState } from "react";
import "./assets/style.scss";
import { useWindowWidth } from "@react-hook/window-size";
import useDevice from "../../hooks/useDevice";
import { IHinh_anh, IHinh_anh_Luu_hinh } from "../../types/Image.type";
import ItemImage from "../ItemImage/ItemImage";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

type Props = {
    fetchImgList: IHinh_anh[] | IHinh_anh_Luu_hinh[];
};

const imgWidth: number = 235;
const maxGap = 3;

const ImageThread: React.FC<Props> = ({ fetchImgList }) => {
    const width: number = useWindowWidth();
    const { isMobile } = useDevice();
    const columns: number = isMobile ? 2 : Math.floor(width / imgWidth);
    let columnGap: number =
        columns == 1 ? 0 : width - (columns * imgWidth) / (columns - 1);
    if (columnGap > maxGap) {
        columnGap = maxGap;
    }

    const renderImgList = () => {
        return fetchImgList?.map((img) => (
            <ItemImage key={img.hinh_id} img={img} />
        ));
    };

    return (
        <ResponsiveMasonry
            columnsCountBreakPoints={{
                350: columns,
                750: columns,
                900: columns,
            }}
        >
            <Masonry style={{ gap: columnGap * 4 }}>{renderImgList()}</Masonry>
        </ResponsiveMasonry>
    );
};

export default ImageThread;
