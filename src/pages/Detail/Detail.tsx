import { Avatar, Dropdown, MenuProps, message } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { messageTryAgain } from "../../utils/messageTryAgain";
import { makeLink } from "../../utils/makeLink";
import { commentServ, imageServ } from "../../api/api";
import { IHinh_anh, IHinh_anh_Luu_hinh } from "../../types/Image.type";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowUpFromBracket,
    faChevronDown,
    faEllipsis,
    faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons/faHeart";
import { random } from "lodash";
import { useAppSelector } from "../../hooks/useRedux";
import { I_BinhLuan } from "../../types/Comment.type";
import CommentItem from "./CommentItem";
import CommentInput from "./CommentInput";
import useFormPopup from "../../hooks/useFormPopup";

type Props = {};

const Detail = (props: Props) => {
    const params = useParams();
    const hinh_id = parseInt(params.hinh_id);
    const navigate = useNavigate();
    const [img, setImg] = useState<IHinh_anh>(null);
    const [commentList, setCommentList] = useState<I_BinhLuan[]>(null);
    const user = useAppSelector((s) => s.userSlice.userInfo);
    const { openFormLogin } = useFormPopup();

    useEffect(() => {
        if (!hinh_id) {
            messageTryAgain();
            navigate("/");
        }

        imageServ
            .getDetailById(hinh_id)
            .then((res) => {
                const image = res.data.content;
                if (!image) {
                    message.error("Hình ảnh không tồn tại");
                    navigate("/");
                }
                setImg(res.data.content);
            })
            .catch((err) => {
                console.log(err);
            });

        fetchCommentList();
    }, [params]);

    const fetchCommentList = () => {
        commentServ
            .getAllByImgId(hinh_id)
            .then((res) => {
                const list = res.data.content.sort(
                    (a, b) =>
                        new Date(b.ngay_binh_luan).getTime() -
                        new Date(a.ngay_binh_luan).getTime()
                );
                setCommentList(list);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const sendComment = (comment) => {
        commentServ
            .post(hinh_id, comment)
            .then((res) => {
                console.log(res.data.content);
                fetchCommentList();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const deleleComment = (binh_luan_id: number) => {
        commentServ
            .delete(binh_luan_id)
            .then((res) => {
                console.log(res.data.content);
                fetchCommentList();
            })
            .catch((err) => {
                console.log(err);
                messageTryAgain();
            });
    };

    const items: MenuProps["items"] = [
        {
            key: "1",
            label: (
                <p
                    onClick={() => {
                        imageServ
                            .deleteById(hinh_id)
                            .then((res) => {
                                message.success("Đã xóa hình ảnh");
                                navigate(-1);
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    }}
                >
                    Xóa ảnh
                </p>
            ),
        },
    ];

    return (
        <div className="flex flex-col sm:flex-row mx-auto w-full max-w-[1016px] h-fit shadow-2xl">
            <div className="w-full sm:w-1/2 sm:rounded-s-3xl overflow-hidden ">
                <img
                    src={makeLink(img?.duong_dan)}
                    alt=""
                    className="w-full object-cover"
                />
            </div>

            <div className="w-full sm:w-1/2 h-screen sticky top-16 flex flex-col">
                <div className="flex items-center justify-between w-full sticky top-0 z-10 bg-white p-5">
                    <div className="flex-items-center space-x-2">
                        <FontAwesomeIcon
                            icon={faArrowUpFromBracket}
                            className="bg-white rounded-full p-2 cursor-pointer"
                        />
                        {user?.nguoi_dung_id === img?.nguoi_dung_id && (
                            <Dropdown menu={{ items }}>
                                <FontAwesomeIcon
                                    icon={faEllipsis}
                                    className="bg-white rounded-full p-2 cursor-pointer"
                                />
                            </Dropdown>
                        )}
                    </div>
                    <div className="flex-items-center space-x-2">
                        <div className="flex-items-center space-x-2">
                            <p>Hồ sơ</p>
                            <FontAwesomeIcon icon={faChevronDown} />
                        </div>
                        <button
                            className="text-white font-semibold bg-red-500 rounded-3xl px-5 py-3"
                            // onClick={() => {
                            //     handleSaveToGallery(img.hinh_id, true);
                            // }}
                        >
                            Lưu
                        </button>
                    </div>
                </div>
                {/* author */}
                <div className="flex-items-center justify-between p-5">
                    <div className="flex-items-center space-x-2">
                        <Avatar
                            src={makeLink(img?.nguoi_dung.anh_dai_dien)}
                            size={"large"}
                        />
                        <div className="flex flex-col">
                            <p className="font-semibold">
                                {img?.nguoi_dung.ho_ten}
                            </p>
                            <p className="font-thin">
                                {random(1, 999, false)} người theo dõi
                            </p>
                        </div>
                    </div>
                    <button className="text-black font-semibold bg-gray-100 hover:bg-gray-200 rounded-3xl px-5 py-3">
                        {img?.nguoi_dung_id === user?.nguoi_dung_id
                            ? "Chính là bạn"
                            : "Theo dõi"}
                    </button>
                </div>

                {/* PREVIOUS COMMENT */}
                <div className="flex-1 px-5 overflow-y-scroll mb-20 space-y-3">
                    {commentList?.map((cmt: I_BinhLuan) => {
                        return (
                            <CommentItem
                                key={cmt.binh_luan_id}
                                cmt={cmt}
                                deleleComment={deleleComment}
                            />
                        );
                    })}
                </div>
                {/* INPUT COMMENT */}
                <div className="sticky bottom-0 w-full z-10 p-5 space-y-5 sm:rounded-br-3xl border-t-[1px] border-gray-200 bg-white">
                    {user ? (
                        <CommentInput
                            sendComment={sendComment}
                            countComment={commentList?.length}
                            anh_dai_dien={user.anh_dai_dien}
                        />
                    ) : (
                        <button
                            className="font-semibold w-full rounded-3xl py-2 px-3 bg-white border-[1px]"
                            onClick={openFormLogin}
                        >
                            <span className="flex-items-center justify-between">
                                <p className="flex-1 text-center">
                                    Đăng nhập để bình luận
                                </p>
                            </span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Detail;
