import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/useRedux";
import { makeLink } from "../../../utils/makeLink";
import { Avatar } from "antd";
import { imageServ, userServ } from "../../../api/api";
import { userLocalServ } from "../../../api/localService";
import { setUserInfo } from "../../../redux/userSlice";

type Props = {};

const AvatarEditProfile = (props: Props) => {
    const user = useAppSelector((s) => s.userSlice.userInfo);
    const dispatch = useAppDispatch();
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append("file", file);
            userServ
                .putUpdateAvatar(formData)
                .then((res) => {
                    console.log(res.data.content);
                    setTimeout(() => {
                        updateState();
                    }, 2000);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const updateState = () => {
        userServ
            .getInfo()
            .then((res) => {
                const userInfo = res.data.content;
                userLocalServ.updateInfo(userInfo);
                dispatch(setUserInfo(userInfo));
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="flex-items-center space-x-3 flex-wrap">
            <Avatar src={makeLink(user?.anh_dai_dien)} size={100} />
            <label
                htmlFor="file-upload"
                className="font-semibold bg-gray-100 px-4 py-2 rounded-3xl cursor-pointer"
            >
                Thay đổi
                <input
                    id="file-upload"
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                />
            </label>
        </div>
    );
};

export default AvatarEditProfile;
