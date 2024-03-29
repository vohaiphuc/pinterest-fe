import React from "react";
import useFormPopup from "../../hooks/useFormPopup";
import { Divider, Form, Input, message } from "antd";
import Logo from "../Header/Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { authServ } from "../../api/api";
import { userLocalServ } from "../../api/localService";
import { useAppDispatch } from "../../hooks/useRedux";
import { setUserInfo } from "../../redux/userSlice";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
};

type FieldType = {
    email: string;
    mat_khau: string;
};

const LoginForm: React.FC = () => {
    const { openFormRegister, closeForm } = useFormPopup();
    const dispatch = useAppDispatch();
    const onFinish = (values: any) => {
        console.log("Success:", values);
        authServ
            .login(values)
            .then((res) => {
                message.success("Đăng nhập thành công");
                userLocalServ.set(res.data.content);
                location.reload();
            })
            .catch((err) => {
                console.log(err);
                if (err.response.data.message === "Mật khẩu không đúng") {
                    message.error(err.response.data.message);
                } else {
                    message.error("Có lỗi xảy ra, vui lòng thử lại!");
                }
            });
    };
    return (
        <div className="space-y-3">
            <div className="flex-center-all flex-col">
                <Logo />
                <h1 className="text-xl sm:text-3xl font-semibold text-center">
                    Chào mừng bạn đến với Pinterest
                </h1>
            </div>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                initialValues={{}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout="vertical"
                className="w-full bg-white sm:px-10"
                requiredMark={false}
            >
                <Form.Item<FieldType>
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message:
                                "Bạn đã bỏ lỡ điều gì đó! Đừng quên thêm địa chỉ email của bạn.",
                        },
                    ]}
                    className="mb-2"
                >
                    <Input placeholder="Email" />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Mật khẩu"
                    name="mat_khau"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng điền mật khẩu!",
                        },
                    ]}
                    className="mb-2"
                >
                    <Input.Password placeholder="Mật khẩu" />
                </Form.Item>
                <p className="font-semibold mb-5 hover:underline cursor-pointer w-fit">
                    Quên mật khẩu?
                </p>

                <Form.Item className="mb-0 mx-auto w-full">
                    <button
                        className="bg-red-600 hover:bg-red-700 text-white font-bold w-full rounded-3xl py-2"
                        type="submit"
                    >
                        Đăng nhập
                    </button>
                </Form.Item>
                <p className="font-bold text-center my-2">HOẶC</p>
                <button
                    className="text-white font-bold w-full rounded-3xl py-2 px-3 mb-3 bg-[#1877f2]"
                    type="submit"
                >
                    <span className="flex-items-center justify-between">
                        <FontAwesomeIcon icon={faFacebook} size="xl" />
                        <p className="flex-1 text-center">
                            Tiếp tục với Facebook
                        </p>
                    </span>
                </button>
                {/* <button
                    className="font-semibold w-full rounded-3xl py-2 px-3 bg-white border-[1px]"
                    type="submit"
                >
                    <span className="flex-items-center justify-between">
                        <FontAwesomeIcon icon={faGoogle} size="xl" />
                        <p className="flex-1 text-center">
                            Tiếp tục truy cập Google
                        </p>
                    </span>
                </button> */}
            </Form>

            <div className="text-center text-xs">
                Bằng cách tiếp tục, bạn đồng ý với
                <br></br>
                <b className="fake-link">Điều khoản dịch vụ</b> của Pinterest và
                xác nhận rằng
                <br></br>
                bạn đã đọc{" "}
                <b className="fake-link">Chính sách quyền riêng tư</b> của chúng
                tôi.
                <br></br>
                <b className="fake-link">Thông báo khi thu thập</b>
                <Divider className="my-3" />
                <p
                    className="font-bold mb-2 fake-link"
                    onClick={openFormRegister}
                >
                    Chưa tham gia Pinterest? Đăng ký
                </p>
                Bạn là doanh nghiệp?{" "}
                <span className="font-semibold fake-link">
                    Hãy bắt đầu tại đây!
                </span>
            </div>
        </div>
    );
};

export default LoginForm;
