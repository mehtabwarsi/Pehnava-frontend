import { ChevronLeft, Plus, MapPin, MoreVertical, Home, Briefcase, Phone, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AddressPage = () => {
    const navigate = useNavigate();

    // Mock data for addresses
    const addresses = [
        {
            id: 1,
            type: "Home",
            name: "Rahul Sharma",
            phone: "+91 98765 43210",
            address: "H.No. 123, Sector 45, Gurgaon, Haryana - 122003",
            isDefault: true
        },
        {
            id: 2,
            type: "Office",
            name: "Rahul Sharma",
            phone: "+91 98765 43210",
            address: "Tower B, 4th Floor, DLF Cyber City, Gurgaon, Haryana - 122002",
            isDefault: false
        }
    ];

    return (
        <div className="min-h-screen bg-pehnava-offWhite pt-6 pb-24 sm:pt-12 sm:pb-32 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 hover:bg-white rounded-full transition-colors shadow-soft cursor-pointer"
                    >
                        <ChevronLeft className="w-6 h-6 text-pehnava-charcoal" />
                    </button>
                    <h1 className="text-2xl sm:text-3xl font-bold text-pehnava-charcoal">My Addresses</h1>
                </div>

                {/* Add New Address Button */}
                <button
                    onClick={() => navigate("/profile/address/add")}
                    className="w-full mb-8 p-4 bg-white border-2 border-dashed border-pehnava-border rounded-2xl flex items-center justify-center gap-2 text-pehnava-primary font-bold hover:border-pehnava-primary hover:bg-pehnava-primary/5 transition-all cursor-pointer group"
                >
                    <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>Add New Address</span>
                </button>

                {/* Address List */}
                <div className="space-y-4">
                    {addresses.map((addr) => (
                        <div key={addr.id} className="bg-white rounded-2xl p-5 sm:p-6 shadow-soft border border-pehnava-border/40 relative group">
                            {addr.isDefault && (
                                <span className="absolute top-4 right-12 px-2 py-1 bg-pehnava-accent/10 text-pehnava-accent text-[10px] sm:text-xs font-bold rounded-full uppercase tracking-wider">
                                    Default
                                </span>
                            )}

                            <button className="absolute top-4 right-4 p-1 text-pehnava-slate hover:text-pehnava-charcoal cursor-pointer">
                                <MoreVertical className="w-5 h-5" />
                            </button>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-pehnava-offWhite rounded-xl text-pehnava-charcoal">
                                    {addr.type === "Home" ? <Home className="w-5 h-5" /> : <Briefcase className="w-5 h-5" />}
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold text-pehnava-charcoal text-lg">{addr.type}</h3>
                                    </div>

                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 text-sm font-semibold text-pehnava-charcoal">
                                            <User className="w-4 h-4 text-pehnava-slate" />
                                            {addr.name}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-pehnava-slate font-medium">
                                            <Phone className="w-4 h-4" />
                                            {addr.phone}
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-2 text-pehnava-darkSlate text-sm leading-relaxed max-w-md">
                                        <MapPin className="w-4 h-4 mt-1 text-pehnava-slate shrink-0" />
                                        {addr.address}
                                    </div>

                                    <div className="pt-4 flex items-center gap-4">
                                        <button className="text-sm font-bold text-pehnava-primary hover:underline cursor-pointer">Edit</button>
                                        <button className="text-sm font-bold text-red-500 hover:underline cursor-pointer">Remove</button>
                                        {!addr.isDefault && (
                                            <button className="text-sm font-bold text-pehnava-slate hover:text-pehnava-charcoal cursor-pointer">Set as Default</button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AddressPage;