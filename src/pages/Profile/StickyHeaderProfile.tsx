import { faGear, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown, MenuProps } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { userLocalServ } from "../../api/localService";

type Props = {};

const StickyHeaderProfile = (props: Props) => {
    const navigate = useNavigate();
    const handleOnclick = () => {
        navigate("/upload");
    };

    const logout = () => {
        userLocalServ.remove();
        location.reload();
    };

    const items: MenuProps["items"] = [
        {
            key: "1",
            label: <p onClick={logout}>Đăng xuất</p>,
        },
    ];

    return (
        <div className="w-full flex space-x-3">
            <input
                type="text"
                className="flex-1 border-2 rounded-3xl px-3 py-2"
            />
            <div className="space-x-1 flex-items-center">
                <FontAwesomeIcon
                    icon={faPlus}
                    className="px-3 py-2"
                    onClick={handleOnclick}
                />
                <Dropdown menu={{ items }} placement="bottomRight">
                    <FontAwesomeIcon icon={faGear} className="px-3 py-2" />
                </Dropdown>
            </div>
        </div>
    );
};

export default StickyHeaderProfile;
