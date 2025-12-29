import { Routes, Route } from "react-router-dom";
import MainLayout from "./MainLayout";
import ShopPage from "../pages/Shop/ShopPage";
import CollectionPage from "../pages/Collection/CollectionPage";
import AboutPage from "../pages/About/AboutPage";
import ProfilePage from "../pages/Profile/ProfilePage";
import CartPage from "../pages/Cart/CartPage";
import HomePage from "../pages/Home/HomePage";
import LoginPage from "../pages/Auth/LoginPage";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="shop" element={<ShopPage />} />
                <Route path="collections" element={<CollectionPage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="cart" element={<CartPage />} />
            </Route>
            <Route path="login" element={<LoginPage />} />
        </Routes>
    );
};

export default AppRoutes;
