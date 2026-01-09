import { Link, useNavigate } from "react-router-dom";
import { Heart, ArrowRight, ShoppingBag, Sparkles, ChevronLeft } from "lucide-react";
import WishlistProductCard from "../../../components/Profile/WishlistProductCard";
import { useGetWishList } from "../../../services/useApiHook";

const WishListPage = () => {
    const navigate = useNavigate();
    const { data: wishlist, isLoading } = useGetWishList();

    const items = wishlist?.data?.items || [];

    if (isLoading) {
        return (
            <div className="min-h-screen bg-pehnava-offWhite pt-10 sm:pt-20 pb-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pehnava-primary"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-pehnava-offWhite pt-6 pb-20 sm:pt-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">

                {/* Header Section - Centered */}
                <div className="relative mb-12 border-b border-pehnava-border/40 pb-10 text-center flex flex-col items-center">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pehnava-primary/5 rounded-full blur-3xl pointer-events-none" />

                    {/* Back Button */}
                    <button
                        onClick={() => navigate(-1)}
                        className="absolute left-0 top-0 p-2 hover:bg-white rounded-full transition-colors shadow-soft cursor-pointer z-20 group"
                    >
                        <ChevronLeft className="w-6 h-6 text-pehnava-charcoal group-hover:scale-110 transition-transform" />
                    </button>

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2.5 bg-pehnava-accent/10 rounded-2xl">
                                <Heart className="w-6 h-6 text-pehnava-accent fill-pehnava-accent" />
                            </div>
                            <span className="text-sm font-bold text-pehnava-accent uppercase tracking-widest">Your Collection</span>
                        </div>

                        <h1 className="text-3xl sm:text-5xl font-bold text-pehnava-charcoal tracking-tight mb-4 text-center">
                            My <span className="text-transparent bg-clip-text bg-linear-to-r from-pehnava-primary to-pehnava-accent">Wishlist</span>
                        </h1>

                        <p className="text-pehnava-slate flex items-center gap-2 text-sm sm:text-base justify-center">
                            <Sparkles className="w-4 h-4 text-amber-400" />
                            <span>{items.length === 0 ? "Your wishlist is currently empty" : `You have ${items.length} premium items saved`}</span>
                        </p>
                    </div>
                </div>

                {items.length === 0 ? (
                    /* Empty State */
                    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
                        <div className="relative mb-8">
                            <div className="absolute inset-0 bg-pehnava-primary/10 rounded-full blur-2xl animate-pulse" />
                            <div className="relative w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-full flex items-center justify-center shadow-xl border border-pehnava-border/20">
                                <Heart className="w-12 h-12 sm:w-16 sm:h-16 text-pehnava-border stroke-[1.5]" />
                            </div>
                        </div>

                        <h2 className="text-2xl sm:text-3xl font-bold text-pehnava-charcoal mb-4">Your Wishlist is Empty</h2>
                        <p className="text-pehnava-slate max-w-md mx-auto mb-10 leading-relaxed text-sm sm:text-base">
                            Save your favorite traditional pieces and they'll appear here. Discover our latest collections to find something you love.
                        </p>

                        <Link
                            to="/shop"
                            className="group flex items-center gap-3 px-8 py-4 bg-pehnava-charcoal text-white font-bold rounded-2xl hover:bg-pehnava-primary transition-all duration-300 shadow-large hover:-translate-y-1"
                        >
                            <ShoppingBag className="w-5 h-5" />
                            Explore Shop
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                ) : (
                    /* Products Grid - Improved Responsiveness */
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 md:gap-10">
                        {items.map((item: any) => (
                            <WishlistProductCard
                                key={item._id}
                                id={item._id}
                                title={item.name}
                                price={item.discountPrice}
                                image={item.images?.[0] || ""}
                                originalPrice={item.price}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default WishListPage;