import type { JSX } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { user, loading } = useSelector((state: any) => state.auth);

    // ⏳ Firebase + backend check chal raha hai
    if (loading) return null; // ya spinner

    // ❌ Not logged in
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // ✅ Logged in
    return children;
};

export default ProtectedRoute;