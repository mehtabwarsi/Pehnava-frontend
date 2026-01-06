import { Star } from "lucide-react";

const CustomerReviews = ({ product }: any) => {
    return (
        <div className="mt-10 md:mt-16 bg-white rounded-2xl p-5 md:p-8 shadow-medium">
            <div className="flex flex-col md:flex-row gap-8 md:gap-12">

                {/* Rating Summary */}
                <div className="w-full md:w-1/3 space-y-6">
                    <h2 className="text-2xl font-bold text-pehnava-charcoal">
                        Ratings & Reviews
                    </h2>

                    <div className="flex items-end gap-4">
                        <span className="text-6xl font-bold text-pehnava-charcoal">
                            {product?.rating}
                        </span>
                        <div className="mb-2">
                            <div className="flex items-center gap-1 mb-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-5 h-5 ${i < Math.floor(product?.rating)
                                            ? 'fill-pehnava-primary text-pehnava-primary'
                                            : 'text-pehnava-slate/30'
                                            }`}
                                    />
                                ))}
                            </div>
                            <p className="text-pehnava-slate text-sm font-medium">
                                Based on {product?.reviews} reviews
                            </p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {[5, 4, 3, 2, 1].map((star) => (
                            <div key={star} className="flex items-center gap-3 text-sm">
                                <div className="flex items-center gap-1 w-12">
                                    <span className="font-bold text-pehnava-charcoal">
                                        {star}
                                    </span>
                                    <Star className="w-3 h-3 text-pehnava-slate" />
                                </div>
                                <div className="flex-1 h-2 bg-pehnava-lightGray rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-pehnava-primary rounded-full transition-all duration-500"
                                        style={{
                                            width:
                                                star === 5
                                                    ? '60%'
                                                    : star === 4
                                                        ? '25%'
                                                        : star === 3
                                                            ? '10%'
                                                            : '5%',
                                        }}
                                    />
                                </div>
                                <span className="text-pehnava-slate w-8 text-right">
                                    {star === 5
                                        ? '60%'
                                        : star === 4
                                            ? '25%'
                                            : star === 3
                                                ? '10%'
                                                : '5%'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Reviews List */}
                <div className="w-full md:w-2/3">
                    <h3 className="text-lg font-bold text-pehnava-charcoal mb-6">
                        Customer Reviews (3)
                    </h3>

                    <div className="space-y-6">

                        {/* Review 1 */}
                        <div className="pb-6 border-b border-pehnava-border">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-full overflow-hidden bg-pehnava-lightGray">
                                    <img
                                        src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="font-bold">Rahul Kumar</p>
                                    <div className="flex items-center gap-2">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className="w-3 h-3 fill-pehnava-primary text-pehnava-primary"
                                            />
                                        ))}
                                        <span className="text-xs text-pehnava-slate">
                                            2 days ago
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-pehnava-darkSlate text-sm">
                                "Absolutely love the fabric quality! It fits perfectly and feels very premium."
                            </p>
                        </div>

                        {/* Review 2 */}
                        <div className="pb-6 border-b border-pehnava-border">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-full bg-pehnava-lightGray flex items-center justify-center font-bold">
                                    SJ
                                </div>
                                <div>
                                    <p className="font-bold">Sarah Jenkins</p>
                                    <div className="flex items-center gap-2">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-3 h-3 ${i < 4
                                                    ? 'fill-pehnava-primary text-pehnava-primary'
                                                    : 'text-pehnava-slate/30'
                                                    }`}
                                            />
                                        ))}
                                        <span className="text-xs text-pehnava-slate">
                                            1 week ago
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-pehnava-darkSlate text-sm">
                                "Beautiful color and design. Overall a great purchase!"
                            </p>
                        </div>

                        {/* Review 3 */}
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-full overflow-hidden bg-pehnava-lightGray">
                                    <img
                                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="font-bold">Amit Patel</p>
                                    <div className="flex items-center gap-2">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className="w-3 h-3 fill-pehnava-primary text-pehnava-primary"
                                            />
                                        ))}
                                        <span className="text-xs text-pehnava-slate">
                                            3 weeks ago
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-pehnava-darkSlate text-sm">
                                "Best kurta I've bought online. Will definitely buy more colors."
                            </p>
                        </div>

                    </div>

                    <button className="mt-8 text-pehnava-primary font-bold hover:underline text-sm">
                        View All 128 Reviews
                    </button>
                </div>

            </div>
        </div>
    );
};

export default CustomerReviews;
