import React, { useRef, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import "./assets/style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import FormUpload from "./FromUpload";

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
        message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
};

const UploadPage: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();
    const refButton = useRef<HTMLButtonElement>(null);

    const handleChange: UploadProps["onChange"] = (
        info: UploadChangeParam<UploadFile>
    ) => {
        if (info.file.status === "uploading") {
            setLoading(true);
            return;
        }
        if (info.file.status === "done") {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj as RcFile, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
        }
    };

    const uploadButton = (
        <div>
            <div className="bg-black text-white rounded-full p-2 w-10 h-10 flex-center-all mx-auto">
                {loading ? (
                    <LoadingOutlined />
                ) : (
                    <FontAwesomeIcon icon={faArrowUpFromBracket} />
                )}
            </div>
            <div style={{ marginTop: 8 }}>
                Chọn một tệp hoặc kéo thả tệp ở đây
            </div>
        </div>
    );

    const handleUpload = () => {
        refButton.current && refButton.current.click();
    };

    return (
        <div className="max-w-5xl mx-auto upload-page">
            <div className="h-16 border-b-[1px] flex-items-center justify-between mb-3">
                <h2 className="text-2xl font-semibold">Tạo Ghim</h2>
                {!imageUrl && (
                    <button
                        className="text-white font-semibold bg-red-500 rounded-3xl px-5 py-3"
                        onClick={handleUpload}
                    >
                        Đăng
                    </button>
                )}
            </div>
            <div className="flex flex-col md:flex-row">
                <div className="mx-auto md:mx-0">
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                    >
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt="avatar"
                                style={{ width: "100%" }}
                            />
                        ) : (
                            uploadButton
                        )}
                        <p className="absolute z-30 bottom-0 left-0 text-black p-3 w-full">
                            Bạn nên sử dụng tập tin .jpg chất lượng cao có kích
                            thước dưới 20MB hoặc tập tin .mp4 chất lượng cao có
                            kích thước dưới 200MB.
                        </p>
                    </Upload>
                </div>
                <div className="flex-1 mx-auto w-96 md:mx-0 md:w-full">
                    <FormUpload ref={refButton} />
                </div>
            </div>
        </div>
    );
};

export default UploadPage;
