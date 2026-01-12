import { ChevronLeft, Plus, MapPin, Home, Briefcase, Phone, User, Loader2, ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetAddresses } from "../../services/useApiHook";
import { useState } from "react";

const AddressSelectionPage = () => {
    const navigate = useNavigate();
    const { data: addressResponse, isLoading } = useGetAddresses();
    const addresses = addressResponse?.data || [];
    const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
        addresses.find((addr: any) => addr.isDefault)?._id || null
    );

    // Auto-select default address when loaded
    if (!selectedAddressId && addresses.length > 0) {
        const defaultAddr = addresses.find((addr: any) => addr.isDefault);
        if (defaultAddr) {
            setSelectedAddressId(defaultAddr._id);
        } else {
            setSelectedAddressId(addresses[0]._id);
        }
    }

    const handleContinueToPayment = () => {
        if (!selectedAddressId) return;

        // Store selected address ID in session/local storage or pass via state
        sessionStorage.setItem("selectedAddressId", selectedAddressId);

        // Navigate to payment page (you'll need to create this or update as needed)
        navigate("/checkout/payment", { state: { addressId: selectedAddressId } });
    };

    const handleAddNewAddress = () => {
        navigate("/profile/address/add", {
            state: { returnTo: "/checkout/address" }
        });
    };

    return (
        <div className="min-h-screen bg-pehnava-offWhite pt-6 pb-32 sm:pt-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={() => navigate("/cart")}
                        className="p-2 hover:bg-white rounded-full transition-colors shadow-soft cursor-pointer"
                    >
                        <ChevronLeft className="w-6 h-6 text-pehnava-charcoal" />
                    </button>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-pehnava-charcoal">Select Delivery Address</h1>
                        <p className="text-sm text-pehnava-slate mt-1">Choose where you'd like your order delivered</p>
                    </div>
                </div>

                {/* Progress Indicator */}
                <div className="mb-8 bg-white rounded-2xl p-4 shadow-soft border border-pehnava-border/40">
                    <div className="flex items-center justify-between max-w-md mx-auto">
                        <div className="flex flex-col items-center gap-1">
                            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                                <CheckCircle2 className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-bold text-green-600">Cart</span>
                        </div>
                        <div className="flex-1 h-1 bg-pehnava-primary mx-2 rounded-full"></div>
                        <div className="flex flex-col items-center gap-1">
                            <div className="w-10 h-10 rounded-full bg-pehnava-primary flex items-center justify-center text-white font-bold">
                                2
                            </div>
                            <span className="text-xs font-bold text-pehnava-primary">Address</span>
                        </div>
                        <div className="flex-1 h-1 bg-pehnava-border mx-2 rounded-full"></div>
                        <div className="flex flex-col items-center gap-1">
                            <div className="w-10 h-10 rounded-full bg-pehnava-lightGray flex items-center justify-center text-pehnava-slate font-bold">
                                3
                            </div>
                            <span className="text-xs font-medium text-pehnava-slate">Payment</span>
                        </div>
                    </div>
                </div>

                {/* Add New Address Button */}
                <button
                    onClick={handleAddNewAddress}
                    className="w-full mb-6 p-4 bg-white border-2 border-dashed border-pehnava-border rounded-2xl flex items-center justify-center gap-2 text-pehnava-primary font-bold hover:border-pehnava-primary hover:bg-pehnava-primary/5 transition-all cursor-pointer group"
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
                        <p className="text-pehnava-slate max-w-xs mx-auto text-sm mb-6">
                            You haven't added any delivery addresses yet. Add one to continue with your order!
                        </p>
                        <button
                            onClick={handleAddNewAddress}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-pehnava-primary text-white font-bold rounded-xl hover:bg-pehnava-primaryDark hover:shadow-glow transition-all cursor-pointer"
                        >
                            <Plus className="w-5 h-5" />
                            Add Your First Address
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {addresses.map((addr: any) => (
                            <div
                                key={addr._id}
                                onClick={() => setSelectedAddressId(addr._id)}
                                className={`bg-white rounded-2xl p-5 sm:p-6 shadow-soft border-2 transition-all cursor-pointer group relative ${selectedAddressId === addr._id
                                    ? "border-pehnava-primary shadow-glow"
                                    : "border-pehnava-border/40 hover:border-pehnava-primary/50"
                                    }`}
                            >
                                {/* Selection Indicator */}
                                <div className="absolute top-5 right-5">
                                    <div
                                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${selectedAddressId === addr._id
                                            ? "border-pehnava-primary bg-pehnava-primary"
                                            : "border-pehnava-border bg-white"
                                            }`}
                                    >
                                        {selectedAddressId === addr._id && (
                                            <CheckCircle2 className="w-5 h-5 text-white fill-current" />
                                        )}
                                    </div>
                                </div>

                                {/* Default Badge */}
                                {addr.isDefault && (
                                    <span className="absolute top-5 right-16 px-3 py-1 bg-pehnava-accent text-white text-[10px] sm:text-xs font-bold rounded-full uppercase tracking-wider">
                                        Default
                                    </span>
                                )}

                                <div className="flex items-start gap-4 pr-12">
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
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Sticky Bottom Actions */}
            {addresses.length > 0 && (
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-pehnava-border/40 shadow-large p-4 sm:p-6 z-40">
                    <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-3">
                        <div className="flex items-center gap-2 text-xs text-pehnava-slate">
                            <ShieldCheck className="w-4 h-4 text-green-600" />
                            <span>Secure & Encrypted</span>
                        </div>
                        <button
                            onClick={handleContinueToPayment}
                            disabled={!selectedAddressId}
                            className="w-full sm:w-auto sm:ml-auto px-8 py-3.5 rounded-xl bg-pehnava-charcoal text-white font-bold tracking-wide hover:bg-pehnava-primary hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                        >
                            Continue to Payment <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddressSelectionPage;
