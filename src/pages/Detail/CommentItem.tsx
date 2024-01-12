import React from "react";
import { I_BinhLuan } from "../../types/Comment.type";
import { Avatar, Dropdown, MenuProps, message } from "antd";
import { makeLink } from "../../utils/makeLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { useAppSelector } from "../../hooks/useRedux";
import { commentServ } from "../../api/api";
import moment from "moment";

type Props = {
    cmt: I_BinhLuan;
    deleleComment: any;
};

const CommentItem = (props: Props) => {
    const { cmt, deleleComment } = props;

    const itemsThisUser: MenuProps["items"] = [
        {
            key: "1",
            label: <p>Chỉnh sửa</p>,
        },
        {
            key: "2",
            label: (
                <p
                    onClick={() => {
                        deleleComment(cmt.binh_luan_id);
                    }}
                >
                    Xóa
                </p>
            ),
        },
    ];
    const itemsOtherUser: MenuProps["items"] = [
        {
            key: "1",
            label: <p>Báo cáo nội dung này</p>,
        },
        {
            key: "2",
            label: <p>Chặn người dùng</p>,
        },
    ];
    const user = useAppSelector((s) => s.userSlice.userInfo);
    const owner: boolean = user && user.nguoi_dung_id === cmt.nguoi_dung_id;
    return (
        <div className="flex space-x-3">
            <Avatar src={makeLink(cmt.nguoi_dung.anh_dai_dien)} />
            <div>
                <div className="space-x-3">
                    <span className="font-semibold">
                        {cmt.nguoi_dung.ho_ten}
                    </span>
                    <span>{cmt.noi_dung}</span>
                </div>
                <div className="flex-items-center space-x-5">
                    <p className="text-sm font-light">
                        {moment(cmt?.ngay_binh_luan)
                            .locale("vi")
                            .startOf("minutes")
                            .fromNow()
                            .toLocaleLowerCase("vi")
                            .replace("a few seconds ago", "vừa xong")
                            .replace("minutes ago", "phút")
                            .replace("a minute ago", "1 phút")
                            .replace("hours ago", "giờ")
                            .replace("hour ago", "giờ")
                            .replace("days ago", "ngày")
                            .replace("day ago", "ngày")}
                    </p>
                    <p className="text-sm cursor-pointer hover:underline">
                        Trả lời
                    </p>
                    <FontAwesomeIcon
                        icon={faHeart}
                        className="cursor-pointer"
                    />
                    <Dropdown
                        menu={{ items: owner ? itemsThisUser : itemsOtherUser }}
                        placement="bottomRight"
                        trigger={["click"]}
                    >
                        <FontAwesomeIcon
                            icon={faEllipsis}
                            className="cursor-pointer"
                        />
                    </Dropdown>
                </div>
            </div>
        </div>
    );
};

export default CommentItem;
