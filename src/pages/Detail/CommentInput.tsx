import { faHeart, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar } from "antd";
import React, { useState } from "react";
import { makeLink } from "../../utils/makeLink";
import useDevice from "../../hooks/useDevice";
import TextArea from "antd/es/input/TextArea";

type Props = {
    sendComment: any;
    countComment: number;
    anh_dai_dien: string;
};

const CommentInput = (props: Props) => {
    const { sendComment, countComment, anh_dai_dien } = props;
    const [comment, setComment] = useState<string>("");
    const { isMobile } = useDevice();

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSendComment();
        }
    };

    const handleSendComment = () => {
        sendComment(comment);
        setComment("");
    };

    return (
        <>
            {!isMobile && (
                <div className="flex-items-center justify-between">
                    <p className="font-semibold text-xl">
                        {countComment || 0} Nhận xét
                    </p>
                    <FontAwesomeIcon icon={faHeart} />
                </div>
            )}
            <div className="flex-items-center space-x-5">
                <Avatar src={makeLink(anh_dai_dien)} className="w-11 h-11" />
                <TextArea
                    placeholder="Thêm nhận xét"
                    className="bg-gray-200 flex-1 px-5 py-3 rounded-full"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    onKeyPress={handleKeyPress}
                    autoSize={{ minRows: 1, maxRows: 3 }}
                />
                {comment && (
                    <FontAwesomeIcon
                        icon={faPaperPlane}
                        size="lg"
                        onClick={handleSendComment}
                    />
                )}
            </div>
        </>
    );
};

export default CommentInput;
