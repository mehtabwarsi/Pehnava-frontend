import { Routes, Route } from "react-router-dom";
import MainLayout from "./MainLayout";
import ShopPage from "../pages/Shop/ShopPage";
import CollectionPage from "../pages/Collection/CollectionPage";
import AboutPage from "../pages/About/AboutPage";
import ProfilePage from "../pages/Profile/ProfilePage";
import CartPage from "../pages/Cart/CartPage";
import HomePage from "../pages/Home/HomePage";
import LoginPage from "../pages/Auth/LoginPage";
import ProtectedRoute from "../utils/ProtectedRoute";
import ProductDetailsPage from "../pages/Product/ProductDetailsPage";
import ScrollToTop from "../utils/ScrollToTop";
import OtpVerifyPage from "../pages/Auth/OtpVerifyPage";
import AddressPage from "../pages/Profile/address/AddressPage";
import AddAddressPage from "../pages/Profile/address/AddAddressPage";
import EditAddressPage from "../pages/Profile/address/EditAddressPage";
import WishListPage from "../pages/Profile/WishList/WishListPage";
import AddressSelectionPage from "../pages/Cart/AddressSelectionPage";
import PaymentPage from "../pages/Cart/PaymentPage";
import MyOrdersPage from "../pages/Profile/MyOrders/MyOrdersPage";
import MyOrderDetailsPage from "../pages/Profile/MyOrders/MyOrdersDetailPage";

const AppRoutes = () => {
    return (
        <>
            <ScrollToTop />
            <Routes>
                {/* PUBLIC LAYOUT */}
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="shop" element={<ShopPage />} />
                    <Route path="collections" element={<CollectionPage />} />
                    <Route path="about" element={<AboutPage />} />
                    <Route path="product/:id" element={<ProductDetailsPage />} />

                    {/* 🔒 PROTECTED ROUTES */}
                    <Route
                        path="profile"
                        element={
                            <ProtectedRoute>
                                <ProfilePage />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="wishlist"
                        element={
                            <ProtectedRoute>
                                <WishListPage />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="cart"
                        element={
                            <ProtectedRoute>
                                <CartPage />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="checkout/address"
                        element={
                            <ProtectedRoute>
                                <AddressSelectionPage />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="checkout/payment"
                        element={
                            <ProtectedRoute>
                                <PaymentPage />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="profile/address"
                        element={
                            <ProtectedRoute>
                                <AddressPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="profile/address/add"
                        element={
                            <ProtectedRoute>
                                <AddAddressPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="profile/address/edit/:id"
                        element={
                            <ProtectedRoute>
                                <EditAddressPage />
                            </ProtectedRoute>
                        }
                    />
                </Route>

                <Route
                    path="profile/my-orders"
                    element={
                        <ProtectedRoute>
                            <MyOrdersPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="profile/my-orders/:orderId"
                    element={
                        <ProtectedRoute>
                            <MyOrderDetailsPage />
                        </ProtectedRoute>
                    }
                />

                {/* AUTH */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/otp-verify" element={<OtpVerifyPage />} />
            </Routes>
        </>
    );
};

export default AppRoutes;
