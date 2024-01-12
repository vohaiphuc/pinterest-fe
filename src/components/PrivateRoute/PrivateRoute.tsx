import React, { ReactNode, useEffect } from "react";
import { useAppSelector } from "../../hooks/useRedux";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import useFormPopup from "../../hooks/useFormPopup";

type Props = {
    children: ReactNode;
};

const PrivateRoute: React.FC<Props> = ({ children }) => {
    const userInfo = useAppSelector((s) => s.userSlice.userInfo);
    const navigate = useNavigate();
    const { openFormLogin } = useFormPopup();
    useEffect(() => {
        if (!userInfo) {
            // message.error("Vui lòng đăng nhập");
            navigate("/");
            openFormLogin();
        }
    }, [userInfo]);

    return userInfo && <>{children}</>;
};

export default PrivateRoute;
