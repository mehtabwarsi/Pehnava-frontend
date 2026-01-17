import { ChevronLeft, MapPin, User, Home, Briefcase, Info, } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAddAddress } from "../../../services/useApiHook";

const AddAddressPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { mutate: addAddress, isPending } = useAddAddress();
    const returnTo = location.state?.returnTo;

    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        pincode: "",
        houseNo: "",
        area: "",
        city: "",
        state: "",
        addressType: "Home",
        isDefault: false
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;

        if (name === "phone" || name === "pincode") {
            // Only allow digits
            const onlyDigits = value.replace(/\D/g, "");
            const maxLength = name === "phone" ? 10 : 6;

            if (onlyDigits.length <= maxLength) {
                setFormData(prev => ({ ...prev, [name]: onlyDigits }));
            }
            return;
        }

        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleTypeChange = (type: string) => {
        setFormData(prev => ({ ...prev, addressType: type }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Map frontend "Work" to backend "Office" as per schema enum ["Home", "Office", "Other"]
        const finalAddressType = formData.addressType === "Work" ? "Office" : formData.addressType;

        // Construct data according to Mongoose schema
        const addressData = {
            fullName: formData.fullName,
            phone: formData.phone,
            street: `${formData.houseNo}, ${formData.area}`,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode,
            addressType: finalAddressType,
            isDefault: formData.isDefault,
            country: "India" // Default as per schema
        };

        addAddress(addressData, {
            onSuccess: () => {
                // If came from checkout, go back to checkout
                if (returnTo) {
                    navigate(returnTo);
                } else {
                    navigate(-1);
                }
            },
            onError: (error) => {
                console.error("Failed to add address:", error);
                // You could add a toast notification here
            }
        });
    };

    return (
        <div className="min-h-screen bg-pehnava-offWhite pt-6 pb-24 sm:pt-12 sm:pb-32 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 hover:bg-white rounded-full transition-colors shadow-soft cursor-pointer"
                    >
                        <ChevronLeft className="w-6 h-6 text-pehnava-charcoal" />
                    </button>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-pehnava-charcoal">Add New Address</h1>
                        <p className="text-pehnava-slate text-sm font-medium">Be sure to check your delivery details</p>
                    </div>
                </div>

                <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-soft border border-pehnava-border/40">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Section 1: Contact Details */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-bold text-pehnava-charcoal uppercase tracking-widest flex items-center gap-2">
                                <User className="w-4 h-4" />
                                Contact Details
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-pehnava-slate ml-1 uppercase">Full Name</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Enter your name"
                                        className="w-full px-4 py-3 rounded-xl bg-pehnava-offWhite border border-pehnava-border focus:border-pehnava-primary focus:ring-1 focus:ring-pehnava-primary outline-none transition-all font-medium text-pehnava-charcoal placeholder:text-pehnava-slate/50"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-pehnava-slate ml-1 uppercase">Mobile Number</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-pehnava-slate font-bold">+91</span>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            required
                                            pattern="[0-9]{10}"
                                            maxLength={10}
                                            minLength={10}
                                            placeholder="10-digit number"
                                            className="w-full pl-14 pr-4 py-3 rounded-xl bg-pehnava-offWhite border border-pehnava-border focus:border-pehnava-primary focus:ring-1 focus:ring-pehnava-primary outline-none transition-all font-medium text-pehnava-charcoal placeholder:text-pehnava-slate/50"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Address Details */}
                        <div className="space-y-4 pt-4 border-t border-pehnava-border/40">
                            <h3 className="text-xs font-bold text-pehnava-charcoal uppercase tracking-widest flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                Delivery Address
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-pehnava-slate ml-1 uppercase">Pincode</label>
                                    <input
                                        type="text"
                                        name="pincode"
                                        value={formData.pincode}
                                        onChange={handleInputChange}
                                        required
                                        pattern="[0-9]{6}"
                                        maxLength={6}
                                        minLength={6}
                                        placeholder="6-digit pincode"
                                        className="w-full px-4 py-3 rounded-xl bg-pehnava-offWhite border border-pehnava-border focus:border-pehnava-primary focus:ring-1 focus:ring-pehnava-primary outline-none transition-all font-medium text-pehnava-charcoal placeholder:text-pehnava-slate/50"
                                    />
                                </div>
                                <div className="space-y-1.5 flex items-end">
                                    <button type="button" className="px-4 py-3 rounded-xl bg-pehnava-charcoal text-white text-xs font-bold uppercase tracking-wider hover:bg-black transition-colors w-full">
                                        Check Serviceability
                                    </button>
                                </div>
                                <div className="space-y-1.5 sm:col-span-2">
                                    <label className="text-xs font-bold text-pehnava-slate ml-1 uppercase">House No, Building Name</label>
                                    <input
                                        type="text"
                                        name="houseNo"
                                        value={formData.houseNo}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="e.g. H.No 123, Rose Villa"
                                        className="w-full px-4 py-3 rounded-xl bg-pehnava-offWhite border border-pehnava-border focus:border-pehnava-primary focus:ring-1 focus:ring-pehnava-primary outline-none transition-all font-medium text-pehnava-charcoal placeholder:text-pehnava-slate/50"
                                    />
                                </div>
                                <div className="space-y-1.5 sm:col-span-2">
                                    <label className="text-xs font-bold text-pehnava-slate ml-1 uppercase">Road Name, Area, Colony</label>
                                    <input
                                        type="text"
                                        name="area"
                                        value={formData.area}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="e.g. Sector 45 near Main Market"
                                        className="w-full px-4 py-3 rounded-xl bg-pehnava-offWhite border border-pehnava-border focus:border-pehnava-primary focus:ring-1 focus:ring-pehnava-primary outline-none transition-all font-medium text-pehnava-charcoal placeholder:text-pehnava-slate/50"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-pehnava-slate ml-1 uppercase">City / District</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Your City"
                                        className="w-full px-4 py-3 rounded-xl bg-pehnava-offWhite border border-pehnava-border focus:border-pehnava-primary focus:ring-1 focus:ring-pehnava-primary outline-none transition-all font-medium text-pehnava-charcoal placeholder:text-pehnava-slate/50"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-pehnava-slate ml-1 uppercase">State</label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Your State"
                                        className="w-full px-4 py-3 rounded-xl bg-pehnava-offWhite border border-pehnava-border focus:border-pehnava-primary focus:ring-1 focus:ring-pehnava-primary outline-none transition-all font-medium text-pehnava-charcoal placeholder:text-pehnava-slate/50"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Address Type */}
                        <div className="space-y-4 pt-4 border-t border-pehnava-border/40">
                            <h3 className="text-xs font-bold text-pehnava-charcoal uppercase tracking-widest flex items-center gap-2">
                                <Info className="w-4 h-4" />
                                Address Type
                            </h3>
                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => handleTypeChange("Home")}
                                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${formData.addressType === "Home"
                                        ? "bg-pehnava-charcoal text-white shadow-md scale-[1.02]"
                                        : "bg-pehnava-offWhite text-pehnava-slate border border-pehnava-border"}`}
                                >
                                    <Home className="w-4 h-4" />
                                    Home
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleTypeChange("Work")}
                                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${formData.addressType === "Work"
                                        ? "bg-pehnava-charcoal text-white shadow-md scale-[1.02]"
                                        : "bg-pehnava-offWhite text-pehnava-slate border border-pehnava-border"}`}
                                >
                                    <Briefcase className="w-4 h-4" />
                                    Work
                                </button>
                            </div>
                        </div>

                        {/* Default Checkbox */}
                        <label className="flex items-center gap-3 cursor-pointer group mt-4">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    name="isDefault"
                                    checked={formData.isDefault}
                                    onChange={handleInputChange}
                                    className="sr-only peer"
                                />
                                <div className="w-5 h-5 border-2 border-pehnava-border rounded-md bg-white peer-checked:bg-pehnava-primary peer-checked:border-pehnava-primary transition-all"></div>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 transition-opacity">
                                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z" /></svg>
                                </div>
                            </div>
                            <span className="text-sm font-semibold text-pehnava-charcoal select-none">Make this my default address</span>
                        </label>

                        {/* Submit Button */}
                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={isPending}
                                className={`w-full py-4 rounded-2xl bg-pehnava-primary text-white font-bold text-lg hover:bg-pehnava-charcoal transition-all shadow-lg active:scale-[0.98] ${isPending ? "opacity-70 cursor-not-allowed" : ""}`}
                            >
                                {isPending ? "Saving..." : "Save Address"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddAddressPage;