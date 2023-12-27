import React, { ForwardedRef, forwardRef } from "react";
import { ConfigProvider, Form, Input } from "antd";

const onFinish = (values: any) => {
    console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
};

type FieldType = {
    imageName: string;
    description?: string;
};

interface IFormUploadProps {
    ref: ForwardedRef<HTMLButtonElement>;
}

const FormUpload: React.FC<IFormUploadProps> = forwardRef((_, ref) => (
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
));

export default FormUpload;
