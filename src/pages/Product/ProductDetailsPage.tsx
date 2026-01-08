import { useState } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, ChevronRight, Check, Truck, Shield, RefreshCw } from 'lucide-react';
import ProductCard from '../../components/Home/ProductCard';
import QuantitySelector from '../../components/ProductDetail/QuantitySelector';
import CustomerReviews from '../../components/ProductDetail/CustomerReviews';
import RatingStars from '../../components/ProductDetail/RatingStars';
import { useGetAllProducts, useGetProductById } from '../../services/useApiHook';
import ProductDetailsSkeleton from '../../components/ProductDetail/ProductDetailsSkeleton';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';
import { toggleWishlist } from '../../redux/slices/wishlistSlice';
import { addToCart } from '../../redux/slices/cartSlice';

const ProductDetailsPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);

    const { user } = useSelector((state: RootState) => state.auth);
    const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
    const isFavorited = wishlistItems.some((item: any) => item.id === id);

    const { data: productData, isLoading: isProductLoading } = useGetProductById(id || '');
    const { data: suggestedProductsData, isLoading: isSuggestedLoading } = useGetAllProducts();

    const productApiData = productData?.data;
    const suggestedProducts = suggestedProductsData?.data;

    const location = useLocation();

    const product = {
        id: id || '1',
        title: productApiData?.name,
        price: productApiData?.discountPrice,
        originalPrice: productApiData?.price,
        rating: 4.5,
        reviews: 128,
        description: productApiData?.description,
        images: productApiData?.images,
        sizes: productApiData?.variants?.map((variant: any) => variant.size),
        colors: productApiData?.variants?.map((variant: any) => variant.color),
        features: productApiData?.features,
        specifications: productApiData?.specifications,
    };

    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

    const handleQuantityChange = (delta: number) => {
        const newQuantity = quantity + delta;
        if (newQuantity >= 1 && newQuantity <= 10) {
            setQuantity(newQuantity);
        }
    };

    const handleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!user) {
            navigate("/login");
            return;
        }

        dispatch(toggleWishlist({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.images?.[0] || ""
        }));
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!user) {
            navigate("/login");
            return;
        }

        dispatch(addToCart({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.images?.[0] || "",
            quantity,
            size: selectedSize
        }));
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
                                    className="relative flex-shrink-0 w-[85vw] md:w-auto md:aspect-[3/4] bg-white rounded-md overflow-hidden  group cursor-pointer snap-center"
                                    onClick={() => setSelectedImage(index)} // Optional: specialized view logic
                                >
                                    <img
                                        src={image}
                                        alt={`${product.title} ${index + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
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
                                {product?.sizes?.map((size: any) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`px-4 py-2 text-sm md:px-6 md:py-3 md:text-base rounded-xl font-bold transition-all duration-300 ${selectedSize === size
                                            ? 'bg-pehnava-primary text-white shadow-large scale-105'
                                            : 'bg-white text-pehnava-charcoal ring-1 ring-pehnava-border hover:ring-pehnava-primary shadow-soft'
                                            }`}
                                    >
                                        {size.toUpperCase()}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity */}
                        <QuantitySelector
                            quantity={quantity}
                            onChange={handleQuantityChange}
                        />

                        {/* Action Buttons - Myntra Style */}
                        <div className="flex gap-2 md:gap-4 pt-4 border-t border-pehnava-border">
                            <button onClick={handleAddToCart} className="flex-[1.5] flex items-center justify-center gap-2 md:gap-3 px-4 py-3 md:px-6 md:py-4 bg-[#ff3f6c] text-white font-bold text-xs md:text-sm tracking-widest uppercase rounded-md shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                                <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
                                Add to Bag
                            </button>
                            <button onClick={handleWishlist} className={`flex-1 flex items-center justify-center gap-2 md:gap-3 px-4 py-3 md:px-6 md:py-4 border font-bold text-xs md:text-sm tracking-widest uppercase rounded-md transition-all duration-300 ${isFavorited
                                ? 'border-[#ff3f6c] text-[#ff3f6c] bg-[#ff3f6c]/5'
                                : 'border-pehnava-border text-pehnava-charcoal hover:border-pehnava-charcoal'
                                }`}
                            >
                                <Heart className="w-4 h-4 md:w-5 md:h-5" fill={isFavorited ? "currentColor" : "none"} />
                                <span>Wishlist</span>
                            </button>
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
                                key={item.id}
                                id={item.id}
                                title={item.name}
                                price={item.discountPrice}
                                image={item.images[0]}
                                originalPrice={item.price}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;