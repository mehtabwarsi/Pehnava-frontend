import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, ShieldCheck, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";

const CartPage = () => {
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
                        <span>2 items in your bag</span>
                    </p>
                </div>

                {/* Cart Layout */}
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">

                    {/* Cart Items List */}
                    <div className="flex-1 space-y-4 sm:space-y-6">
                        {[1, 2].map((item) => (
                            <div
                                key={item}
                                className="group bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-5 flex flex-row gap-4 sm:gap-6 hover:shadow-lg transition-all duration-300 border border-transparent hover:border-pehnava-primary/10"
                            >
                                {/* Image */}
                                <div className="w-24 sm:w-32 aspect-[3/4] shrink-0 rounded-xl sm:rounded-2xl bg-pehnava-lightGray overflow-hidden relative">
                                    <img
                                        src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c"
                                        alt="Product"
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                </div>

                                {/* Details */}
                                <div className="flex-1 flex flex-col justify-between py-1">
                                    <div>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-base sm:text-lg font-bold text-pehnava-charcoal group-hover:text-pehnava-primary transition-colors cursor-pointer line-clamp-2">
                                                    Casual Cotton Shirt
                                                </h3>
                                                <p className="text-xs sm:text-sm text-pehnava-slate mt-1">Size: M • Color: Navy</p>
                                            </div>
                                            <button className="text-pehnava-slate hover:text-red-500 transition-colors p-1.5 sm:p-2 hover:bg-red-50 rounded-full cursor-pointer -mr-2 sm:mr-0">
                                                <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-0 mt-2 sm:mt-0">
                                        {/* Quantity Control */}
                                        <div className="flex items-center gap-3 bg-pehnava-offWhite rounded-lg sm:rounded-xl p-1 border border-pehnava-border/40 w-fit">
                                            <button className="h-7 w-7 sm:h-8 sm:w-8 rounded-md sm:rounded-lg bg-white shadow-xs flex items-center justify-center text-pehnava-charcoal hover:text-pehnava-primary active:scale-95 transition-all cursor-pointer">
                                                <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                            </button>
                                            <span className="text-xs sm:text-sm font-bold w-4 text-center">1</span>
                                            <button className="h-7 w-7 sm:h-8 sm:w-8 rounded-md sm:rounded-lg bg-white shadow-xs flex items-center justify-center text-pehnava-charcoal hover:text-pehnava-primary active:scale-95 transition-all cursor-pointer">
                                                <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                            </button>
                                        </div>

                                        <span className="text-base sm:text-lg font-bold text-pehnava-charcoal">
                                            ₹1,299
                                        </span>
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
                                    <span className="font-medium text-pehnava-charcoal">₹2,598</span>
                                </div>

                                <div className="flex justify-between text-pehnava-slate">
                                    <span>Shipping Estimate</span>
                                    <span className="font-medium text-green-600">Free</span>
                                </div>

                                <div className="flex justify-between text-pehnava-slate">
                                    <span>Tax Estimate</span>
                                    <span className="font-medium text-pehnava-charcoal">₹120</span>
                                </div>

                                <div className="border-t border-dashed border-pehnava-border/60 my-6 pt-6 flex justify-between items-center">
                                    <span className="text-base font-bold text-pehnava-charcoal">Order Total</span>
                                    <span className="text-xl sm:text-2xl font-bold text-pehnava-charcoal">₹2,718</span>
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
