import { Trash2, ShoppingBag, ArrowRight, ShieldCheck, CreditCard, Loader2, ChevronDown, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useCheckout, useGetCart, useRemoveFromCart, useUpdateCartQuantity } from "../../services/useApiHook";
import { useQueryClient } from "@tanstack/react-query";

const QuantityModal = ({
    isOpen,
    onClose,
    currentQuantity,
    maxStock,
    onSelect
}: {
    isOpen: boolean;
    onClose: () => void;
    currentQuantity: number;
    maxStock: number;
    onSelect: (qty: number) => void;
}) => {
    if (!isOpen) return null;

    const availableStock = Math.min(maxStock, 10);
    const quantities = Array.from({ length: availableStock }, (_, i) => i + 1);

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/10  transition-all animate-in fade-in duration-200" onClick={onClose}>
            <div
                className="w-full sm:w-[400px] bg-white rounded-t-2xl sm:rounded-2xl shadow-xl overflow-hidden animate-in slide-in-from-bottom duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between p-4 border-b border-pehnava-border/40">
                    <h3 className="text-lg font-bold text-pehnava-charcoal">Select Quantity</h3>
                    <button onClick={onClose} className="p-2 hover:bg-pehnava-offWhite rounded-full transition-colors">
                        <X className="w-5 h-5 text-pehnava-slate" />
                    </button>
                </div>
                <div className="p-4 max-h-[60vh] overflow-y-auto">
                    <div className="grid grid-cols-5 gap-3">
                        {quantities.map((qty) => (
                            <button
                                key={qty}
                                onClick={() => onSelect(qty)}
                                className={`h-12 flex items-center justify-center rounded-xl font-bold text-lg transition-all ${qty === currentQuantity
                                    ? "bg-pehnava-charcoal text-white shadow-md scale-105"
                                    : "bg-pehnava-offWhite text-pehnava-charcoal hover:bg-pehnava-primary/10 hover:text-pehnava-primary hover:border-pehnava-primary/30 border border-transparent"
                                    }`}
                            >
                                {qty}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const CartPage = () => {
    const queryClient = useQueryClient();
    const { data: cartData, isLoading: isCartLoading } = useGetCart();
    const { mutate: updateQuantity } = useUpdateCartQuantity();
    const { mutate: removeProduct } = useRemoveFromCart();
    const [activeQuantityModalId, setActiveQuantityModalId] = useState<string | null>(null);
    const { data: checkoutData, isLoading: isCheckoutLoading } = useCheckout();

    const items = cartData?.data?.items || [];

    const handleUpdateQuantity = (item: any, newQuantity: number) => {
        if (newQuantity < 1) return;
        updateQuantity({
            productId: item.product._id,
            quantity: newQuantity,
            size: item.variant.size,
            color: item.variant.color
        }, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["checkout"] });
            }
        });
    };

    const handleRemove = (item: any) => {
        removeProduct({
            productId: item.product._id,
            size: item.variant.size,
            color: item.variant.color
        }, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["checkout"] });
            }
        });
    };

    if (isCartLoading) {
        return (
            <div className="min-h-screen bg-pehnava-offWhite flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-pehnava-primary animate-spin" />
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-pehnava-offWhite py-20 px-4 flex flex-col items-center justify-center gap-6">
                <div className="p-6 bg-white rounded-full shadow-soft">
                    <ShoppingBag className="w-12 h-12 text-pehnava-slate" />
                </div>
                <h1 className="text-2xl font-bold text-pehnava-charcoal">Your bag is empty</h1>
                <p className="text-pehnava-slate">Looks like you haven't added anything to your bag yet.</p>
                <Link to="/shop" className="px-8 py-3 bg-pehnava-primary text-white font-bold rounded-xl hover:shadow-glow transition-all">
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-pehnava-offWhite py-8 sm:py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">

                {/* Page Heading */}
                <div className="mb-8 sm:mb-12 text-center sm:text-left border-b border-pehnava-border/40 pb-6">
                    <h1 className="text-2xl sm:text-4xl font-bold text-pehnava-charcoal tracking-tight">
                        Your <span className="text-transparent bg-clip-text bg-linear-to-r from-pehnava-primary to-pehnava-accent">Shopping Bag</span>
                    </h1>
                    <p className="mt-2 text-sm sm:text-base text-pehnava-slate flex items-center justify-center sm:justify-start gap-2">
                        <ShoppingBag className="w-4 h-4" />
                        <span>{items.length} {items.length === 1 ? 'item' : 'items'} in your bag</span>
                    </p>
                </div>

                {/* Cart Layout */}
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">

                    {/* Cart Items List */}
                    <div className="flex-1 space-y-4 sm:space-y-6">
                        {items.map((item: any) => (
                            <div
                                key={item._id}
                                className="group bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-5 flex flex-row gap-4 sm:gap-6 hover:shadow-lg transition-all duration-300 border border-transparent hover:border-pehnava-primary/10"
                            >
                                {/* Image */}
                                <Link to={`/product/${item.product._id}`} className="w-24 sm:w-32 aspect-[3/4] shrink-0 rounded-xl sm:rounded-2xl bg-pehnava-lightGray overflow-hidden relative block">
                                    <img
                                        src={item.product.images?.[0]}
                                        alt={item.product.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                </Link>

                                {/* Details */}
                                <div className="flex-1 flex flex-col justify-between py-1">
                                    <div>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <Link to={`/product/${item.product._id}`}>
                                                    <h3 className="text-base sm:text-lg font-bold text-pehnava-charcoal group-hover:text-pehnava-primary transition-colors cursor-pointer line-clamp-2">
                                                        {item.product.name}
                                                    </h3>
                                                </Link>
                                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[10px] sm:text-xs font-bold text-pehnava-charcoal bg-pehnava-offWhite px-2 py-0.5 rounded border border-pehnava-border/30">
                                                            Size: {item.variant.size.toUpperCase()}
                                                        </span>
                                                        <span className="text-[10px] sm:text-xs font-medium text-pehnava-slate flex items-center gap-1.5 uppercase tracking-wider">
                                                            <span
                                                                className="w-2 h-2 rounded-full border border-black/10"
                                                                style={{ backgroundColor: item.variant.color }}
                                                            ></span>
                                                            {item.variant.color}
                                                        </span>
                                                    </div>

                                                    {item.variant.discountPrice < item.variant.price && (
                                                        <span className="text-[10px] sm:text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded border border-green-100">
                                                            {Math.round(((item.variant.price - item.variant.discountPrice) / item.variant.price) * 100)}% OFF
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-xs text-pehnava-slate/70 line-clamp-1 italic mt-1">
                                                    {item.product.description}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => handleRemove(item)}
                                                className="text-pehnava-slate hover:text-red-500 transition-colors p-1.5 sm:p-2 hover:bg-red-50 rounded-full cursor-pointer -mr-2 sm:mr-0"
                                            >
                                                <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-0 mt-2 sm:mt-0">
                                        {/* Quantity Control */}
                                        <div className="flex flex-col gap-1.5">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setActiveQuantityModalId(item._id);
                                                }}
                                                disabled={item.isOutOfStock || item.variant.stock === 0}
                                                className="flex items-center gap-1.5 sm:gap-2 px-2 py-1.5 sm:px-3 sm:py-2 bg-pehnava-offWhite rounded-lg border border-pehnava-border/40 hover:border-pehnava-primary/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer"
                                            >
                                                <span className="text-xs sm:text-sm font-bold text-pehnava-charcoal">
                                                    <span className="hidden sm:inline">Qty: </span>{item.quantity}
                                                </span>
                                                <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-pehnava-slate group-hover:text-pehnava-primary transition-colors" />
                                            </button>
                                            <div className="text-[10px] font-medium ml-1">
                                                {item.isOutOfStock || item.variant.stock === 0 ? (
                                                    <span className="text-red-500 font-bold">Out of Stock</span>
                                                ) : item.variant.stock < 11 ? (
                                                    <span className="text-orange-600 font-bold">Only {item.variant.stock} left</span>
                                                ) : null}
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-end gap-1">
                                            <span className="text-base sm:text-lg font-bold text-pehnava-charcoal">
                                                ₹{(item.variant.discountPrice * item.quantity).toLocaleString('en-IN')}
                                            </span>
                                            {item.variant.price > item.variant.discountPrice && (
                                                <span className="text-xs text-pehnava-slate line-through opacity-60">
                                                    ₹{(item.variant.price * item.quantity).toLocaleString('en-IN')}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="pt-2 sm:pt-6">
                            <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-pehnava-primary hover:text-pehnava-primaryDark transition-colors group">
                                <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                                Continue Shopping
                            </Link>
                        </div>
                    </div>

                    {/* Order Summary (Sticky) */}
                    <div className="min-w-full lg:min-w-[380px] h-fit lg:sticky lg:top-24">
                        <div className="bg-white rounded-2xl sm:rounded-[2rem] p-6 sm:p-8 shadow-large border border-pehnava-border/40 relative overflow-hidden">
                            {/* Decorative Blur */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-pehnava-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                            <h2 className="text-lg sm:text-xl font-bold text-pehnava-charcoal mb-6 sm:mb-8 relative z-10">
                                Order Summary
                            </h2>

                            <div className="space-y-4 text-sm relative z-10">
                                <div className="border-t border-dashed border-pehnava-border/60 my-6 pt-6 flex justify-between items-center">
                                    <span className="text-base font-bold text-pehnava-charcoal">Order Total</span>
                                    <span className="text-xl sm:text-2xl font-bold text-pehnava-charcoal">
                                        {isCheckoutLoading ? (
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                        ) : (
                                            `₹${checkoutData?.data?.totalAmount?.toLocaleString('en-IN') || 0}`
                                        )}
                                    </span>
                                </div>
                            </div>

                            <Link
                                to="/checkout/address"
                                className="w-full py-3.5 sm:py-4 rounded-xl bg-pehnava-charcoal text-white font-bold tracking-wide hover:bg-pehnava-primary hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300 relative z-10 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                            >
                                Checkout Now <ArrowRight className="w-4 h-4" />
                            </Link>

                            <div className="mt-6 flex flex-col gap-3 relative z-10">
                                <div className="flex items-center gap-2 text-[10px] sm:text-xs text-pehnava-slate justify-center">
                                    <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
                                    <span>Secure Encrypted Checkout</span>
                                </div>
                                <div className="flex justify-center gap-3 opacity-60 grayscale hover:grayscale-0 transition-all">
                                    <CreditCard className="w-5 h-5" />
                                    <span className="text-xs font-mono border px-1 rounded-sm">UPI</span>
                                    <span className="text-xs font-mono border px-1 rounded-sm">VISA</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {activeQuantityModalId && (
                <QuantityModal
                    isOpen={!!activeQuantityModalId}
                    onClose={() => setActiveQuantityModalId(null)}
                    currentQuantity={items.find((i: any) => i._id === activeQuantityModalId)?.quantity || 1}
                    maxStock={items.find((i: any) => i._id === activeQuantityModalId)?.variant?.stock || 0}
                    onSelect={(qty) => {
                        const item = items.find((i: any) => i._id === activeQuantityModalId);
                        if (item) {
                            handleUpdateQuantity(item, qty);
                        }
                        setActiveQuantityModalId(null);
                    }}
                />
            )}
        </div>
    );
};

export default CartPage;
