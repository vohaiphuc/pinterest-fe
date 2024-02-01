import { useRef, useState } from "react";

const useStateRef = (defaultValue: any) => {
    const [state, _setState] = useState(defaultValue);
    const ref = useRef(state);
    const setRef = (data: any) => {
        ref.current = data;
        _setState(data);
    };

    return [ref.current, setRef];
};

export default useStateRef;
