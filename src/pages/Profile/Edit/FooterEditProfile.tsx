import { useAppSelector } from "../../../hooks/useRedux";

type Props = {
    handleSubmit: () => void;
    handleReset: () => void;
};

const FooterEditProfile = ({ handleSubmit, handleReset }: Props) => {
    const { isChanged } = useAppSelector((s) => s.formEditProfile);

    const btnDesign: string = "font-semibold rounded-3xl px-5 py-3 ";
    const defaultBtnColor: string = "text-neutral-500 bg-neutral-200";
    const resetBtnColor: string = isChanged
        ? "text-black bg-neutral-200 hover:bg-neutral-300"
        : defaultBtnColor;

    const saveBtnColor: string = isChanged
        ? "text-white bg-red-600 hover:bg-red-700"
        : defaultBtnColor;

    const handleOnclick = () => {
        if (isChanged) {
            handleSubmit();
        }
    };

    return (
        <div
            className="fixed bottom-0 left-0 w-full flex-center-all py-3 bg-white space-x-3"
            style={{
                boxShadow: "rgba(0, 0, 0, 0.15) 0px -1px 10px 0px",
            }}
        >
            <button
                className={`${btnDesign} ${resetBtnColor}`}
                onClick={handleReset}
            >
                Thiết lập lại
            </button>
            <button
                className={`${btnDesign} ${saveBtnColor}`}
                onClick={handleOnclick}
            >
                Lưu
            </button>
        </div>
    );
};

export default FooterEditProfile;
