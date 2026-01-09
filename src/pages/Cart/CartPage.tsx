import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, ShieldCheck, CreditCard, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useGetCart, useRemoveFromCart, useUpdateCartQuantity } from "../../services/useApiHook";

const CartPage = () => {
    const { data: cartData, isLoading: isCartLoading } = useGetCart();
    const { mutate: updateQuantity } = useUpdateCartQuantity();
    const { mutate: removeProduct } = useRemoveFromCart();

    console.log(cartData);

    const items = cartData?.data?.items || [];
    const subtotal = items.reduce((acc: number, item: any) => acc + (item.product.discountPrice * item.quantity), 0);
    const taxEstimate = Math.round(subtotal * 0.05); // 5% tax example
    const orderTotal = subtotal + taxEstimate;

    const handleUpdateQuantity = (productId: string, newQuantity: number) => {
        if (newQuantity < 1) return;
        updateQuantity({ productId, quantity: newQuantity });
    };

    const handleRemove = (productId: string) => {
        removeProduct(productId);
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
                                                    {(() => {
                                                        // Fallback logic order: item.variant object -> item top-level props -> product variant fallback
                                                        const variantObj = item.variant;
                                                        const productVariants = item.product.variants;

                                                        const displaySize = variantObj?.size || item.size;
                                                        // Try to find color in this order:
                                                        // 1. Direct variant object from cart item
                                                        // 2. Direct color prop on cart item
                                                        // 3. Find matching variant in product variants list by size
                                                        // 4. Fallback to first variant's color
                                                        const displayColor = variantObj?.color ||
                                                            item.color ||
                                                            productVariants?.find((v: any) => v.size === displaySize)?.color ||
                                                            productVariants?.[0]?.color;

                                                        if (!displaySize && !displayColor) return null;

                                                        return (
                                                            <div className="flex items-center gap-2">
                                                                {displaySize && (
                                                                    <span className="text-[10px] sm:text-xs font-bold text-pehnava-charcoal bg-pehnava-offWhite px-2 py-0.5 rounded border border-pehnava-border/30">
                                                                        Size: {displaySize.toUpperCase()}
                                                                    </span>
                                                                )}
                                                                {displayColor && (
                                                                    <span className="text-[10px] sm:text-xs font-medium text-pehnava-slate flex items-center gap-1.5 uppercase tracking-wider">
                                                                        <span
                                                                            className="w-2 h-2 rounded-full border border-black/10"
                                                                            style={{ backgroundColor: displayColor }}
                                                                        ></span>
                                                                        {displayColor}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        );
                                                    })()}
                                                    {item.product.price > item.product.discountPrice && (
                                                        <span className="text-[10px] sm:text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded border border-green-100">
                                                            {Math.round(((item.product.price - item.product.discountPrice) / item.product.price) * 100)}% OFF
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-xs text-pehnava-slate/70 line-clamp-1 italic mt-1">
                                                    {item.product.description}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => handleRemove(item.product._id)}
                                                className="text-pehnava-slate hover:text-red-500 transition-colors p-1.5 sm:p-2 hover:bg-red-50 rounded-full cursor-pointer -mr-2 sm:mr-0"
                                            >
                                                <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-0 mt-2 sm:mt-0">
                                        {/* Quantity Control */}
                                        <div className="flex items-center gap-3 bg-pehnava-offWhite rounded-lg sm:rounded-xl p-1 border border-pehnava-border/40 w-fit">
                                            <button
                                                onClick={() => handleUpdateQuantity(item.product._id, item.quantity - 1)}
                                                className="h-7 w-7 sm:h-8 sm:w-8 rounded-md sm:rounded-lg bg-white shadow-xs flex items-center justify-center text-pehnava-charcoal hover:text-pehnava-primary active:scale-95 transition-all cursor-pointer disabled:opacity-50"
                                                disabled={item.quantity <= 1}
                                            >
                                                <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                            </button>
                                            <span className="text-xs sm:text-sm font-bold w-4 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => handleUpdateQuantity(item.product._id, item.quantity + 1)}
                                                className="h-7 w-7 sm:h-8 sm:w-8 rounded-md sm:rounded-lg bg-white shadow-xs flex items-center justify-center text-pehnava-charcoal hover:text-pehnava-primary active:scale-95 transition-all cursor-pointer"
                                            >
                                                <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                            </button>
                                        </div>

                                        <div className="flex flex-col items-end gap-1">
                                            <span className="text-base sm:text-lg font-bold text-pehnava-charcoal">
                                                ₹{(item.product.discountPrice * item.quantity).toLocaleString('en-IN')}
                                            </span>
                                            {item.product.price > item.product.discountPrice && (
                                                <span className="text-xs text-pehnava-slate line-through opacity-60">
                                                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
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
                                <div className="flex justify-between text-pehnava-slate">
                                    <span>Subtotal</span>
                                    <span className="font-medium text-pehnava-charcoal">₹{subtotal.toLocaleString('en-IN')}</span>
                                </div>

                                <div className="flex justify-between text-pehnava-slate">
                                    <span>Shipping Estimate</span>
                                    <span className="font-medium text-green-600">Free</span>
                                </div>

                                <div className="flex justify-between text-pehnava-slate">
                                    <span>Tax Estimate</span>
                                    <span className="font-medium text-pehnava-charcoal">₹{taxEstimate.toLocaleString('en-IN')}</span>
                                </div>

                                <div className="border-t border-dashed border-pehnava-border/60 my-6 pt-6 flex justify-between items-center">
                                    <span className="text-base font-bold text-pehnava-charcoal">Order Total</span>
                                    <span className="text-xl sm:text-2xl font-bold text-pehnava-charcoal">₹{orderTotal.toLocaleString('en-IN')}</span>
                                </div>
                            </div>

                            <button className="w-full py-3.5 sm:py-4 rounded-xl bg-pehnava-charcoal text-white font-bold tracking-wide hover:bg-pehnava-primary hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300 relative z-10 flex items-center justify-center gap-2 cursor-pointer active:scale-95">
                                Checkout Now <ArrowRight className="w-4 h-4" />
                            </button>

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
        </div>
    );
};

export default CartPage;
