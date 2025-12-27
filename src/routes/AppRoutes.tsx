import { Routes, Route } from "react-router-dom";
import MainLayout from "./MainLayout";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
            </Route>
        </Routes>
    );
};

export default AppRoutes;
