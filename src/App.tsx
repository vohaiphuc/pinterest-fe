import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import UploadPage from "./pages/Upload/Upload";
import EditProfile from "./pages/Profile/Edit/EditProfile";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Detail from "./pages/Detail/Detail";

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
                        <PrivateRoute>
                            <MainLayout>
                                <UploadPage />
                            </MainLayout>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <PrivateRoute>
                            <MainLayout>
                                <Profile />
                            </MainLayout>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/profile/edit"
                    element={
                        <PrivateRoute>
                            <MainLayout>
                                <EditProfile />
                            </MainLayout>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/image"
                    element={
                        // <PrivateRoute>
                        <MainLayout>
                            <Detail />
                        </MainLayout>
                        // </PrivateRoute>
                    }
                />
                <Route
                    path="/image/:hinh_id"
                    element={
                        // <PrivateRoute>
                        <MainLayout>
                            <Detail />
                        </MainLayout>
                        // </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
