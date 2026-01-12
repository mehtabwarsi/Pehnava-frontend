import { ChevronLeft, MapPin, CreditCard, Smartphone, Wallet, ChevronRight, ShieldCheck, Loader2, Home, Briefcase, CheckCircle2, Package } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCheckout, useClearCart, useGetAddresses, usePlaceOrder } from "../../services/useApiHook";
import { useState, useEffect } from "react";

type PaymentMethod = "COD" | "UPI" | "CARD" | "WALLET";

const PaymentPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { data: checkoutData, isLoading: isCheckoutLoading } = useCheckout();
    const { data: addressResponse } = useGetAddresses();

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null);
    const { mutate: placeOrder, isPending: isPlacingOrder } = usePlaceOrder();
    const { mutate: clearCart } = useClearCart();

    // Get selected address ID from navigation state or sessionStorage
    const selectedAddressId = location.state?.addressId || sessionStorage.getItem("selectedAddressId");

    // Find the selected address
    const addresses = addressResponse?.data || [];
    const selectedAddress = addresses.find((addr: any) => addr._id === selectedAddressId);

    // Redirect if no address selected
    useEffect(() => {
        if (!selectedAddressId && !isCheckoutLoading) {
            navigate("/checkout/address");
        }
    }, [selectedAddressId, navigate, isCheckoutLoading]);

    const items = checkoutData?.data?.items || [];
    const totalAmount = checkoutData?.data?.totalAmount || 0;
    const itemCount = items.reduce((acc: number, item: any) => acc + item.quantity, 0);

    const paymentMethods = [
        {
            id: "COD" as PaymentMethod,
            name: "Cash on Delivery",
            icon: Wallet,
            description: "Pay when you receive your order"
        },
        {
            id: "UPI" as PaymentMethod,
            name: "UPI Payment",
            icon: Smartphone,
            description: "Google Pay, PhonePe, Paytm & more"
        },
        {
            id: "CARD" as PaymentMethod,
            name: "Credit/Debit Card",
            icon: CreditCard,
            description: "Visa, Mastercard, Amex, Rupay"
        }
    ];

    const handlePlaceOrder = async () => {
        if (!selectedPaymentMethod || !selectedAddress) return;

        const validItems = items.filter((item: any) => item.productId);

        if (validItems.length === 0) {
            alert("No valid items in cart to place order");
            return;
        }

        const orderData = {
            items: validItems.map((item: any) => ({
                product: item.productId,
                quantity: item.quantity,
                price: item.price,
                size: item.size,
                color: item.color,
                image: item.image,
                name: item.name
            })),
            shippingAddress: selectedAddress,
            paymentMethod: selectedPaymentMethod,
            shippingCharge: 0,
            discount: 0
        };

        placeOrder(orderData, {
            onSuccess: (data: any) => {
                clearCart()
                alert(`Order placed successfully! Order ID: ${data?.data?._id}`);
                navigate("/");
            },
            onError: (error: any) => {
                console.error("Failed to place order:", error);
                alert(error?.response?.data?.message || "Failed to place order. Please try again.");
            }
        });
    };

    if (isCheckoutLoading) {
        return (
            <div className="min-h-screen bg-pehnava-offWhite flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-pehnava-primary animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-pehnava-offWhite pt-6 pb-32 sm:pt-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={() => navigate("/checkout/address")}
                        className="p-2 hover:bg-white rounded-full transition-colors shadow-soft cursor-pointer"
                    >
                        <ChevronLeft className="w-6 h-6 text-pehnava-charcoal" />
                    </button>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-pehnava-charcoal">Payment</h1>
                        <p className="text-sm text-pehnava-slate mt-1">Choose your preferred payment method</p>
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
                        <div className="flex-1 h-1 bg-green-500 mx-2 rounded-full"></div>
                        <div className="flex flex-col items-center gap-1">
                            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                                <CheckCircle2 className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-bold text-green-600">Address</span>
                        </div>
                        <div className="flex-1 h-1 bg-pehnava-primary mx-2 rounded-full"></div>
                        <div className="flex flex-col items-center gap-1">
                            <div className="w-10 h-10 rounded-full bg-pehnava-primary flex items-center justify-center text-white font-bold">
                                3
                            </div>
                            <span className="text-xs font-bold text-pehnava-primary">Payment</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Column: Payment Methods */}
                    <div className="flex-1 space-y-6">
                        {/* Delivery Address */}
                        {selectedAddress && (
                            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-soft border border-pehnava-border/40">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-bold text-pehnava-charcoal text-lg flex items-center gap-2">
                                        <MapPin className="w-5 h-5 text-pehnava-primary" />
                                        Delivery Address
                                    </h3>
                                    <button
                                        onClick={() => navigate("/checkout/address")}
                                        className="text-sm font-bold text-pehnava-primary hover:underline cursor-pointer"
                                    >
                                        Change
                                    </button>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-pehnava-offWhite rounded-xl text-pehnava-charcoal">
                                        {selectedAddress.addressType === "Home" ? <Home className="w-5 h-5" /> : <Briefcase className="w-5 h-5" />}
                                    </div>
                                    <div className="space-y-2 flex-1">
                                        <h4 className="font-bold text-pehnava-charcoal">{selectedAddress.fullName}</h4>
                                        <p className="text-sm text-pehnava-darkSlate leading-relaxed">
                                            {selectedAddress.street}, {selectedAddress.city}, {selectedAddress.state} - <span className="font-bold">{selectedAddress.pincode}</span>
                                        </p>
                                        <p className="text-sm text-pehnava-slate">+91 {selectedAddress.phone}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Payment Methods */}
                        <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-soft border border-pehnava-border/40">
                            <h3 className="font-bold text-pehnava-charcoal text-lg mb-4">Select Payment Method</h3>
                            <div className="space-y-3">
                                {paymentMethods.map((method) => {
                                    const Icon = method.icon;
                                    const isSelected = selectedPaymentMethod === method.id;

                                    return (
                                        <button
                                            key={method.id}
                                            onClick={() => setSelectedPaymentMethod(method.id)}
                                            className={`w-full p-4 rounded-xl border-2 transition-all text-left flex items-center gap-4 group cursor-pointer ${isSelected
                                                ? "border-pehnava-primary bg-pehnava-primary/5"
                                                : "border-pehnava-border hover:border-pehnava-primary/50"
                                                }`}
                                        >
                                            <div className={`p-3 rounded-lg ${isSelected ? "bg-pehnava-primary text-white" : "bg-pehnava-offWhite text-pehnava-charcoal"}`}>
                                                <Icon className="w-6 h-6" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-bold text-pehnava-charcoal">{method.name}</h4>
                                                <p className="text-xs text-pehnava-slate mt-0.5">{method.description}</p>
                                            </div>
                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? "border-pehnava-primary bg-pehnava-primary" : "border-pehnava-border bg-white"
                                                }`}>
                                                {isSelected && <CheckCircle2 className="w-5 h-5 text-white fill-current" />}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="lg:w-[400px] space-y-6">
                        {/* Order Items */}
                        <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-soft border border-pehnava-border/40">
                            <h3 className="font-bold text-pehnava-charcoal text-lg mb-4 flex items-center gap-2">
                                <Package className="w-5 h-5 text-pehnava-primary" />
                                Order Summary ({itemCount} {itemCount === 1 ? 'item' : 'items'})
                            </h3>
                            <div className="space-y-3 max-h-[300px] overflow-y-auto">
                                {items.filter((item: any) => item.productId).map((item: any) => (
                                    <div key={item.productId} className="flex gap-3 pb-3 border-b border-pehnava-border/40 last:border-0">
                                        <div className="w-16 h-20 rounded-lg bg-pehnava-lightGray overflow-hidden flex-shrink-0">
                                            <img
                                                src={item.image || "/placeholder-product.jpg"}
                                                alt={item.name || "Product"}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-bold text-sm text-pehnava-charcoal line-clamp-1">{item.name || "Product"}</h4>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-xs text-pehnava-slate">
                                                    Size: {item.size?.toUpperCase() || "N/A"}
                                                </span>
                                                <span className="text-xs text-pehnava-slate">•</span>
                                                <span className="text-xs text-pehnava-slate">
                                                    Qty: {item.quantity || 1}
                                                </span>
                                            </div>
                                            <p className="font-bold text-sm text-pehnava-charcoal mt-1">
                                                ₹{((item.price || 0) * (item.quantity || 1)).toLocaleString('en-IN')}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Price Summary */}
                        <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-soft border border-pehnava-border/40">
                            <h3 className="font-bold text-pehnava-charcoal text-lg mb-4">Price Details</h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between items-center">
                                    <span className="text-pehnava-slate">Total MRP</span>
                                    <span className="font-bold text-pehnava-charcoal">₹{totalAmount.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-pehnava-slate">Delivery Charges</span>
                                    <span className="font-bold text-green-600">FREE</span>
                                </div>
                                <div className="border-t border-dashed border-pehnava-border/60 my-3 pt-3 flex justify-between items-center">
                                    <span className="text-base font-bold text-pehnava-charcoal">Total Amount</span>
                                    <span className="text-xl font-bold text-pehnava-charcoal">₹{totalAmount.toLocaleString('en-IN')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sticky Bottom Actions */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-pehnava-border/40 shadow-large p-4 sm:p-6 z-40">
                <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center gap-3">
                    <div className="flex items-center gap-2 text-xs text-pehnava-slate">
                        <ShieldCheck className="w-4 h-4 text-green-600" />
                        <span>100% Secure Payment</span>
                    </div>
                    <div className="flex items-center gap-4 sm:ml-auto w-full sm:w-auto">
                        <div className="text-right hidden sm:block">
                            <p className="text-xs text-pehnava-slate">Total Amount</p>
                            <p className="text-lg font-bold text-pehnava-charcoal">₹{totalAmount.toLocaleString('en-IN')}</p>
                        </div>
                        <button
                            onClick={handlePlaceOrder}
                            disabled={!selectedPaymentMethod || isPlacingOrder}
                            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-pehnava-charcoal text-white font-bold tracking-wide hover:bg-pehnava-primary hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                        >
                            {isPlacingOrder ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Placing Order...
                                </>
                            ) : (
                                <>
                                    Place Order <ChevronRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
