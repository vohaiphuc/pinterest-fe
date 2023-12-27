import { useAppDispatch } from "./useRedux";
import { setFormPopup } from "../redux/formPopupSlice";

export const FormName = {
    LOGIN: "LOGIN",
    REGISTER: "REGISTER",
};

const useFormPopup = () => {
    const dispatch = useAppDispatch();
    const setForm = (name: string) => dispatch(setFormPopup(name));

    return {
        openFormLogin: () => setForm(FormName.LOGIN),
        openFormRegister: () => setForm(FormName.REGISTER),
        closeForm: () => setForm(""),
    };
};

export default useFormPopup;
