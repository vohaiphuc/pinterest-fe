import * as React from "react";
import Header from "../components/Header/Header";
import useDevice from "../hooks/useDevice";
import StickyMenu from "../components/StickyMenu/StickyMenu";

interface IMainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<IMainLayoutProps> = ({ children }) => {
    const { isMobile } = useDevice();
    return (
        <div>
            {isMobile ? <StickyMenu /> : <Header />}
            <div className={`mx-3 relative ${isMobile ? "mt-3 mb-24" : ""}`}>
                {children}
            </div>
        </div>
    );
};

export default MainLayout;
