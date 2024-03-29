import "./assets/style.scss";
import { faPinterest } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar } from "antd";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { IHinh_anh, IHinh_anh_Luu_hinh } from "../../types/Image.type";
import { makeLink } from "../../utils/makeLink";
import { imageServ } from "../../api/api";
import { messageTryAgain } from "../../utils/messageTryAgain";
import { useAppSelector } from "../../hooks/useRedux";
import useDevice from "../../hooks/useDevice";
import StickyHeaderProfile from "./StickyHeaderProfile";
import ImageThread from "../../components/ImageThread/ImageThread";

const maxFetchEachTime = 10;
const scrollThreshhold = 200;

const Profile = () => {
    const [toggleSaveButton, setToggleSaveButton] = useState(false);
    const [imgList, setImgList] = useState<IHinh_anh[]>(null);
    const { userInfo } = useAppSelector((s) => s.userSlice);
    const { isMobile } = useDevice();
    const [fetchImgList, setFetchImgList] = useState<IHinh_anh[]>([]);

    useEffect(() => {
        if (!toggleSaveButton) {
            fetchImgCreated();
        } else {
            fetchImgSaved();
        }
    }, [toggleSaveButton]);

    const updateFetchList = (reset: boolean) => {
        setFetchImgList((prevImgList) => {
            return reset
                ? imgList.slice(0, maxFetchEachTime)
                : [
                      ...prevImgList,
                      ...imgList.slice(
                          prevImgList.length,
                          prevImgList.length + maxFetchEachTime
                      ),
                  ];
        });
    };

    useEffect(() => {
        if (!imgList) {
            return;
        }
        updateFetchList(true);
        let fetching = false;
        let timeFetchLeft = Math.ceil(imgList.length / maxFetchEachTime);
        const handleScroll = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.scrollY;
            const x = windowHeight + scrollTop;
            if (x > documentHeight - scrollThreshhold && !fetching) {
                fetching = true;
                setTimeout(() => {
                    updateFetchList(false);
                    fetching = false;
                    timeFetchLeft--;
                    if (timeFetchLeft === 0) {
                        window.removeEventListener("scroll", handleScroll);
                    }
                }, 500);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [imgList]);

    const fetchImgCreated = () => {
        imageServ
            .getUploaded()
            .then((res) => {
                setImgList(res.data.content);
            })
            .catch((err) => {
                console.log(err);
                messageTryAgain();
            });
    };

    const fetchImgSaved = () => {
        imageServ
            .getSaved()
            .then((res) => {
                setImgList(
                    res.data.content.sort(
                        (
                            img1: IHinh_anh_Luu_hinh,
                            img2: IHinh_anh_Luu_hinh
                        ) => {
                            const a = new Date(img1.luu_anh.ngay_luu).getTime();
                            const b = new Date(img2.luu_anh.ngay_luu).getTime();
                            return b - a;
                        }
                    )
                );
            })
            .catch((err) => {
                console.log(err);
                messageTryAgain();
            });
    };

    return (
        <div className="mx-auto flex flex-col items-center space-y-3 overflow-auto">
            {isMobile && <StickyHeaderProfile />}
            <Avatar src={makeLink(userInfo?.anh_dai_dien)} size={120} />
            <h2 className="font-semibold text-4xl">{userInfo?.ho_ten}</h2>
            <div className="flex-center-all text-neutral-500 space-x-1">
                <FontAwesomeIcon icon={faPinterest} />
                <span className="">{userInfo?.email}</span>
            </div>
            <p className="text-neutral-700">0 người đang theo dõi</p>
            <div className="flex-center-all space-x-2">
                <button className="px-4 py-3 rounded-3xl bg-neutral-200 font-semibold">
                    Chia sẻ
                </button>
                <NavLink to="/profile/edit">
                    <button
                        className="px-4 py-3 rounded-3xl bg-neutral-200 font-semibold"
                        onClick={() => {}}
                    >
                        Chỉnh sửa hồ sơ
                    </button>
                </NavLink>
            </div>
            <div className="flex-center-all profile-nav py-5">
                <button
                    className={`px-2 py-1 font-semibold rounded-md ${
                        !toggleSaveButton ? "active" : ""
                    }`}
                    onClick={() => {
                        setToggleSaveButton(false);
                    }}
                >
                    <span>Đã tạo</span>
                </button>
                <button
                    className={`px-2 py-1 font-semibold rounded-md ${
                        toggleSaveButton ? "active" : ""
                    }`}
                    onClick={() => {
                        setToggleSaveButton(true);
                    }}
                >
                    <span>Đã lưu</span>
                </button>
            </div>

            <div className="w-full">
                <ImageThread fetchImgList={fetchImgList} />
            </div>
        </div>
    );
};

export default Profile;
