import { faPinterest } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar } from "antd";
import "./assets/style.scss";
import { useState } from "react";
import { srcList } from "./assets/Dummy";
import Image from "./Image";
import { useWindowWidth } from "@react-hook/window-size";
import { NavLink } from "react-router-dom";

const imgWidth: number = 235;

const Profile = () => {
    const [toggleSaveButton, setToggleSaveButton] = useState(false);

    const width: number = useWindowWidth();
    const columns: number = Math.floor(width / imgWidth);
    let gap: number =
        columns == 1 ? 0 : width - (columns * imgWidth) / (columns - 1);
    if (gap > 3) gap = 3;

    const renderImgList = () => {
        return srcList.map((src) => <Image src={src} key={src} />);
    };

    return (
        <div className="max-w-5xl mx-auto flex flex-col items-center space-y-3">
            <Avatar
                src="https://cdn5.vectorstock.com/i/1000x1000/92/89/hipster-avatar-image-vector-19639289.jpg"
                size={120}
            />
            <h2 className="font-semibold text-4xl">Võ Phúc</h2>
            <div className="flex-items-center text-neutral-500 space-x-1">
                <FontAwesomeIcon icon={faPinterest} />
                <span className="">username</span>
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
