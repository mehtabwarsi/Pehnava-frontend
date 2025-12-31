import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ShoppingCart, ChevronRight, Minus, Plus, Check, Truck, Shield, RefreshCw } from 'lucide-react';
import ProductCard from '../../components/Home/ProductCard';
import { products } from '../../temp/productData';
import ColorSelector from '../../components/ProductDetail/ColorSelector';
import QuantitySelector from '../../components/ProductDetail/QuantitySelector';
import CustomerReviews from '../../components/ProductDetail/CustomerReviews';
import RatingStars from '../../components/ProductDetail/RatingStars';

const ProductDetailsPage = () => {
    const { id } = useParams();
    const [, setSelectedImage] = useState(0); // selectedImage is write-only for now (or for lightbox later)
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [isFavorited, setIsFavorited] = useState(false);

    // Mock product data - in real app, fetch based on id
    const product = {
        id: id || '1',
        title: 'Premium Cotton Kurta',
        price: 2499,
        originalPrice: 3999,
        rating: 4.5,
        reviews: 128,
        description: 'Elevate your traditional wardrobe with this premium cotton kurta. Crafted from the finest quality fabric, this piece combines comfort with style. Perfect for festive occasions, weddings, or casual gatherings.',
        images: [
            'https://assets-jiocdn.ajio.com/medias/sys_master/root1/20251222/BQCJ/69493302239b37265a93f53b/-473Wx593H-442767969-black-MODEL3.jpg',
            'https://assets-jiocdn.ajio.com/medias/sys_master/root1/20251222/TIS8/69494149239b37265a95d77c/-473Wx593H-442767969-black-MODEL4.jpg',
            'https://assets-jiocdn.ajio.com/medias/sys_master/root1/20251222/2Cxh/69493f73720fb821d3a34993/-473Wx593H-442767969-black-MODEL5.jpg',
            'https://assets-jiocdn.ajio.com/medias/sys_master/root1/20251222/ypWB/6949431c720fb821d3a3b063/-473Wx593H-442767969-black-MODEL6.jpg',
            'https://assets-jiocdn.ajio.com/medias/sys_master/root1/20251222/NuE6/694930fc720fb821d3a17b6e/-473Wx593H-442767969-black-MODEL7.jpg'
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: [
            { name: 'Navy Blue', code: '#1e3a8a' },
            { name: 'Maroon', code: '#7f1d1d' },
            { name: 'Emerald', code: '#065f46' },
            { name: 'White', code: '#ffffff' },
        ],
        features: [
            'Premium 100% Cotton Fabric',
            'Traditional Embroidery Work',
            'Comfortable Regular Fit',
            'Easy Machine Wash',
        ],
        specifications: {
            'Material': '100% Cotton',
            'Fit': 'Regular',
            'Pattern': 'Solid',
            'Sleeve': 'Full Sleeve',
            'Occasion': 'Festive & Casual',
            'Care': 'Machine Wash',
        }
    };

    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

    const handleQuantityChange = (delta: number) => {
        const newQuantity = quantity + delta;
        if (newQuantity >= 1 && newQuantity <= 10) {
            setQuantity(newQuantity);
        }
    };



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
                            {product.images.map((image, index) => (
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

                                    {/* Overlays: Currently on first image. Can be adapted for all images in carousel if requested. */}
                                    {index === 0 && (
                                        <>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setIsFavorited(!isFavorited);
                                                }}
                                                className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md shadow-medium transition-all duration-300 ${isFavorited
                                                    ? 'bg-pehnava-accent text-white scale-110'
                                                    : 'bg-white/80 text-pehnava-charcoal hover:bg-pehnava-accent hover:text-white'
                                                    }`}
                                            >
                                                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
                                            </button>
                                        </>
                                    )}
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
                                    ₹{product.price.toLocaleString('en-IN')}
                                </span>
                                <span className="text-xl text-slate-600 line-through">
                                    ₹{product.originalPrice.toLocaleString('en-IN')}
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

                        <ColorSelector
                            colors={product.colors}
                            selectedColor={selectedColor}
                            setSelectedColor={setSelectedColor}
                        />

                        {/* Size Selection */}
                        <div>
                            <h3 className="text-xs md:text-sm font-bold text-pehnava-charcoal uppercase tracking-wider mb-3">
                                Select Size
                            </h3>
                            <div className="flex flex-wrap gap-2 md:gap-3">
                                {product.sizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`px-4 py-2 text-sm md:px-6 md:py-3 md:text-base rounded-xl font-bold transition-all duration-300 ${selectedSize === size
                                            ? 'bg-pehnava-primary text-white shadow-large scale-105'
                                            : 'bg-white text-pehnava-charcoal ring-1 ring-pehnava-border hover:ring-pehnava-primary shadow-soft'
                                            }`}
                                    >
                                        {size}
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
                            <button className="flex-[1.5] flex items-center justify-center gap-2 md:gap-3 px-4 py-3 md:px-6 md:py-4 bg-[#ff3f6c] text-white font-bold text-xs md:text-sm tracking-widest uppercase rounded-md shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                                <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
                                Add to Bag
                            </button>
                            <button
                                onClick={() => setIsFavorited(!isFavorited)}
                                className={`flex-1 flex items-center justify-center gap-2 md:gap-3 px-4 py-3 md:px-6 md:py-4 border font-bold text-xs md:text-sm tracking-widest uppercase rounded-md transition-all duration-300 ${isFavorited
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
                            {product.features.map((feature, index) => (
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
                            {Object.entries(product.specifications).map(([key, value]) => (
                                <div key={key} className="flex justify-between py-3 border-b border-pehnava-border last:border-0">
                                    <dt className="text-pehnava-slate font-medium text-sm md:text-base">{key}</dt>
                                    <dd className="text-pehnava-charcoal font-bold text-sm md:text-base">{value}</dd>
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
                        {products.slice(0, 8).map((item) => (
                            <ProductCard
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                price={item.price}
                                image={item.image}
                                originalPrice={item.originalPrice}
                                rating={item.rating}
                                isNew={item.isNew}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;