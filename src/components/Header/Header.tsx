import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import "./assets/style.scss";
import SearchBar from "./SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBell,
    faChevronDown,
    faComment,
} from "@fortawesome/free-solid-svg-icons";
import { Avatar, Dropdown, MenuProps } from "antd";
import useFormPopup from "../../hooks/useFormPopup";
import { useAppSelector } from "../../hooks/useRedux";
import { userLocalServ } from "../../api/localService";
import { makeLink } from "../../utils/makeLink";

const Header = () => {
    const { openFormLogin, openFormRegister } = useFormPopup();
    const { userInfo } = useAppSelector((s) => s.userSlice);
    const handleLogout = () => {
        userLocalServ.remove();
        location.reload();
    };

    const items_logged_in: MenuProps["items"] = [
        {
            key: "1",
            label: <p onClick={handleLogout}>Đăng xuất</p>,
        },
    ];

    const items_logged_out: MenuProps["items"] = [
        {
            key: "1",
            label: <p onClick={openFormLogin}>Đăng nhập</p>,
        },
        {
            key: "2",
            label: <p onClick={openFormRegister}>Đăng ký</p>,
        },
    ];

    const renderRightButtonsList = () => {
        const src =
            userInfo && userInfo.anh_dai_dien
                ? makeLink(userInfo.anh_dai_dien)
                : "";
        const rightButtons = [
            <FontAwesomeIcon icon={faBell} size="xl" color="gray" />,
            <FontAwesomeIcon icon={faComment} size="xl" color="gray" />,
            userInfo && userInfo.anh_dai_dien && (
                <NavLink to="/profile">
                    <Avatar size={24} src={src} />
                </NavLink>
            ),
        ];
        return rightButtons.map((item, index) => {
            return (
                item && (
                    <div
                        key={index}
                        className="flex-center-all p-2 hover:bg-gray-100 rounded-full cursor-pointer"
                    >
                        {item}
                    </div>
                )
            );
        });
    };

    return (
        <div className="header flex-items-center p-3 mb-3 space-x-3 sticky top-0 z-20 bg-white shadow-md">
            <div className="flex-center-all">
                <Logo />
                <NavLink to="/" className="nav-btn font-semibold">
                    Trang chủ
                </NavLink>
                <NavLink to="/upload" className="nav-btn font-semibold">
                    Tạo
                </NavLink>
            </div>
            <SearchBar />
            <div className="flex-center-all">
                {renderRightButtonsList()}
                <Dropdown
                    menu={{
                        items: userInfo ? items_logged_in : items_logged_out,
                    }}
                    placement="bottom"
                    overlayStyle={{ width: 150, textAlign: "right" }}
                >
                    <FontAwesomeIcon
                        icon={faChevronDown}
                        className="hover:bg-gray-100 rounded-full p-1 cursor-pointer"
                        color="gray"
                    />
                </Dropdown>
            </div>
        </div>
    );
};

export default Header;
