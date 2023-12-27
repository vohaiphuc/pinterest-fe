import React, { ReactNode, useEffect, useRef } from "react";
import { useAppSelector } from "../../hooks/useRedux";
import useFormPopup, { FormName } from "../../hooks/useFormPopup";
import LoginForm from "../Login/LoginForm";
import "./assets/style.scss";
import RegisterForm from "../Register/RegisterForm";

type Props = {
    // children: ReactNode;
};

const Popup: React.FC<Props> = () => {
    const { formName } = useAppSelector((s) => s.formPopupSlice);
    const { closeForm } = useFormPopup();
    const renderPopupForm = () => {
        let form: ReactNode;
        switch (formName) {
            case FormName.LOGIN:
                form = <LoginForm />;
                break;
            case FormName.REGISTER:
                form = <RegisterForm />;
                break;
            default:
                break;
        }
        return form;
    };

    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!formName) return;
        const handleCloseForm = (e: MouseEvent) => {
            if (ref.current && e.target === ref.current) {
                closeForm();
            }
        };
        document.addEventListener("click", handleCloseForm);

        return () => {
            document.removeEventListener("click", handleCloseForm);
        };
    }, [formName, closeForm]);

    return (
        formName && (
            <div
                ref={ref}
                className="fixed z-50 top-0 left-0 w-full h-full flex-center-all"
                style={{
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                }}
            >
                <div className="form-login mx-auto bg-white w-full px-16 py-5 space-y-5 max-w-md rounded-3xl max-h-full">
                    {renderPopupForm()}
                </div>
            </div>
        )
    );
};

export default Popup;
