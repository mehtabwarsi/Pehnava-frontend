import { Routes, Route } from "react-router-dom";
import MainLayout from "./MainLayout";
import ProductPage from "../pages/Product/ProductPage";
import CollectionPage from "../pages/Collection/CollectionPage";
import AboutPage from "../pages/About/AboutPage";
import ProfilePage from "../pages/Profile/ProfilePage";
import CartPage from "../pages/Cart/CartPage";
import HomePage from "../pages/Home/HomePage";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="product" element={<ProductPage />} />
                <Route path="collection" element={<CollectionPage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="cart" element={<CartPage />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
