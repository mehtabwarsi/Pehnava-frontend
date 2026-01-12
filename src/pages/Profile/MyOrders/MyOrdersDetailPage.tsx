import { useParams, useNavigate } from "react-router-dom";
import { useCancelOrder, useMyOrderById } from "../../../services/useApiHook";
import { Package, MapPin, CreditCard, Calendar, Loader2, ChevronLeft, CheckCircle, Clock, XCircle, Truck, ShoppingBag, ArrowLeft, AlertTriangle } from "lucide-react";
import { useState } from "react";

const MyOrderDetailsPage = () => {
    const { orderId } = useParams<{ orderId: string }>();
    const [selectedReason, setSelectedReason] = useState("");
    const navigate = useNavigate();
    const { data, isLoading } = useMyOrderById(orderId || "");
    const { mutateAsync: cancelOrder } = useCancelOrder()

    // Modal State
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [isCancelling, setIsCancelling] = useState(false);

    const order = data?.message;

    const cancelReasons = [
        "Ordered by mistake",
        "Found a better price elsewhere",
        "Items not arriving on time",
        "Changed my mind",
        "Other"
    ];

    const handleCancelOrder = async () => {
        if (!selectedReason) {
            alert("Please select a reason for cancellation");
            return;
        }

        setIsCancelling(true);
        try {
            await cancelOrder({ orderId: orderId, reason: selectedReason });

            setShowCancelModal(false);
            window.location.reload(); // Refresh to show new status
        } catch (error: any) {
            console.error("Failed to cancel order", error);
            const errorMessage = error?.response?.data?.message || "Failed to cancel order";
            alert(errorMessage);
        } finally {
            setIsCancelling(false);
        }
    };

    const getStatusConfig = (status: string) => {
        switch (status?.toLowerCase()) {
            case "placed": return { color: "text-blue-600 bg-blue-50 border-blue-100", icon: Clock, label: "Placed", step: 1 };
            case "confirmed": return { color: "text-indigo-600 bg-indigo-50 border-indigo-100", icon: CheckCircle, label: "Confirmed", step: 2 };
            case "shipped": return { color: "text-purple-600 bg-purple-50 border-purple-100", icon: Truck, label: "Shipped", step: 3 };
            case "delivered": return { color: "text-green-600 bg-green-50 border-green-100", icon: CheckCircle, label: "Delivered", step: 4 };
            case "cancelled": return { color: "text-red-600 bg-red-50 border-red-100", icon: XCircle, label: "Cancelled", step: 0 };
            default: return { color: "text-gray-600 bg-gray-50 border-gray-100", icon: Package, label: status, step: 0 };
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-pehnava-offWhite flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-pehnava-primary animate-spin" />
            </div>
        );
    }

    if (!order) {
        return (
            <div className="min-h-screen bg-pehnava-offWhite flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-pehnava-charcoal">Order Not Found</h2>
                    <button
                        onClick={() => navigate("/profile/my-orders")}
                        className="mt-4 text-pehnava-primary hover:underline font-bold flex items-center gap-2 mx-auto"
                    >
                        <ArrowLeft className="w-4 h-4" /> Go Back to Orders
                    </button>
                </div>
            </div>
        );
    }

    const currentStatus = getStatusConfig(order.orderStatus);
    const StatusIcon = currentStatus.icon;

    return (
        <div className="min-h-screen bg-pehnava-offWhite py-8 px-4 sm:px-6 lg:px-8 font-sans relative">

            {/* Cancellation Modal */}
            {showCancelModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl scale-100 animate-in zoom-in-95 duration-200">
                        <div className="flex items-center gap-3 mb-4 text-amber-600">
                            <AlertTriangle className="w-6 h-6" />
                            <h3 className="text-xl font-bold text-pehnava-charcoal">Cancel Order?</h3>
                        </div>

                        <p className="text-pehnava-slate mb-4">
                            Please select a reason for cancellation. This helps us improve our service.
                        </p>

                        <div className="space-y-3 mb-6">
                            {cancelReasons.map((reason) => (
                                <label
                                    key={reason}
                                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${selectedReason === reason
                                        ? 'border-pehnava-primary bg-pehnava-primary/5 ring-1 ring-pehnava-primary'
                                        : 'border-pehnava-border hover:border-pehnava-primary/50'
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="cancelReason"
                                        value={reason}
                                        checked={selectedReason === reason}
                                        onChange={(e) => setSelectedReason(e.target.value)}
                                        className="w-4 h-4 text-pehnava-primary focus:ring-pehnava-primary"
                                    />
                                    <span className="text-sm font-semibold text-pehnava-charcoal">{reason}</span>
                                </label>
                            ))}
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    setShowCancelModal(false);
                                    setSelectedReason("");
                                }}
                                className="flex-1 py-2.5 rounded-xl border border-pehnava-border font-bold text-pehnava-slate hover:bg-pehnava-offWhite transition-colors"
                            >
                                Keep Order
                            </button>
                            <button
                                onClick={handleCancelOrder}
                                disabled={!selectedReason || isCancelling}
                                className="flex-1 py-2.5 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isCancelling ? <Loader2 className="w-4 h-4 animate-spin" /> : "Confirm Cancel"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-6xl mx-auto">
                {/* Navigation Header */}
                <div className="flex items-center justify-between mb-6">
                    <button
                        onClick={() => navigate("/profile/my-orders")}
                        className="group flex items-center gap-2 text-pehnava-slate hover:text-pehnava-charcoal transition-colors font-bold text-sm"
                    >
                        <div className="w-8 h-8 rounded-full bg-white border border-pehnava-border/60 flex items-center justify-center group-hover:border-pehnava-primary/50 transition-colors shadow-sm">
                            <ChevronLeft className="w-4 h-4" />
                        </div>
                        Back to Orders
                    </button>
                    <div className="text-right">
                        <p className="text-xs text-pehnava-slate uppercase tracking-wider font-bold">Order ID</p>
                        <p className="font-mono font-bold text-pehnava-charcoal">#{order._id}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* LEFT COLUMN - Main Content */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Order Timeline Card */}
                        <div className="bg-white rounded-2xl p-4 sm:p-8 shadow-soft border border-pehnava-border/40 overflow-hidden relative">
                            <div className="flex flex-wrap justify-between items-start gap-4 mb-6 sm:mb-8">
                                <div>
                                    <h1 className="text-lg sm:text-2xl font-bold text-pehnava-charcoal flex items-center gap-2 sm:gap-3">
                                        Order Details
                                        <span className={`text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full border flex items-center gap-1 ${currentStatus.color}`}>
                                            <StatusIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                            {currentStatus.label}
                                        </span>
                                    </h1>
                                    <p className="text-xs sm:text-sm text-pehnava-slate mt-1 sm:mt-2 flex items-center gap-2">
                                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                                        Placed on {formatDate(order.createdAt)}
                                    </p>
                                </div>
                            </div>

                            {/* Timeline */}
                            {order.orderStatus !== 'cancelled' && (
                                <div className="relative pt-4 pb-2 px-1 sm:px-2">
                                    <div className="flex items-center justify-between relative z-10">
                                        {[
                                            { label: 'Placed', icon: Clock, width: 0 },
                                            { label: 'Confirmed', icon: CheckCircle, width: 33 },
                                            { label: 'Shipped', icon: Truck, width: 66 },
                                            { label: 'Delivered', icon: Package, width: 100 }
                                        ].map((step, idx) => {
                                            const isCompleted = currentStatus.step > idx;
                                            const isCurrent = currentStatus.step === idx + 1;
                                            const StepIcon = step.icon;

                                            return (
                                                <div key={idx} className="flex flex-col items-center gap-2 sm:gap-3">
                                                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 bg-white
                                                        ${isCompleted || isCurrent ? 'border-pehnava-primary text-pehnava-primary shadow-md scale-110' : 'border-pehnava-border text-pehnava-slate'}
                                                    `}>
                                                        <StepIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                                                    </div>
                                                    <span className={`text-[10px] sm:text-xs font-bold ${isCompleted || isCurrent ? 'text-pehnava-charcoal' : 'text-pehnava-slate'}`}>
                                                        {step.label}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    {/* Progress Bar Background */}
                                    <div className="absolute top-[1rem] sm:top-[1.25rem] left-4 sm:left-5 right-4 sm:right-5 h-1 bg-pehnava-offWhite rounded-full -z-0">
                                        {/* Active Progress */}
                                        <div
                                            className="h-full bg-pehnava-primary rounded-full transition-all duration-1000 ease-out"
                                            style={{
                                                width: order.orderStatus === 'placed' ? '0%' :
                                                    order.orderStatus === 'confirmed' ? '33%' :
                                                        order.orderStatus === 'shipped' ? '66%' :
                                                            order.orderStatus === 'delivered' ? '100%' : '0%'
                                            }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Order Items Card */}
                        <div className="bg-white rounded-2xl shadow-soft border border-pehnava-border/40 overflow-hidden">
                            <div className="px-4 sm:px-6 py-4 border-b border-pehnava-border/40 bg-pehnava-offWhite/30 flex justify-between items-center">
                                <h3 className="font-bold text-pehnava-charcoal flex items-center gap-2 text-sm sm:text-base">
                                    <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-pehnava-primary" />
                                    Items
                                </h3>
                                <span className="text-xs sm:text-sm font-bold text-pehnava-slate bg-pehnava-offWhite px-2 py-0.5 rounded border border-pehnava-border/40">
                                    {order.items.length} {order.items.length === 1 ? 'Item' : 'Items'}
                                </span>
                            </div>
                            <div className="divide-y divide-pehnava-border/40">
                                {order.items.map((item: any, index: number) => (
                                    <div key={index} className="p-4 sm:p-6 flex gap-4 hover:bg-pehnava-offWhite/20 transition-colors">
                                        <div className="w-16 h-20 sm:w-24 sm:h-32 rounded-lg bg-white border border-pehnava-border p-1 flex-shrink-0 shadow-sm">
                                            <img
                                                src={item.image || "/placeholder-product.jpg"}
                                                alt={item.name}
                                                className="w-full h-full object-cover rounded"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-col sm:flex-row justify-between items-start gap-1">
                                                <div className="min-w-0 flex-1">
                                                    <h4 className="font-bold text-pehnava-charcoal text-sm sm:text-lg line-clamp-2">{item.name}</h4>
                                                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                                                        {item.size && (
                                                            <span className="text-[10px] sm:text-xs font-bold text-pehnava-darkSlate bg-pehnava-offWhite px-1.5 py-0.5 rounded border border-pehnava-border/40">
                                                                Size: {item.size.toUpperCase()}
                                                            </span>
                                                        )}
                                                        {item.color && (
                                                            <span className="text-[10px] sm:text-xs font-bold text-pehnava-darkSlate bg-pehnava-offWhite px-1.5 py-0.5 rounded border border-pehnava-border/40 capitalize">
                                                                {item.color}
                                                            </span>
                                                        )}
                                                        <span className="text-[10px] sm:text-xs font-bold text-pehnava-darkSlate bg-pehnava-offWhite px-1.5 py-0.5 rounded border border-pehnava-border/40">
                                                            Qty: {item.quantity}
                                                        </span>
                                                    </div>
                                                </div>
                                                <p className="font-bold text-pehnava-charcoal text-sm sm:text-lg mt-2 sm:mt-0 flex-shrink-0">
                                                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN - Sidebar Info */}
                    <div className="space-y-6">

                        {/* ACTIONS CARD (Cancel Button) */}
                        {renderCancelButton(order)}

                        {/* Order Summary */}
                        <div className="bg-white rounded-2xl p-6 shadow-soft border border-pehnava-border/40">
                            <h3 className="font-bold text-pehnava-charcoal mb-5 pb-3 border-b border-pehnava-border/40">Payment Summary</h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-pehnava-slate">Subtotal</span>
                                    <span className="font-bold text-pehnava-charcoal">₹{order.subtotal.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-pehnava-slate">Shipping</span>
                                    <span className="font-bold text-green-600">{order.shippingCharge === 0 ? "FREE" : `₹${order.shippingCharge}`}</span>
                                </div>
                                {order.discount > 0 && (
                                    <div className="flex justify-between">
                                        <span className="text-pehnava-slate">Discount</span>
                                        <span className="font-bold text-green-600">-₹{order.discount.toLocaleString('en-IN')}</span>
                                    </div>
                                )}
                                <div className="border-t border-dashed border-pehnava-border/60 pt-4 mt-2 flex justify-between items-center">
                                    <span className="font-bold text-pehnava-charcoal text-base">Grand Total</span>
                                    <span className="font-bold text-pehnava-primary text-xl">₹{order.totalAmount.toLocaleString('en-IN')}</span>
                                </div>
                            </div>
                        </div>

                        {/* Shipping Address */}
                        <div className="bg-white rounded-2xl p-6 shadow-soft border border-pehnava-border/40">
                            <h3 className="font-bold text-pehnava-charcoal mb-4 flex items-center gap-2 text-sm uppercase tracking-wider text-pehnava-slate">
                                <MapPin className="w-4 h-4 text-pehnava-primary" />
                                Delivery Address
                            </h3>
                            <div className="p-4 bg-pehnava-offWhite/30 rounded-xl border border-pehnava-border/40">
                                <p className="font-bold text-pehnava-charcoal">{order.shippingAddress.fullName || "User"}</p>
                                <p className="text-sm text-pehnava-slate leading-relaxed mt-1">
                                    {order.shippingAddress.street && <>{order.shippingAddress.street}, <br /></>}
                                    {order.shippingAddress.city}, {order.shippingAddress.state}
                                    <br />
                                    <span className="font-bold text-pehnava-charcoal">{order.shippingAddress.pincode}</span>
                                </p>
                                <div className="mt-3 pt-3 border-t border-pehnava-border/40">
                                    <p className="text-xs text-pehnava-slate font-bold uppercase mb-0.5">Contact Number</p>
                                    <p className="text-sm font-bold text-pehnava-charcoal">{order.shippingAddress.phone}</p>
                                </div>
                            </div>
                        </div>

                        {/* Payment Information */}
                        <div className="bg-white rounded-2xl p-6 shadow-soft border border-pehnava-border/40">
                            <h3 className="font-bold text-pehnava-charcoal mb-4 flex items-center gap-2 text-sm uppercase tracking-wider text-pehnava-slate">
                                <CreditCard className="w-4 h-4 text-pehnava-primary" />
                                Payment Method
                            </h3>
                            <div className="flex flex-col gap-3">
                                <div className="flex justify-between items-center p-3 rounded-lg bg-pehnava-offWhite/50 border border-pehnava-border/40">
                                    <span className="text-sm font-bold text-pehnava-charcoal">{order.paymentMethod}</span>
                                    {order.paymentMethod === 'Cash on Delivery' ? <Truck className="w-4 h-4 text-pehnava-slate" /> : <CreditCard className="w-4 h-4 text-pehnava-slate" />}
                                </div>
                                {order.orderStatus !== 'cancelled' && (
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-pehnava-slate">Payment Status</span>
                                        <span className={`font-bold uppercase text-xs px-2.5 py-1 rounded-md ${order.paymentStatus === "paid" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}>
                                            {order.paymentStatus}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    function renderCancelButton(order: any) {
        if (['placed', 'confirmed'].includes(order.orderStatus?.toLowerCase())) {
            return (
                <div className="bg-white rounded-2xl p-6 shadow-soft border border-pehnava-border/40">
                    <h3 className="font-bold text-pehnava-charcoal mb-4 flex items-center gap-2 text-sm uppercase tracking-wider text-pehnava-slate">
                        Actions
                    </h3>
                    <button
                        onClick={() => setShowCancelModal(true)}
                        className="w-full py-3 rounded-xl bg-red-50 text-red-600 font-bold hover:bg-red-100 hover:text-red-700 transition-colors border border-red-200 flex items-center justify-center gap-2"
                    >
                        <XCircle className="w-5 h-5" />
                        Cancel Order
                    </button>
                </div>
            )
        }
        return null;
    }
};

export default MyOrderDetailsPage;