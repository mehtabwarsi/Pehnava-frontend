import { ChevronLeft, Plus, MapPin, MoreVertical, Home, Briefcase, Phone, User, Loader2, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDeleteAddress, useGetAddresses, useSetDefaultAddress } from "../../../services/useApiHook";

const AddressPage = () => {
    const navigate = useNavigate();
    const { data: addressResponse, isLoading } = useGetAddresses();
    const { mutate: deleteAddress, isPending: isDeletePending } = useDeleteAddress();
    const addresses = addressResponse?.data || [];

    const handleDelete = (addressId: string) => {
        deleteAddress(addressId, {
            onError: (error) => {
                console.error("Failed to delete address:", error);
            }
        });

    };

    const { mutate: setDefaultAddress } = useSetDefaultAddress();

    const handleSetDefaultAddress = (addressId: string) => {
        setDefaultAddress(addressId);
    };

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

                {/* Loading State */}
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20 text-pehnava-slate">
                        <Loader2 className="w-10 h-10 animate-spin mb-4" />
                        <p className="font-medium">Loading your addresses...</p>
                    </div>
                ) : addresses.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-pehnava-border/60 shadow-soft">
                        <div className="w-16 h-16 bg-pehnava-offWhite rounded-full flex items-center justify-center mx-auto mb-4 text-pehnava-slate">
                            <MapPin className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-pehnava-charcoal mb-2">No Addresses Found</h3>
                        <p className="text-pehnava-slate max-w-xs mx-auto text-sm">You haven't added any delivery addresses yet. Add one to get started!</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {addresses.map((addr: any) => (
                            <div key={addr._id} className="bg-white rounded-2xl p-5 sm:p-6 shadow-soft border border-pehnava-border/40 relative group">
                                {addr.isDefault && (
                                    <span className="absolute top-4 right-12 px-3 py-1 bg-pehnava-primary text-white text-[10px] sm:text-xs font-bold rounded-full uppercase tracking-wider">
                                        Default
                                    </span>
                                )}

                                <button className="absolute top-4 right-4 p-1 text-pehnava-slate hover:text-pehnava-charcoal cursor-pointer">
                                    <MoreVertical className="w-5 h-5" />
                                </button>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-pehnava-offWhite rounded-xl text-pehnava-charcoal">
                                        {addr.addressType === "Home" ? <Home className="w-5 h-5" /> : <Briefcase className="w-5 h-5" />}
                                    </div>
                                    <div className="space-y-3 flex-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-bold text-pehnava-charcoal text-lg">{addr.addressType}</h3>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                                            <div className="flex items-center gap-2 text-sm font-semibold text-pehnava-charcoal">
                                                <User className="w-4 h-4 text-pehnava-slate" />
                                                {addr.fullName}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-pehnava-slate font-medium">
                                                <Phone className="w-4 h-4" />
                                                +91 {addr.phone}
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-2 text-pehnava-darkSlate text-sm leading-relaxed max-w-md">
                                            <MapPin className="w-4 h-4 mt-1 text-pehnava-slate shrink-0" />
                                            <span>
                                                {addr.street}, {addr.city}, {addr.state} - <span className="font-bold">{addr.pincode}</span>
                                            </span>
                                        </div>

                                        <div className="pt-4 flex items-center gap-4 border-t border-pehnava-border/20">
                                            <button
                                                onClick={() => navigate(`/profile/address/edit/${addr._id}`)}
                                                className="text-sm font-bold text-pehnava-primary hover:underline cursor-pointer"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(addr._id)}
                                                disabled={isDeletePending}
                                                className="text-sm font-bold text-red-500 hover:underline cursor-pointer flex items-center gap-1 disabled:opacity-50"
                                            >
                                                {isDeletePending ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3 h-3" />}
                                                Remove
                                            </button>
                                            {!addr.isDefault && (
                                                <button
                                                    onClick={() => handleSetDefaultAddress(addr._id)}
                                                    className="text-sm font-bold text-pehnava-slate hover:text-pehnava-charcoal cursor-pointer"
                                                >
                                                    Set as Default
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddressPage;