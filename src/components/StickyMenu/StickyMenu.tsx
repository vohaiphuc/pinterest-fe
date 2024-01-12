import React, { useEffect, useState } from "react";
import useDevice from "../../hooks/useDevice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCommentDots,
    faHome,
    faSearch,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "../../hooks/useRedux";
import { Avatar } from "antd";
import { useNavigate } from "react-router-dom";
import { makeLink } from "../../utils/makeLink";
import useFormPopup from "../../hooks/useFormPopup";

type Props = {};

const StickyMenu = (props: Props) => {
    const [show, setShow] = useState<boolean>(true);
    const user = useAppSelector((s) => s.userSlice.userInfo);
    const navigate = useNavigate();
    const { openFormLogin } = useFormPopup();

    const NavBtn = ({ icon, title, onClick }) => {
        return (
            <div className="flex-center-all w-1/4" onClick={onClick}>
                {icon}
            </div>
        );
    };

    return (
        <div className="fixed bottom-0 left-0 w-full bg-white z-50 flex items-center justify-between p-3">
            <NavBtn
                icon={<FontAwesomeIcon icon={faHome} size="xl" />}
                title="Trang chủ"
                onClick={() => {
                    navigate("/");
                }}
            />
            <NavBtn
                icon={<FontAwesomeIcon icon={faSearch} size="xl" />}
                title="Tìm kiếm"
                onClick={() => {}}
            />
            <NavBtn
                icon={<FontAwesomeIcon icon={faCommentDots} size="xl" />}
                title="Hộp thư đến"
                onClick={() => {}}
            />

            {user ? (
                <NavBtn
                    icon={
                        <Avatar
                            src={makeLink(user.anh_dai_dien)}
                            size={"small"}
                        />
                    }
                    title="Đã lưu"
                    onClick={() => {
                        navigate("/profile");
                    }}
                />
            ) : (
                <NavBtn
                    icon={<FontAwesomeIcon icon={faUser} size="xl" />}
                    title="Đăng nhập"
                    onClick={openFormLogin}
                />
            )}
        </div>
    );
};

export default StickyMenu;
