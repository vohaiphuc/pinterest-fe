import { message } from "antd";
import { imageServ } from "../../api/api";
import useFormPopup from "../../hooks/useFormPopup";
import { useAppSelector } from "../../hooks/useRedux";
import { messageTryAgain } from "../../utils/messageTryAgain";
import { useEffect, useState } from "react";

type Props = {
    hinh_id: number;
    // fetchImgWithSavedInfo: () => void;
    isImageSaved: boolean;
    extraClass?: string;
};

const SaveImageButton: React.FC<Props> = ({
    hinh_id,
    isImageSaved,
    extraClass,
}) => {
    const { userInfo } = useAppSelector((s) => s.userSlice);
    const { openFormLogin } = useFormPopup();
    const [isSaved, setIsSaved] = useState<boolean>(isImageSaved);

    useEffect(() => {
        setIsSaved(isImageSaved);
    }, [isImageSaved]);

    const checkImgSave = () => {
        imageServ
            .getCheckSavedById(hinh_id)
            .then((res) => {
                const save = res.data.content?.da_luu ? true : false;
                setIsSaved(save);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleSave = (hinh_id: number, save: boolean) => {
        if (!userInfo) {
            openFormLogin();
            return;
        }
        const saveServ = save
            ? imageServ.postSaveById
            : imageServ.postUnsaveById;

        saveServ(hinh_id)
            .then((res) => {
                message.success(save ? "Lưu" : "Bỏ lưu");
                checkImgSave();
            })
            .catch((err) => {
                console.log(err);
                messageTryAgain();
            });
    };

    return isSaved ? (
        <button
            className={`text-white font-semibold bg-black rounded-3xl px-5 py-3 ${extraClass}`}
            onClick={() => handleSave(hinh_id, false)}
        >
            Đã lưu
        </button>
    ) : (
        <button
            className={`text-white font-semibold bg-red-500 rounded-3xl px-5 py-3 ${extraClass}`}
            onClick={() => handleSave(hinh_id, true)}
        >
            Lưu
        </button>
    );
};

export default SaveImageButton;
