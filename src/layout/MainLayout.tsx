import * as React from "react";
import Header from "../components/Header/Header";

interface IMainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<IMainLayoutProps> = ({ children }) => {
    return (
        <div className="mx-3">
            <Header />
            {children}
        </div>
    );
};

export default MainLayout;
