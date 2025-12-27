import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const MainLayout = () => {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-pehnava-ivory">
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default MainLayout;
