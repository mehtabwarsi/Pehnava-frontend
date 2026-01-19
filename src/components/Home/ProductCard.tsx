import { Heart, Star } from "lucide-react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import type { RootState } from "../../redux/store";
import { useAddToWishList, useGetWishList } from '../../services/useApiHook';

type ProductCardProps = {
    id: string | number;
    slug: string;
    title: string;
    price: number;
    image?: string;
    originalPrice?: number;
    rating?: number;
    isNew?: boolean;
};

const ProductCard = ({ id, slug, title, price, image, originalPrice, rating = 4.5, isNew = false }: ProductCardProps) => {
    const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : null;
    const navigate = useNavigate();

    const { user } = useSelector((state: RootState) => state.auth);
    const { data: wishlistData } = useGetWishList({
        enabled: !!user,
    });
    const { mutate: addToWishList } = useAddToWishList();
    const isFavorited = wishlistData?.data?.items?.some((item: any) => item._id === id);

    const handleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!user) {
            navigate("/login");
            return;
        }

        addToWishList(id);
    };

    return (
        <Link to={`/product/${slug}`} className="block group relative bg-white rounded-lg md:rounded-lg overflow-hidden shadow-soft hover:shadow-large transition-all duration-500 hover:-translate-y-1">
            {/* Image Container */}
            <div className="relative aspect-4/5 overflow-hidden bg-pehnava-lightGray">
                {image ? (
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-pehnava-slate font-medium">
                        No Image
                    </div>
                )}

                {/* Badges */}
                <div className="absolute top-2 md:top-4 left-2 md:left-4 flex flex-col gap-1 md:gap-2">
                    {isNew && (
                        <span className="px-2 md:px-3 py-0.5 md:py-1 bg-pehnava-primary text-white text-[8px] md:text-[10px] font-bold uppercase tracking-widest rounded-full shadow-glow animate-fadeIn">
                            New
                        </span>
                    )}
                    {discount && (
                        <span className="px-2 md:px-3 py-0.5 md:py-1 bg-pehnava-accent/90 text-white text-[8px] md:text-[10px] font-bold uppercase tracking-widest rounded-full shadow-medium">
                            {discount}% OFF
                        </span>
                    )}
                </div>

                {/* Wishlist Button */}
                <button
                    onClick={handleWishlist}
                    className="absolute top-2 md:top-4 right-2 md:right-4 p-1.5 md:p-2.5 bg-white/80 backdrop-blur-md rounded-full text-pehnava-charcoal hover:bg-pehnava-accent hover:text-white transition-all duration-300 shadow-soft group/wishlist"
                >
                    <Heart className={`w-3.5 h-3.5 md:w-4 h-4 transition-transform group-hover/wishlist:scale-110 ${isFavorited ? 'fill-pehnava-accent text-pehnava-accent' : ''}`} />
                </button>

                {/* Quick Add Button - Desktop Hover / Mobile Icon */}
            </div>

            {/* Content */}
            <div className="p-3 md:p-5">
                <div className="flex items-center gap-0.5 md:gap-1 mb-1 md:mb-2">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`w-2.5 h-2.5 md:w-3 h-3 ${i < Math.floor(rating) ? "fill-pehnava-primary text-pehnava-primary" : "text-pehnava-slate/30"}`}
                        />
                    ))}
                    <span className="text-[9px] md:text-[11px] text-pehnava-slate font-medium ml-0.5 md:ml-1">({rating})</span>
                </div>

                <h3 className="text-pehnava-slate font-medium text-sm md:text-lg mb-0.5 md:mb-1 truncate group-hover:text-pehnava-primary transition-colors">
                    {title}
                </h3>

                <div className="flex items-center gap-1.5 md:gap-2">
                    <span className="text-slate-600 font-semibold text-base md:text-xl">
                        ₹{price.toLocaleString('en-IN')}
                    </span>
                    {originalPrice && (
                        <span className="text-slate-600/70 line-through text-[10px] md:text-sm">
                            ₹{originalPrice.toLocaleString('en-IN')}
                        </span>
                    )}
                </div>
            </div>

            {/* Subtle Border Glow on Hover */}
            <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-transparent group-hover:ring-pehnava-primary/10 transition-all duration-500 rounded-2xl md:rounded-3xl" />
        </Link>
    );
};

export default ProductCard;
