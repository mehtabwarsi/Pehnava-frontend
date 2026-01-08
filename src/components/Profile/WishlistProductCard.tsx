import { X, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeFromWishlist } from "../../redux/slices/wishlistSlice";
import { addToCart } from "../../redux/slices/cartSlice";

type WishlistProductCardProps = {
    id: string | number;
    title: string;
    price: number;
    image: string;
    originalPrice?: number;
};

const WishlistProductCard = ({ id, title, price, image, originalPrice }: WishlistProductCardProps) => {
    const dispatch = useDispatch();
    const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : null;

    const handleRemove = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(removeFromWishlist(id));
    };

    const handleMoveToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(addToCart({ id, title, price, image, quantity: 1 }));
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

                {/* Move to Bag Quick Action */}
                <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <button
                        onClick={handleMoveToCart}
                        className="w-full py-2.5 bg-pehnava-charcoal/90 backdrop-blur-md text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-pehnava-primary transition-colors shadow-large"
                    >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        Move to Bag
                    </button>
                </div>
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
