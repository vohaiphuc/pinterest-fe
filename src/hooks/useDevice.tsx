import { useWindowWidth } from "@react-hook/window-size";

interface IDeviceType {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
}

const useDevice = (): IDeviceType => {
    const width: number = useWindowWidth();

    return {
        isMobile: width <= 640,
        isTablet: 640 < width && width <= 1080,
        isDesktop: width > 1080,
    };
};

export default useDevice;
