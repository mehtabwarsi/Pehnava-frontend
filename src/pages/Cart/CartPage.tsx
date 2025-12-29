import { Minus, Plus, Trash2 } from "lucide-react";

const CartPage = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">

            {/* Page Heading */}
            <div className="mb-10">
                <h1 className="text-2xl sm:text-3xl font-medium text-pehnava-charcoal">
                    Shopping Cart
                </h1>
                <p className="mt-2 text-sm sm:text-base text-pehnava-slate">
                    Review your items before checkout
                </p>
            </div>

            {/* Cart Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Cart Item */}
                    {[1, 2].map((item) => (
                        <div
                            key={item}
                            className="
                bg-white rounded-2xl shadow-soft
                p-4 sm:p-6
                flex flex-col sm:flex-row
                gap-4 sm:gap-6
              "
                        >
                            {/* Image */}
                            <div className="w-full sm:w-28 h-40 sm:h-28 rounded-xl bg-pehnava-lightGray overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c"
                                    alt="Product"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Details */}
                            <div className="flex-1 flex flex-col gap-2">
                                <h3 className="text-base sm:text-lg font-medium text-pehnava-charcoal">
                                    Casual Cotton Shirt
                                </h3>
                                <p className="text-sm text-pehnava-slate">
                                    Size: M
                                </p>

                                <span className="text-sm sm:text-base font-semibold text-slate-600">
                                    ₹1,299
                                </span>

                                {/* Quantity + Remove */}
                                <div className="flex items-center justify-between mt-3">
                                    <div className="flex items-center gap-3">
                                        <button className="h-8 w-8 rounded-full border flex items-center justify-center">
                                            <Minus className="w-4 h-4" />
                                        </button>

                                        <span className="text-sm font-medium">1</span>

                                        <button className="h-8 w-8 rounded-full border flex items-center justify-center">
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <button className="text-red-500 text-sm hover:underline flex items-center gap-1">
                                        <Trash2 className="w-4 h-4" />
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>

                {/* Summary */}
                <div className="bg-white rounded-2xl shadow-soft p-6 h-fit">

                    <h2 className="text-lg font-medium text-pehnava-charcoal mb-6">
                        Order Summary
                    </h2>

                    <div className="space-y-4 text-sm">
                        <div className="flex justify-between">
                            <span className="text-pehnava-slate">Subtotal</span>
                            <span className="text-pehnava-charcoal">₹2,598</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-pehnava-slate">Shipping</span>
                            <span className="text-pehnava-charcoal">Free</span>
                        </div>

                        <div className="border-t pt-4 flex justify-between text-base font-semibold">
                            <span>Total</span>
                            <span>₹2,598</span>
                        </div>
                    </div>

                    <button className="mt-8 w-full py-3 rounded-xl bg-pehnava-charcoal text-white font-semibold hover:bg-pehnava-primary transition">
                        Proceed to Checkout
                    </button>

                </div>
            </div>
        </div>
    );
};

export default CartPage;
