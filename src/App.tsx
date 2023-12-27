import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import UploadPage from "./pages/Upload/Upload";
import EditProfile from "./pages/Profile/Edit/EditProfile";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <MainLayout>
                            <Home />
                        </MainLayout>
                    }
                />
                <Route
                    path="/upload"
                    element={
                        <MainLayout>
                            <UploadPage />
                        </MainLayout>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <MainLayout>
                            <Profile />
                        </MainLayout>
                    }
                />
                <Route
                    path="/profile/edit"
                    element={
                        <MainLayout>
                            <EditProfile />
                        </MainLayout>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
