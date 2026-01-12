import { useMyorders } from "../../../services/useApiHook";
import { Package, Loader2, ShoppingBag, ChevronRight, Clock, CheckCircle, Truck, XCircle, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MyOrdersPage = () => {
    const { data: ordersData, isLoading } = useMyorders();
    const navigate = useNavigate();

    // Safety check for data structure
    const orders = ordersData?.message || [];

    const getStatusConfig = (status: string) => {
        switch (status?.toLowerCase()) {
            case "placed": return { color: "text-blue-600 bg-blue-50 border-blue-100", icon: Clock, label: "Placed" };
            case "confirmed": return { color: "text-indigo-600 bg-indigo-50 border-indigo-100", icon: CheckCircle, label: "Confirmed" };
            case "shipped": return { color: "text-purple-600 bg-purple-50 border-purple-100", icon: Truck, label: "Shipped" };
            case "delivered": return { color: "text-green-600 bg-green-50 border-green-100", icon: CheckCircle, label: "Delivered" };
            case "cancelled": return { color: "text-red-600 bg-red-50 border-red-100", icon: XCircle, label: "Cancelled" };
            default: return { color: "text-gray-600 bg-gray-50 border-gray-100", icon: Package, label: status };
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-pehnava-offWhite flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-pehnava-primary animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-pehnava-offWhite py-8 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-5xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-pehnava-charcoal flex items-center gap-3">
                            <ShoppingBag className="w-8 h-8 text-pehnava-primary" />
                            Your Orders
                        </h1>
                        <p className="text-pehnava-slate mt-1 text-sm">
                            {orders.length} {orders.length === 1 ? 'order' : 'orders'} placed
                        </p>
                    </div>
                </div>

                {/* Orders List */}
                {orders.length === 0 ? (
                    <div className="bg-white rounded-2xl p-16 text-center shadow-sm border border-pehnava-border/40 flex flex-col items-center">
                        <div className="w-20 h-20 bg-pehnava-offWhite rounded-full flex items-center justify-center mb-6">
                            <Package className="w-10 h-10 text-pehnava-slate opacity-50" />
                        </div>
                        <h3 className="text-xl font-bold text-pehnava-charcoal mb-2">No orders yet</h3>
                        <p className="text-pehnava-slate mb-8 max-w-sm mx-auto">
                            Looks like you haven't made your choice yet. Explore our collection and find something you love!
                        </p>
                        <button
                            onClick={() => navigate("/")}
                            className="px-8 py-3 bg-pehnava-charcoal text-white rounded-xl font-bold hover:bg-pehnava-primary transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                        >
                            Start Shopping
                        </button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order: any) => {
                            const status = getStatusConfig(order.orderStatus);
                            const StatusIcon = status.icon;

                            return (
                                <div
                                    key={order._id}
                                    onClick={() => navigate(`/profile/my-orders/${order._id}`)}
                                    className="group bg-white rounded-2xl border border-pehnava-border/60 hover:border-pehnava-primary/30 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden"
                                >
                                    {/* Order Header Summary */}
                                    <div className="bg-pehnava-offWhite/50 px-6 py-4 flex flex-wrap gap-y-4 justify-between items-center border-b border-pehnava-border/40 text-sm">
                                        <div className="flex gap-8 text-pehnava-slate">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-xs font-bold uppercase tracking-wider opacity-70">Order Placed</span>
                                                <span className="font-semibold text-pehnava-charcoal">{formatDate(order.createdAt)}</span>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <span className="text-xs font-bold uppercase tracking-wider opacity-70">Total</span>
                                                <span className="font-semibold text-pehnava-charcoal">₹{order.totalAmount.toLocaleString('en-IN')}</span>
                                            </div>
                                            <div className="hidden sm:flex flex-col gap-1">
                                                <span className="text-xs font-bold uppercase tracking-wider opacity-70">Order #</span>
                                                <span className="font-mono text-pehnava-charcoal">{order._id.slice(-8).toUpperCase()}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${status.color}`}>
                                                <StatusIcon className="w-3.5 h-3.5" />
                                                {status.label}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Order Content */}
                                    <div className="p-6">
                                        <div className="flex flex-col lg:flex-row gap-6">
                                            {/* Product List - Mobile (Horizontal Scroll) */}
                                            <div className="lg:hidden flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                                                {order.items.map((item: any, idx: number) => (
                                                    <div key={idx} className="relative flex-shrink-0 group/item w-20">
                                                        <div className="w-20 h-24 rounded-lg border border-pehnava-border bg-white p-1">
                                                            <img
                                                                src={item.image || "/placeholder-product.jpg"}
                                                                alt={item.name}
                                                                className="w-full h-full object-cover rounded"
                                                            />
                                                        </div>
                                                        <div className="absolute -top-2 -right-2 w-5 h-5 bg-pehnava-charcoal text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-md">
                                                            {item.quantity}
                                                        </div>
                                                    </div>
                                                ))}
                                                {/* Shipping Info Card in Scroll (Mobile Only) */}
                                                <div className="w-48 h-24 rounded-lg border border-pehnava-border/60 bg-pehnava-offWhite p-3 flex-shrink-0 flex flex-col justify-center">
                                                    <h5 className="text-[10px] font-bold uppercase tracking-wider text-pehnava-slate mb-1 flex items-center gap-1">
                                                        <MapPin className="w-3 h-3" /> Delivered To
                                                    </h5>
                                                    <p className="font-bold text-xs text-pehnava-charcoal line-clamp-1">{order.shippingAddress.fullName}</p>
                                                    <p className="text-[10px] text-pehnava-slate line-clamp-2 mt-0.5">
                                                        {order.shippingAddress.city}, {order.shippingAddress.pincode}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Product List - Desktop (Detailed Vertical) */}
                                            <div className="hidden lg:block flex-1 space-y-4">
                                                {order.items.slice(0, 2).map((item: any, idx: number) => (
                                                    <div key={idx} className="flex gap-4 items-start">
                                                        <div className="w-16 h-20 rounded-md border border-pehnava-border bg-white p-1 flex-shrink-0">
                                                            <img
                                                                src={item.image || "/placeholder-product.jpg"}
                                                                alt={item.name}
                                                                className="w-full h-full object-cover rounded-sm"
                                                            />
                                                        </div>
                                                        <div>
                                                            <h4 className="font-bold text-pehnava-charcoal text-sm line-clamp-1">{item.name}</h4>
                                                            <div className="flex flex-wrap gap-2 mt-1">
                                                                {item.size && (
                                                                    <span className="text-xs text-pehnava-slate bg-pehnava-offWhite px-2 py-0.5 rounded">
                                                                        Size: {item.size.toUpperCase()}
                                                                    </span>
                                                                )}
                                                                <span className="text-xs font-bold text-pehnava-charcoal bg-pehnava-offWhite px-2 py-0.5 rounded">
                                                                    Qty: {item.quantity}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                                {order.items.length > 2 && (
                                                    <p className="text-xs text-pehnava-primary font-bold pl-20">
                                                        + {order.items.length - 2} more items
                                                    </p>
                                                )}
                                            </div>

                                            {/* Address & Actions */}
                                            <div className="hidden lg:flex lg:w-1/3 flex-col justify-between border-t lg:border-t-0 lg:border-l border-pehnava-border/40 pt-4 lg:pt-0 lg:pl-6">
                                                <div className="mb-4">
                                                    <h5 className="text-xs font-bold uppercase tracking-wider text-pehnava-slate mb-2 flex items-center gap-1">
                                                        <MapPin className="w-3 h-3" /> Delivered To
                                                    </h5>
                                                    <p className="font-bold text-sm text-pehnava-charcoal">{order.shippingAddress.fullName}</p>
                                                    <p className="text-sm text-pehnava-slate line-clamp-2 leading-relaxed mt-0.5">
                                                        {order.shippingAddress.city}, {order.shippingAddress.pincode}
                                                    </p>
                                                </div>

                                                <button className="w-full py-2 rounded-lg border border-pehnava-border hover:border-pehnava-primary hover:text-pehnava-primary bg-white text-pehnava-charcoal font-bold text-sm transition-all flex items-center justify-center gap-2 group-hover/card:shadow-sm">
                                                    View Details <ChevronRight className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Mobile Footer (Status Text) */}
                                        <div className="mt-4 pt-4 border-t border-pehnava-border/40 flex sm:hidden justify-between items-center">
                                            <span className="text-xs font-bold text-pehnava-slate">
                                                {order.items.length} {order.items.length === 1 ? 'Item' : 'Items'}
                                            </span>
                                            <span className="text-sm font-bold text-pehnava-primary flex items-center">
                                                Details <ChevronRight className="w-4 h-4" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyOrdersPage;