import React, { useEffect, useRef, useState } from "react";
import { useWindowWidth } from "@react-hook/window-size";
import { imageServ } from "../../api/api";
import { message } from "antd";
import { IHinh_anh, IHinh_anh_Luu_hinh } from "../../types/Image.type";
import { messageTryAgain } from "../../utils/messageTryAgain";
import { useAppSelector } from "../../hooks/useRedux";
import useFormPopup from "../../hooks/useFormPopup";
import ItemImage from "../../components/ItemImage/ItemImage";
import useDevice from "../../hooks/useDevice";
import "./assets/style.scss";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const imgWidth: number = 235;
const Home: React.FC = () => {
    const width: number = useWindowWidth();
    const { isMobile } = useDevice();
    const columns: number = isMobile ? 2 : Math.floor(width / imgWidth);
    let gap: number =
        columns == 1 ? 0 : width - (columns * imgWidth) / (columns - 1);
    if (gap > 3) gap = 3;

    const [imgList, setImgList] = useState<IHinh_anh_Luu_hinh[]>([]);
    const user = useAppSelector((s) => s.userSlice?.userInfo);
    const { openFormLogin } = useFormPopup();

    const fetchImgWithSavedInfo = () => {
        imageServ
            .getAllWithSavedInfo()
            .then((res) => {
                setImgList(res.data.content);
            })
            .catch((err) => {
                console.log(err);
                message.error("Có lỗi xảy ra, vui lòng thử lại!");
            });
    };

    useEffect(() => {
        if (!user) {
            imageServ
                .getAll()
                .then((res) => {
                    setImgList(res.data.content);
                })
                .catch((err) => {
                    console.log(err);
                    message.error("Có lỗi xảy ra, vui lòng thử lại!");
                });
        } else {
            fetchImgWithSavedInfo();
        }
        fetchImg();
    }, []);

    const [fetchImgList, setFetchImgList] = useState<IHinh_anh_Luu_hinh[]>([]);
    const [currentImgPosition, setCurrentImgPosition] = useState<number>(0);

    const fetchImg = (savedCurrentImgPosition = null) => {
        const fetchEachTime = 10;
        const start = savedCurrentImgPosition ? savedCurrentImgPosition : currentImgPosition
        const end = start + fetchEachTime
        setFetchImgList((prev) => [...prev, ...imgList.slice(
            start,
            end
        )]);
        setCurrentImgPosition(end);
    };

    const nextImgPosition = prev => {
        const step = 10
        return prev + step
    }

    useEffect(() => {
        if (imgList.length > 0) {
            let savedCurrentImgPosition = nextImgPosition(currentImgPosition)
            const handleScroll = () => {
                const windowHeight = window.innerHeight;
                const documentHeight = document.documentElement.scrollHeight;
                const scrollTop = window.scrollY;
                const x = windowHeight + scrollTop

                if (x > documentHeight - 10) {
                    fetchImg(savedCurrentImgPosition);
                    savedCurrentImgPosition = nextImgPosition(savedCurrentImgPosition)
                }
            };
            window.addEventListener("scroll", handleScroll);
            fetchImg()

            return () => {
                window.removeEventListener("scroll", handleScroll);
            };
        }
    }, [imgList]);

    const renderImgList = () => {
        return fetchImgList?.map((img) => (
            <ItemImage
                key={img.hinh_id}
                img={img}
                handleSaveToGallery={handleSaveToGallery}
            />
        ));
    };

    const handleSaveToGallery = (hinh_id: number, save: boolean) => {
        if (!user) {
            openFormLogin();
            return;
        }
        if (save) {
            imageServ
                .postSaveById(hinh_id)
                .then((res) => {
                    console.log(res.data.content);
                    message.success("Đã lưu");
                    fetchImgWithSavedInfo();
                })
                .catch((err) => {
                    console.log(err);
                    messageTryAgain;
                });
        } else {
            imageServ
                .postUnsaveById(hinh_id)
                .then((res) => {
                    console.log(res.data.content);
                    message.success("Đã bỏ lưu");
                    fetchImgWithSavedInfo();
                })
                .catch((err) => {
                    console.log(err);
                    messageTryAgain;
                });
        }
    };

    return (
        <ResponsiveMasonry
            columnsCountBreakPoints={{
                350: columns,
                750: columns,
                900: columns,
            }}
        >
            <Masonry style={{ gap: 12 }}>{renderImgList()}</Masonry>
        </ResponsiveMasonry>
    );
};

export default Home;
