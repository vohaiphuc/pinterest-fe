import { faPinterest } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, message } from "antd";
import "./assets/style.scss";
import { useEffect, useState } from "react";
import Image from "./Image";
import { useWindowWidth } from "@react-hook/window-size";
import { NavLink, useNavigate } from "react-router-dom";
import { IHinh_anh, IHinh_anh_Luu_hinh } from "../../types/Image.type";
import { makeLink } from "../../utils/makeLink";
import { imageServ } from "../../api/api";
import { userLocalServ } from "../../api/localService";
import { messageTryAgain } from "../../utils/messageTryAgain";
import { useAppSelector } from "../../hooks/useRedux";
import useFormPopup from "../../hooks/useFormPopup";
import ItemImage from "../../components/ItemImage/ItemImage";
import useDevice from "../../hooks/useDevice";
import StickyHeaderProfile from "./StickyHeaderProfile";

const imgWidth: number = 235;

const Profile = () => {
    const [toggleSaveButton, setToggleSaveButton] = useState(false);
    const [imgList, setImgList] = useState<IHinh_anh[]>([]);
    const userInfo = useAppSelector((s) => s.userSlice.userInfo);
    const { openFormLogin } = useFormPopup();
    const navigate = useNavigate();

    const width: number = useWindowWidth();
    const { isMobile } = useDevice();
    const columns: number = isMobile ? 2 : Math.floor(width / imgWidth);
    let gap: number =
        columns == 1 ? 0 : width - (columns * imgWidth) / (columns - 1);
    if (gap > 3) gap = 3;

    useEffect(() => {
        if (userInfo) {
            fetchImgCreated();
        }
    }, [userInfo]);

    useEffect(() => {
        if (!toggleSaveButton) {
            fetchImgCreated();
        } else {
            fetchImgSaved();
        }
    }, [toggleSaveButton]);

    const fetchImgWithSavedInfo = () => {
        if (!toggleSaveButton) {
            fetchImgCreated();
        } else {
            fetchImgSaved();
        }
    };

    const handleSaveToGallery = (hinh_id: number, save: boolean) => {
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

    const renderImgList = () => {
        return imgList?.map((img) => (
            // <Image src={makeLink(img.duong_dan)} key={img.hinh_id} />
            <ItemImage
                key={img.hinh_id}
                img={img}
                handleSaveToGallery={handleSaveToGallery}
            />
        ));
    };

    const fetchImgCreated = () => {
        imageServ
            .getUploaded()
            .then((res) => {
                console.log(res.data.content);
                setImgList(res.data.content.reverse());
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
                console.log(res.data.content);
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
        <div className="max-w-5xl mx-auto flex flex-col items-center space-y-3">
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
            <div
                className="mx-auto gap-3 space-y-3 w-fit"
                style={{
                    columnCount: columns,
                }}
            >
                {renderImgList()}
            </div>
        </div>
    );
};

export default Profile;
