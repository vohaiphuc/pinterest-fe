import React, { useRef, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import "./assets/style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import FormUpload from "./FormUpload";
import { BASE_URL } from "../../api/config";
import { imageServ } from "../../api/api";

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
};

const UploadPage: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();
    const refButton = useRef<HTMLButtonElement>(null);
    const [fileList, setFileList] = useState<any>([]);

    const handleChange: UploadProps["onChange"] = (
        info: UploadChangeParam<UploadFile>
    ) => {
        getBase64(info.file.originFileObj as RcFile, (url) => {
            setImageUrl(url);
        });
        console.log({ fileList });

        if (info.file.status === "uploading") {
            setLoading(true);
            return;
        } else {
            setLoading(false);
            return;
        }
    };

    const uploadButton = (
        <div className="upload-btn">
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

    const beforeUpload = (file: RcFile) => {
        const isJpgOrPng =
            file.type === "image/jpeg" || file.type === "image/png";
        if (!isJpgOrPng) {
            message.error(
                "Vui lòng chỉ đăng hình ảnh có định dạng png hoặc jpeg!"
            );
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error(
                "Vui lòng chỉ đăng hình ảnh có dung lượng tối đa 2MB!"
            );
        }
        setFileList([...fileList, file]);
        return isJpgOrPng && isLt2M;
    };

    return (
        <div className="max-w-5xl mx-auto upload-page">
            <div className="h-16 border-b-[1px] flex-items-center justify-between mb-3">
                <h2 className="text-2xl font-semibold">Tạo Ghim</h2>
                {imageUrl && (
                    <button
                        className="text-white font-semibold bg-red-500 rounded-3xl px-5 py-3"
                        onClick={handleUpload}
                    >
                        Đăng
                    </button>
                )}
            </div>
            <div className="flex flex-col md:flex-row space-x-0 sm:space-x-2">
                <div className="mx-auto md:mx-0 w-full max-w-[374px] sm:w-[374px]">
                    <Upload
                        name="file"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        // action=""
                        // action="//jsonplaceholder.typicode.com/posts/"
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                        fileList={fileList}
                    >
                        {imageUrl ? (
                            <img
                                className="upload-img relative z-40"
                                src={imageUrl}
                                alt="avatar"
                            />
                        ) : (
                            uploadButton
                        )}
                        <p className="absolute z-30 bottom-0 left-0 text-black p-3 w-full upload-limit-warning">
                            Bạn nên sử dụng tập tin .jpg chất lượng cao có kích
                            thước dưới 20MB hoặc tập tin .mp4 chất lượng cao có
                            kích thước dưới 200MB.
                        </p>
                    </Upload>
                </div>
                <div className="flex-1 mx-auto w-96 max-w-full md:mx-0 md:w-full">
                    <FormUpload ref={refButton} file={fileList?.[0]} />
                </div>
            </div>
        </div>
    );
};

export default UploadPage;
