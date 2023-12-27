import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./redux/userSlice.ts";
import formEditProfile from "./redux/formEditProfileSlice.ts";
import formPopupSlice from "./redux/formPopupSlice.ts";
import Popup from "./components/Popup/Popup.tsx";

export const store = configureStore({
    reducer: {
        userSlice: userSlice,
        formEditProfile: formEditProfile,
        formPopupSlice: formPopupSlice,
    },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <App />
        <Popup />
    </Provider>
);
