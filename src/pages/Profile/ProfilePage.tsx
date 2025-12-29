import { User, Package, Heart, MapPin, Settings, LogOut } from "lucide-react";

const ProfilePage = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">

            {/* Header */}
            <div className="mb-10 sm:mb-12">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-medium text-pehnava-charcoal">
                    My Account
                </h1>
                <p className="mt-2 text-sm sm:text-base text-pehnava-slate">
                    Manage your profile, orders and account settings
                </p>
            </div>

            {/* Profile Card */}
            <div className="
        bg-white rounded-2xl shadow-soft
        p-5 sm:p-8 mb-10 sm:mb-12
        flex flex-col sm:flex-row
        items-center sm:items-start
        gap-5 sm:gap-6
        text-center sm:text-left
      ">
                <div className="h-20 w-20 rounded-full bg-pehnava-lightGray flex items-center justify-center text-pehnava-charcoal">
                    <User className="w-8 h-8" />
                </div>

                <div className="flex-1">
                    <h2 className="text-base sm:text-lg md:text-xl font-medium text-pehnava-charcoal">
                        Mehtab Ansari
                    </h2>
                    <p className="text-sm text-pehnava-slate">
                        mehtab@email.com
                    </p>
                </div>

                <button className="
          px-5 py-2
          text-sm font-medium
          rounded-full
          border border-pehnava-border
          hover:bg-pehnava-lightGray
          transition
        ">
                    Edit Profile
                </button>
            </div>

            {/* Account Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-10 sm:mb-12">

                <ActionCard
                    icon={<Package className="w-5 h-5" />}
                    title="My Orders"
                    desc="Track and view your orders"
                />

                <ActionCard
                    icon={<Heart className="w-5 h-5" />}
                    title="Wishlist"
                    desc="Products you have saved"
                />

                <ActionCard
                    icon={<MapPin className="w-5 h-5" />}
                    title="Addresses"
                    desc="Manage delivery addresses"
                />

                <ActionCard
                    icon={<Settings className="w-5 h-5" />}
                    title="Account Settings"
                    desc="Password and account preferences"
                />
            </div>

            {/* Logout */}
            <div className="text-center">
                <button className="inline-flex items-center gap-2 text-sm font-medium text-red-500 hover:underline">
                    <LogOut className="w-4 h-4" />
                    Logout
                </button>
            </div>

        </div>
    );
};

export default ProfilePage;

/* ---------------------------------- */
/* Reusable Action Card Component     */
/* ---------------------------------- */

type ActionCardProps = {
    icon: React.ReactNode;
    title: string;
    desc: string;
};

const ActionCard = ({ icon, title, desc }: ActionCardProps) => {
    return (
        <div className="
      bg-white rounded-xl shadow-soft
      p-5 sm:p-6
      flex items-start gap-4
      hover:shadow-medium transition
      cursor-pointer
    ">
            <div className="h-10 w-10 shrink-0 rounded-lg bg-pehnava-lightGray flex items-center justify-center text-pehnava-charcoal">
                {icon}
            </div>

            <div>
                <h3 className="text-sm sm:text-base font-medium text-pehnava-charcoal">
                    {title}
                </h3>
                <p className="text-xs sm:text-sm text-pehnava-slate mt-1">
                    {desc}
                </p>
            </div>
        </div>
    );
};
