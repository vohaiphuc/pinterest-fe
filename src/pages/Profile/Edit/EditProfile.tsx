import { useRef } from "react";
import FooterEditProfile from "./FooterEditProfile";
import FormEditProfile, { FormRef } from "./FormEditProfile";

const EditProfile = () => {
    const formRef = useRef<FormRef>(null);
    const handleSubmit = () => {
        formRef.current?.submit();
    };
    const handleReset = () => {
        formRef.current?.reset();
    };

    return (
        <div className="max-w-xl mx-auto space-y-3 mb-20">
            <h1 className="font-semibold text-3xl">Chỉnh sửa hồ sơ</h1>
            <p>
                Hãy giữ riêng tư thông tin cá nhân của bạn. Thông tin bạn thêm
                vào đây hiển thị cho bất kỳ ai có thể xem hồ sơ của bạn.
            </p>
            <FormEditProfile ref={formRef} />
            <FooterEditProfile
                handleSubmit={handleSubmit}
                handleReset={handleReset}
            />
        </div>
    );
};

export default EditProfile;
