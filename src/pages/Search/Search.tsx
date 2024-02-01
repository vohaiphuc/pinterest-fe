import React, { useEffect, useRef, useState } from "react";
import "./assets/style.scss";
import { imageServ } from "../../api/api";
import { IHinh_anh, IHinh_anh_Luu_hinh } from "../../types/Image.type";
import { messageTryAgain } from "../../utils/messageTryAgain";
import { useAppSelector } from "../../hooks/useRedux";
import ImageThread from "../../components/ImageThread/ImageThread";
import { useNavigate, useSearchParams } from "react-router-dom";

const pageSize = 10;
const scrollThreshhold = 200;

const Search: React.FC = () => {
    const { userInfo } = useAppSelector((s) => s.userSlice);
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const keyword = params.get("s");
    const [imgList, setImgList] = useState<IHinh_anh[]>([]);

    useEffect(() => {
        if (!keyword) {
            navigate("/");
        }
        imageServ
            .getSearch(keyword)
            .then((res) => {
                const list = res.data.content;
                setImgList(list);
            })
            .catch((err) => {
                messageTryAgain();
                console.log(err);
            });
    }, [keyword]);

    let fetching = false;
    let lastPage = false;

    const [fetchImgList, setFetchImgList] = useState<IHinh_anh_Luu_hinh[]>([]);
    const fetchImgWithSavedInfo = () => {
        fetching = true;
        imageServ
            .getAllWithSavedInfoPagination(0, fetchImgList.length)
            .then((res) => {
                setFetchImgList(res.data.content);
                fetching = false;
            })
            .catch((err) => {
                console.log(err);
                messageTryAgain();
                fetching = false;
            });
    };

    const fetchImgPagination = (pageIndex: number) => {
        fetching = true;
        const getAllImageServ = userInfo
            ? imageServ.getAllWithSavedInfoPagination
            : imageServ.getAllPagination;

        getAllImageServ(pageIndex, pageSize)
            .then((res) => {
                const list = res.data.content;
                if (list.length < pageSize) {
                    lastPage = true;
                    fetching = false;
                    return;
                }
                setFetchImgList((prev) => [...prev, ...list]);
                fetching = false;
            })
            .catch((err) => {
                console.log(err);
                fetching = false;
            });
    };

    // useEffect(() => {
    //     let pageIndex = 0;

    //     const handleScroll = () => {
    //         const windowHeight = window.innerHeight;
    //         const documentHeight = document.documentElement.scrollHeight;
    //         const scrollTop = window.scrollY;
    //         const x = windowHeight + scrollTop;
    //         if (
    //             x > documentHeight - scrollThreshhold &&
    //             !fetching &&
    //             !lastPage
    //         ) {
    //             fetchImgPagination(pageIndex);
    //             pageIndex++;
    //         }
    //     };
    //     window.addEventListener("scroll", handleScroll);

    //     return () => {
    //         window.removeEventListener("scroll", handleScroll);
    //     };
    // }, []);

    return <ImageThread fetchImgList={imgList} />;
};

export default Search;
