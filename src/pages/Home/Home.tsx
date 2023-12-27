import React from "react";
import { srcList } from "./assets/Dummy";
import Image from "./Image";
import { useWindowWidth } from "@react-hook/window-size";

const imgWidth: number = 235;
const Home: React.FC = () => {
    const width: number = useWindowWidth();
    const columns: number = Math.floor(width / imgWidth);
    let gap: number =
        columns == 1 ? 0 : width - (columns * imgWidth) / (columns - 1);
    if (gap > 3) gap = 3;

    const renderImgList = () => {
        return srcList.map((src) => <Image src={src} key={src} />);
    };

    return (
        <div
            className="mx-auto gap-3 space-y-3 w-fit"
            style={{
                columnCount: columns,
            }}
        >
            {renderImgList()}
        </div>
    );
};

export default Home;
