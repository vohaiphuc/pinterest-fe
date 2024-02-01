import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const SearchBar = () => {
    const [params] = useSearchParams();
    const defaultKeyword = params.has("s") ? params.get("s") : "";
    const [keyword, setKeyword] = useState<string>(defaultKeyword);
    const navigate = useNavigate();
    const ref = useRef<HTMLInputElement>();
    const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        const keyboard = e.key;
        if (keyboard === "Enter" && keyword !== "") {
            navigate(`/search?s=${keyword}`);
            if (ref.current) {
                ref.current.blur();
            }
        }
    };
    useEffect(() => {
        if (!params.get("s")) {
            setKeyword("");
        }
    }, [params.get("s")]);

    const randomNumber = Math.floor(Math.random() * 10);
    let example = "";
    if (0 <= randomNumber && randomNumber <= 2) {
        example = "red";
    } else if (3 <= randomNumber && randomNumber <= 5) {
        example = "blue";
    } else if (6 <= randomNumber && randomNumber <= 9) {
        example = "art";
    }
    return (
        <div className="flex-1">
            <input
                type="text"
                placeholder={`Tìm kiếm, VD: ${example}`}
                className="bg-slate-100 rounded-3xl px-3 py-2 w-full"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={handleEnter}
                ref={ref}
            />
        </div>
    );
};

export default SearchBar;
