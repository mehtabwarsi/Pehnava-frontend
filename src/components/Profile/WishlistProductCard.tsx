import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { useAddToWishList } from "../../services/useApiHook";

type WishlistProductCardProps = {
    id: string | number;
    title: string;
    price: number;
    image: string;
    originalPrice?: number;
};

const WishlistProductCard = ({ id, title, price, image, originalPrice }: WishlistProductCardProps) => {
    // const dispatch = useDispatch();
    const { mutate: toggleWishlist } = useAddToWishList();
    const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : null;

    const handleRemove = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(id);
    };


    return (
        <div className="group relative bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-large transition-all duration-500 border border-pehnava-border/30 hover:border-pehnava-primary/20 flex flex-col h-full">
            {/* Image Section */}
            <Link to={`/product/${id}`} className="relative aspect-[3/4] overflow-hidden bg-pehnava-lightGray block">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Remove Button */}
                <button
                    onClick={handleRemove}
                    className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full text-pehnava-slate hover:text-red-500 hover:bg-white transition-all shadow-soft z-10"
                    title="Remove from wishlist"
                >
                    <X className="w-4 h-4" />
                </button>

            </Link>

            {/* Content Section */}
            <div className="p-4 flex flex-col flex-1">
                <Link to={`/product/${id}`} className="block mb-2">
                    <h3 className="text-pehnava-charcoal font-semibold text-sm sm:text-base line-clamp-1 group-hover:text-pehnava-primary transition-colors">
                        {title}
                    </h3>
                </Link>

                <div className="mt-auto flex items-baseline gap-2">
                    <span className="text-pehnava-charcoal font-bold text-base sm:text-lg">
                        ₹{price.toLocaleString('en-IN')}
                    </span>
                    {originalPrice && (
                        <>
                            <span className="text-pehnava-slate/60 line-through text-xs sm:text-sm">
                                ₹{originalPrice.toLocaleString('en-IN')}
                            </span>
                            <span className="text-pehnava-accent text-[10px] sm:text-xs font-bold uppercase tracking-tight">
                                ({discount}% OFF)
                            </span>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WishlistProductCard;
