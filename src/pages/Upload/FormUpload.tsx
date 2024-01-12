import React, { ForwardedRef, forwardRef } from "react";
import { ConfigProvider, Form, Input, UploadFile, message } from "antd";
import { imageServ } from "../../api/api";
import { messageTryAgain } from "../../utils/messageTryAgain";

const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
};

type FieldType = {
    imageName: string;
    description?: string;
};

interface IPropsType {
    file: UploadFile<any> | undefined;
}

interface IFormUploadProps {
    ref: ForwardedRef<HTMLButtonElement>;
    file: any;
}

const FormUpload: React.FC<IFormUploadProps> = forwardRef((props, ref) => {
    const { file } = props;
    const onFinish = (values: any) => {
        console.log("Success:", values);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("ten_hinh", values.imageName);
        formData.append("mo_ta", values.description);
        imageServ
            .postUpload(formData)
            .then((res) => {
                console.log(res.data.content);
                message.success("Đăng hình ảnh thành công");
                setTimeout(() => {
                    location.reload();
                }, 3000);
            })
            .catch((err) => {
                console.log(err);
                messageTryAgain();
            });
    };
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#656565",
                },
            }}
        >
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout="vertical"
            >
                <Form.Item<FieldType>
                    label="Tiêu đề"
                    name="imageName"
                    rules={[{ required: true, message: "Vui lòng điền!" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType> label="Mô tả" name="description">
                    <Input.TextArea autoSize={{ minRows: 3, maxRows: 6 }} />
                </Form.Item>

                <button
                    ref={ref}
                    type="submit"
                    className="hidden text-white font-semibold bg-red-500 rounded-3xl px-5 py-3"
                >
                    Đăng
                </button>
            </Form>
        </ConfigProvider>
    );
});

export default FormUpload;
