import {
    User,
    Package,
    Heart,
    MapPin,
    Settings,
    LogOut,
    Camera,
    ChevronRight,
    CreditCard,
    Bell,
    Shield
} from "lucide-react";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useGetWishList } from "../../services/useApiHook";

const ProfilePage = () => {
    const { user } = useSelector((state: any) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data: wishlist } = useGetWishList();
    const totalWishList = wishlist?.data?.total || 0;

    const handleLogout = async () => {
        try {
            await signOut(auth);
            dispatch(logout());
            navigate("/", { replace: true });
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };




    return (
        <div className="min-h-screen bg-pehnava-offWhite pt-6 pb-24 sm:pt-12 sm:pb-32 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">

                {/* 1. Profile Header - Minimal & Centered */}
                <div className="flex flex-col items-center text-center space-y-4">
                    <div className="relative group">
                        <div className="h-28 w-28 sm:h-32 sm:w-32 rounded-full border-4 border-white shadow-2xl overflow-hidden bg-gray-100">
                            <div className="h-full w-full flex items-center justify-center text-pehnava-slate/30">
                                <User className="w-12 h-12" />
                            </div>
                        </div>
                        <button className="absolute bottom-0 right-0 p-2 bg-pehnava-charcoal text-white rounded-full hover:scale-110 transition-transform shadow-lg cursor-pointer">
                            <Camera className="w-4 h-4" />
                        </button>
                    </div>

                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-pehnava-charcoal">{user?.name}</h1>
                        <p className="text-pehnava-slate font-medium mt-1">{user?.email}</p>
                    </div>

                    <button className="px-6 py-2 rounded-full border border-pehnava-border hover:border-pehnava-charcoal hover:bg-pehnava-charcoal hover:text-white transition-all text-sm font-semibold cursor-pointer">
                        Edit Profile
                    </button>
                </div>

                {/* 2. Stats Row - Quick Glances */}
                <div className="grid grid-cols-2 gap-4 bg-white rounded-2xl p-4 sm:p-6 shadow-soft border border-pehnava-border/40">
                    <div className="text-center space-y-1 border-r border-pehnava-border/40">
                        <p className="text-xl sm:text-2xl font-bold text-pehnava-charcoal">12</p>
                        <p className="text-[10px] sm:text-sm text-pehnava-slate font-medium uppercase tracking-wide">Orders</p>
                    </div>
                    <div className="text-center space-y-1">
                        <p className="text-xl sm:text-2xl font-bold text-pehnava-charcoal">{totalWishList}</p>
                        <p className="text-[10px] sm:text-sm text-pehnava-slate font-medium uppercase tracking-wide">Wishlist</p>
                    </div>
                </div>

                {/* 3. Menu List - Clean & Functional */}
                <div className="bg-white rounded-2xl shadow-soft border border-pehnava-border/40 overflow-hidden divide-y divide-pehnava-border/40">
                    <MenuItem icon={Package} title="My Orders" desc="Track active orders and returns" onClick={() => navigate('/profile/my-orders')} />
                    <MenuItem icon={Heart} title="Wishlist" desc="Your curated collection" onClick={() => navigate("/wishlist")} />
                    <MenuItem icon={MapPin} title="Addresses" desc="Manage delivery locations" onClick={() => navigate("/profile/address")} />
                    <MenuItem icon={CreditCard} title="Payment Methods" desc="Manage cards and UPI" />
                    <MenuItem icon={Bell} title="Notifications" desc="Order updates and promotions" />
                    <MenuItem icon={Shield} title="Privacy & Security" desc="Password and account access" />
                    <MenuItem icon={Settings} title="Settings" desc="App preferences" />
                </div>

                {/* 4. Logout Button */}
                <button onClick={handleLogout} className="w-full py-4 rounded-2xl bg-white border border-red-100 text-red-500 font-bold hover:bg-red-50 transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer active:scale-[0.98]">
                    <LogOut className="w-5 h-5" />
                    Sign Out
                </button>

            </div>
        </div>
    );
};

export default ProfilePage;

/* ------------------ */
/* Reusable Menu Item */
/* ------------------ */

type MenuItemProps = {
    icon: React.ElementType;
    title: string;
    desc: string;
    onClick?: () => void;
};

const MenuItem = ({ icon: Icon, title, desc, onClick }: MenuItemProps) => (
    <div
        onClick={onClick}
        className="group flex items-center gap-4 p-4 sm:p-5 hover:bg-pehnava-offWhite/50 transition-colors cursor-pointer"
    >
        <div className="h-10 w-10 rounded-full bg-pehnava-lightGray/50 flex items-center justify-center text-pehnava-charcoal group-hover:bg-pehnava-charcoal group-hover:text-white transition-colors shrink-0">
            <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-pehnava-charcoal text-sm sm:text-base truncate">{title}</h3>
            <p className="text-xs text-pehnava-slate hidden sm:block truncate">{desc}</p>
        </div>
        <ChevronRight className="w-5 h-5 text-pehnava-border group-hover:text-pehnava-charcoal transition-colors ml-2 shrink-0" />
    </div>
);
