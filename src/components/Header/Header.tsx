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

const Header = () => {
    const { openFormLogin, openFormRegister } = useFormPopup();
    const handleLogout = () => {};

    const items: MenuProps["items"] = [
        {
            key: "1",
            label: <p onClick={openFormLogin}>Đăng nhập</p>,
        },
        {
            key: "2",
            label: <p onClick={openFormRegister}>Đăng ký</p>,
        },
        {
            key: "3",
            label: <p onClick={handleLogout}>Đăng xuất</p>,
        },
    ];

    const renderRightButtonsList = () => {
        const rightButtons = [
            <FontAwesomeIcon icon={faBell} size="xl" color="gray" />,
            <FontAwesomeIcon icon={faComment} size="xl" color="gray" />,
            <NavLink to="/profile">
                <Avatar size={24} />
            </NavLink>,
        ];
        return rightButtons.map((item, index) => (
            <div
                key={index}
                className="flex-center-all p-2 hover:bg-gray-100 rounded-full cursor-pointer"
            >
                {item}
            </div>
        ));
    };

    return (
        <div className="header flex-items-center py-3 space-x-3">
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
                <Dropdown menu={{ items }} placement="bottom">
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
