import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, ChevronRight, Check, Truck, Shield, RefreshCw, ShoppingBag, Maximize2, X } from 'lucide-react';
import ProductCard from '../../components/Home/ProductCard';
import CustomerReviews from '../../components/ProductDetail/CustomerReviews';
import RatingStars from '../../components/ProductDetail/RatingStars';
import { useGetAllProducts, useGetProductById, useAddToWishList, useGetWishList, useAddToCart, useGetCart } from '../../services/useApiHook';
import ProductDetailsSkeleton from '../../components/ProductDetail/ProductDetailsSkeleton';
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';

const ProductDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [showError, setShowError] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(null);


    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") setPreviewImage(null);
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, []);

    useEffect(() => {
        console.log("Size:", selectedSize, "Color:", selectedColor);
    }, [selectedSize, selectedColor]);


    const { user } = useSelector((state: RootState) => state.auth);
    const { data: wishlistData } = useGetWishList({
        enabled: !!user,
    });
    const { data: cartData } = useGetCart({
        enabled: !!user,
    });
    const { mutate: addToWishList } = useAddToWishList();
    const { mutate: addToCart } = useAddToCart();

    const isFavorited = wishlistData?.data?.items?.some((item: any) => item._id === id);

    const { data: productData, isLoading: isProductLoading } = useGetProductById(id || '');
    const { data: suggestedProductsData, isLoading: isSuggestedLoading } = useGetAllProducts();

    const productApiData = productData?.data;
    const suggestedProducts = suggestedProductsData?.data;

    const sizes = [
        ...new Set(productApiData?.variants?.map((v: any) => v.size))
    ];

    const colors = [
        ...new Set(productApiData?.variants?.map((v: any) => v.color))
    ];



    const product = {
        id: id || '1',
        title: productApiData?.name,
        price: productApiData?.discountPrice,
        originalPrice: productApiData?.price,
        rating: 4.5,
        reviews: 128,
        description: productApiData?.description,
        images: productApiData?.images,
        sizes,
        colors,
        features: productApiData?.features,
        specifications: productApiData?.specifications,
    };


    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

    const handleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!user) {
            navigate("/login");
            return;
        }

        if (id) {
            addToWishList(id);
        }
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!user) {
            navigate("/login");
            return;
        }

        if (!selectedSize || !selectedColor) {
            setShowError(true);
            return;
        }

        const selectedVariant = productApiData?.variants?.find(
            (v: any) =>
                v.size === selectedSize &&
                v.color === selectedColor
        );

        if (!selectedVariant || selectedVariant.stock === 0) {
            toast.error("This variant is out of stock");
            return;
        }

        const isVariantInCart = cartData?.data?.items?.some(
            (item: any) =>
                item.product._id === product.id &&
                item.variant.size === selectedSize &&
                item.variant.color === selectedColor
        );

        if (isVariantInCart) {
            navigate("/cart");
            return;
        }

        setShowError(false);

        addToCart({
            productId: product.id,
            quantity: 1,
            size: selectedSize,
            color: selectedColor,
        });
    };


    if (isProductLoading || isSuggestedLoading) {
        return <ProductDetailsSkeleton />;
    }

    if (!productApiData) {
        return (
            <div className="min-h-screen bg-pehnava-offWhite flex flex-col items-center justify-center gap-4">
                <h1 className="text-2xl font-bold text-pehnava-charcoal">Product not found</h1>
                <Link to="/shop" className="text-pehnava-primary hover:underline">Back to Shop</Link>
            </div>
        );
    }




    return (
        <div className="min-h-screen bg-pehnava-offWhite">
            {/* Breadcrumb */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <nav className="flex items-center gap-2 text-sm">
                    <Link to="/" className="text-pehnava-slate hover:text-pehnava-primary transition-colors">Home</Link>
                    <ChevronRight className="w-4 h-4 text-pehnava-slate" />
                    <Link to="/shop" className="text-pehnava-slate hover:text-pehnava-primary transition-colors">Shop</Link>
                    <ChevronRight className="w-4 h-4 text-pehnava-slate" />
                    <span className="text-pehnava-charcoal font-medium">{product.title}</span>
                </nav>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 md:pb-20">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
                    {/* Image Gallery - Grid Layout */}
                    <div className="w-full lg:w-[55%] space-y-4">
                        <div className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-2 gap-4 no-scrollbar pb-4 md:pb-0">
                            {product.images?.map((image: string, index: number) => (
                                <div
                                    key={index}
                                    onClick={() => setPreviewImage(image)}
                                    className="relative flex-shrink-0 w-[85vw] md:w-auto md:aspect-[3/4] bg-white rounded-md overflow-hidden group cursor-zoom-in snap-center shadow-soft hover:shadow-medium transition-all duration-300"
                                >
                                    <img
                                        src={image}
                                        alt={`${product.title} ${index + 1} `}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 flex items-center justify-center">
                                        <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-large">
                                            <Maximize2 className="w-5 h-5 text-pehnava-charcoal" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product Info - Sticky */}
                    <div className="w-full lg:w-[45%] h-fit lg:sticky lg:top-24 space-y-8">
                        {/* Title & Rating */}
                        <div>
                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-pehnava-charcoal mb-3">
                                {product.title}
                            </h1>
                            <RatingStars rating={product.rating} />

                            {/* Price */}
                            <div className="flex items-baseline gap-3">
                                <span className="text-3xl md:text-4xl font-bold text-slate-600">
                                    ₹{product.price?.toLocaleString('en-IN')}
                                </span>
                                <span className="text-xl text-slate-600 line-through">
                                    ₹{product.originalPrice?.toLocaleString('en-IN')}
                                </span>
                                <span className="px-3 py-1 bg-pehnava-accent/10 text-pehnava-accent text-sm font-bold rounded-full">
                                    Save {discount}%
                                </span>




                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-pehnava-darkSlate leading-relaxed">
                            {product.description}
                        </p>

                        {/* <ColorSelector
                            colors={product.colors}
                            selectedColor={selectedColor}
                            setSelectedColor={setSelectedColor}
                        /> */}

                        {/* Size Selection */}
                        <div>
                            <h3 className="text-xs md:text-sm font-bold text-pehnava-charcoal uppercase tracking-wider mb-3">
                                Select Size
                            </h3>
                            <div className="flex flex-wrap gap-2 md:gap-3">
                                {product?.sizes?.map((size: any) => {
                                    // Calculate total stock for this size across all variants
                                    const sizeVariants = productApiData?.variants?.filter((v: any) => v.size === size) || [];
                                    const totalStock = sizeVariants.reduce((acc: number, v: any) => acc + v.stock, 0);
                                    const isOutOfStock = totalStock === 0;

                                    return (
                                        <div key={size} className="flex flex-col items-center gap-1">
                                            <button
                                                disabled={isOutOfStock}
                                                onClick={() => {
                                                    setSelectedSize(size);
                                                    const firstAvailableVariant = sizeVariants.find((v: any) => v.stock > 0);
                                                    setSelectedColor(firstAvailableVariant?.color || '');
                                                    setShowError(false);
                                                }}
                                                className={`w-12 h-12 flex items-center justify-center rounded-full font-bold transition-all duration-300 relative ${isOutOfStock
                                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                                                    : selectedSize === size
                                                        ? 'bg-pehnava-primary text-white shadow-glow scale-110'
                                                        : 'bg-white text-pehnava-charcoal border border-pehnava-border hover:border-pehnava-primary hover:text-pehnava-primary shadow-soft'
                                                    }`}
                                            >
                                                {size.toUpperCase()}
                                                {isOutOfStock && (
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <div className="w-full h-0.5 bg-gray-400 rotate-45 transform scale-75"></div>
                                                    </div>
                                                )}
                                            </button>
                                            {/* Show remaining stock if less than 11 */}
                                            {!isOutOfStock && totalStock < 11 && (
                                                <span className="text-[10px] text-orange-600 font-bold whitespace-nowrap">
                                                    {totalStock} left
                                                </span>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>


                        {/* Action Buttons */}
                        <div className="flex flex-col mt-6">
                            {showError && (
                                <p className="text-red-500 text-sm font-semibold mb-2">
                                    Please select a size to proceed
                                </p>
                            )}
                            <div className="flex gap-3 md:gap-4">
                                {(() => {
                                    const isVariantInCart =
                                        selectedSize &&
                                        selectedColor &&
                                        cartData?.data?.items?.some(
                                            (item: any) =>
                                                item.product._id === product.id &&
                                                item.variant.size === selectedSize &&
                                                item.variant.color === selectedColor
                                        );

                                    return (
                                        <button
                                            onClick={handleAddToCart}
                                            className={`flex-1 h-12 md:h-14 flex items-center justify-center gap-2 rounded-lg font-bold text-sm md:text-base transition-all duration-300 shadow-soft hover:shadow-large ${isVariantInCart
                                                ? "bg-gradient-to-br from-pehnava-accent to-pehnava-accentDark text-white"
                                                : "bg-pehnava-charcoal text-white hover:bg-pehnava-primary"
                                                }`}
                                        >
                                            <ShoppingBag className="w-5 h-5" />
                                            <span>
                                                {isVariantInCart
                                                    ? "Go to Bag"
                                                    : "Move to Bag"
                                                }
                                            </span>
                                        </button>
                                    );
                                })()}
                                <button
                                    onClick={handleWishlist}
                                    className={`w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-lg transition-all duration-300 ${isFavorited && user
                                        ? 'bg-pehnava-accent/10 text-pehnava-accent hover:bg-pehnava-accent/20 shadow-soft'
                                        : 'bg-white border-2 border-pehnava-border text-pehnava-slate hover:border-pehnava-primary hover:text-pehnava-primary shadow-soft'
                                        }`}
                                >
                                    <Heart className={`w-5 h-5 md:w-6 md:h-6 transition-transform hover:scale-110 ${isFavorited && user ? 'fill-pehnava-accent' : ''}`} />
                                </button>
                            </div>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-pehnava-border">
                            <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-soft">
                                <div className="p-2 bg-pehnava-primary/10 rounded-lg">
                                    <Truck className="w-5 h-5 text-pehnava-primary" />
                                </div>
                                <div>
                                    <p className="text-xs text-pehnava-slate">Free Shipping</p>
                                    <p className="text-sm font-bold text-pehnava-charcoal">On orders above ₹999</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-soft">
                                <div className="p-2 bg-pehnava-accent/10 rounded-lg">
                                    <Shield className="w-5 h-5 text-pehnava-accent" />
                                </div>
                                <div>
                                    <p className="text-xs text-pehnava-slate">Authentic</p>
                                    <p className="text-sm font-bold text-pehnava-charcoal">100% Genuine</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-soft">
                                <div className="p-2 bg-pehnava-secondary/10 rounded-lg">
                                    <RefreshCw className="w-5 h-5 text-pehnava-secondary" />
                                </div>
                                <div>
                                    <p className="text-xs text-pehnava-slate">Easy Returns</p>
                                    <p className="text-sm font-bold text-pehnava-charcoal">7 Days Return</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Details */}
                <div className="mt-10 md:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                    {/* Product Features */}
                    <div className="bg-white rounded-2xl p-5 md:p-8 shadow-medium">
                        <h2 className="text-2xl font-bold text-pehnava-charcoal mb-6">Product Features</h2>
                        <ul className="space-y-3">
                            {product?.features?.map((feature: any, index: number) => (
                                <li key={index} className="flex items-start gap-3">
                                    <div className="p-1 bg-pehnava-primary/10 rounded-full mt-0.5">
                                        <Check className="w-4 h-4 text-pehnava-primary" />
                                    </div>
                                    <span className="text-pehnava-darkSlate">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Specifications */}
                    <div className="bg-white rounded-2xl p-5 md:p-8 shadow-medium">
                        <h2 className="text-2xl font-bold text-pehnava-charcoal mb-6">Specifications</h2>
                        <dl className="space-y-3">
                            {Object.entries(product.specifications || {}).map(([key, value]: any) => (
                                <div key={key} className="flex justify-between py-3 border-b border-pehnava-border last:border-0">
                                    <dt className="text-pehnava-slate font-medium capitalize text-sm md:text-base">{key}</dt>
                                    <dd className="text-pehnava-charcoal font-bold capitalize text-sm md:text-base">{value}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>

                <CustomerReviews productId={product} />
                {/* Related Products */}
                <div className="mt-16 md:mt-24">
                    <h2 className="text-2xl md:text-3xl font-bold text-pehnava-charcoal mb-8">You May Also Like</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                        {(suggestedProducts || []).slice(0, 8).map((item: any) => (
                            <ProductCard
                                key={item._id}
                                id={item._id}
                                title={item.name}
                                price={item.discountPrice}
                                image={item.images[0]}
                                originalPrice={item.price}
                            />
                        ))}
                    </div>
                </div>
            </div>
            {/* Image Preview Modal */}
            {previewImage && (
                <div
                    className="fixed inset-0 z-[10000] bg-pehnava-charcoal/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-fadeIn"
                    onClick={() => setPreviewImage(null)}
                >
                    <button
                        className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all duration-300 transform hover:scale-110 active:scale-95"
                        onClick={() => setPreviewImage(null)}
                    >
                        <X className="w-6 h-6" />
                    </button>
                    <div
                        className="relative max-w-4xl w-full h-full flex items-center justify-center p-2"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={previewImage}
                            alt="Preview"
                            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-scaleIn"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetailsPage;