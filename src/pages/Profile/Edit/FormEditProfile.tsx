import React, { Ref, forwardRef, useImperativeHandle, useState } from "react";
import { ConfigProvider, Form, Input } from "antd";
import "../assets/style.scss";
import { useAppDispatch } from "../../../hooks/useRedux";
import { setFormEditUserChange } from "../../../redux/formEditProfileSlice";
import { isEqual } from "lodash";

const onFinish = (values: any) => {
    console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
};

type FieldType = {
    firstName: string;
    lastName: string;
    intro: string;
    website: string;
    username: string;
};

const initialValues: FieldType = {
    firstName: "string",
    lastName: "string",
    intro: "string",
    website: "string",
    username: "string",
};

export type FormRef = {
    submit: () => void;
    reset: () => void;
};

interface IFormEditProfileProps {
    ref: Ref<FormRef>;
}

const FormEditProfile: React.FC<IFormEditProfileProps> = forwardRef(
    (_, ref) => {
        const dispatch = useAppDispatch();
        const [form] = Form.useForm();

        const defaultProfileLink = "www.pinterest.com/";
        const [profileLink, setProfileLink] =
            useState<string>(defaultProfileLink);

        const submit = () => {
            form.validateFields()
                .then((res) => {
                    onFinish(res);
                })
                .catch((err) => {
                    onFinishFailed(err);
                });
        };

        const reset = () => {
            form.resetFields(Object.keys(initialValues));
            dispatch(setFormEditUserChange(false));
        };

        useImperativeHandle(ref, () => ({ submit, reset }));

        const handleInputChange = (_: FieldType, currentValues: FieldType) => {
            const isChanged = !isEqual(initialValues, currentValues);
            dispatch(setFormEditUserChange(isChanged));
        };

        return (
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: "#656565",
                    },
                    components: {
                        Form: {
                            itemMarginBottom: 18,
                            labelFontSize: 13,
                        },
                    },
                }}
            >
                <Form
                    name="basic"
                    initialValues={initialValues}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    form={form}
                    autoComplete="off"
                    layout="vertical"
                    className="form-edit-profile"
                    requiredMark={false}
                    onValuesChange={handleInputChange}
                >
                    <div className="grid grid-cols-2 gap-3">
                        <Form.Item<FieldType>
                            label="Tên"
                            name="firstName"
                            rules={[
                                { required: true, message: "Vui lòng điền" },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item<FieldType>
                            label="Họ"
                            name="lastName"
                            rules={[
                                { required: true, message: "Vui lòng điền" },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </div>
                    <Form.Item<FieldType> label="Giới thiệu" name="intro">
                        <Input.TextArea autoSize={{ minRows: 3, maxRows: 3 }} />
                    </Form.Item>
                    <Form.Item<FieldType> label="Trang web" name="website">
                        <Input />
                    </Form.Item>

                    <div>
                        <Form.Item<FieldType>
                            label="Tên người dùng"
                            name="username"
                            rules={[
                                { required: true, message: "Vui lòng điền" },
                            ]}
                        >
                            <Input
                                onChange={(e) => {
                                    setProfileLink(
                                        defaultProfileLink + e.target.value
                                    );
                                }}
                            />
                        </Form.Item>
                        <p className="-mt-3 text-xs text-neutral-500">
                            {profileLink}
                        </p>
                    </div>
                </Form>
            </ConfigProvider>
        );
    }
);

export default FormEditProfile;
