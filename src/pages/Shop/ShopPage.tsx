import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../../components/Home/ProductCard";
import { products } from "../../temp/productData";
import { SlidersHorizontal, ChevronDown, Filter } from "lucide-react";

const ShopPage = () => {
    const [searchParams] = useSearchParams();
    const [sort, setSort] = useState("default");
    const [category, setCategory] = useState("all");
    const [gender, setGender] = useState(searchParams.get("gender") || "all");

    // Sync state with URL params
    useEffect(() => {
        const genderParam = searchParams.get("gender") || "all";
        setGender(genderParam);
    }, [searchParams]);

    // FILTER
    let filteredProducts = products.filter((p: any) => {
        const categoryMatch = category === "all" ? true : p.category === category;
        const genderMatch = gender === "all" ? true : p.gender === gender;
        return categoryMatch && genderMatch;
    });

    // SORT
    if (sort === "low-high") {
        filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
    } else if (sort === "high-low") {
        filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
    } else if (sort === "rating") {
        filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating);
    }

    const categories = ["all", "shirt", "tshirt", "pant", "jacket"];

    return (
        <div className="min-h-screen bg-pehnava-offWhite pt-2 sm:pt-6 pb-20 px-3 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">

                {/* HERO Header */}
                <div className="text-center mb-6 sm:mb-12 space-y-2 sm:space-y-3 pt-4">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-pehnava-charcoal tracking-tight">
                        Explore Our <span className="text-transparent bg-clip-text bg-linear-to-r from-pehnava-primary to-pehnava-accent">Collection</span>
                    </h1>
                    <p className="text-pehnava-slate text-sm sm:text-lg max-w-2xl mx-auto px-4 hidden sm:block">
                        Discover premium traditional and modern wear crafted for your unique style.
                    </p>
                </div>

                {/* CONTROLS BAR (Sticky) */}
                <div className="sticky top-16 sm:top-20 z-30 py-2 sm:py-4 -mx-3 px-3 sm:mx-0 sm:px-0 bg-pehnava-offWhite/95 backdrop-blur-sm transition-all duration-300">
                    <div className="bg-white p-3 sm:p-4 rounded-xl shadow-soft border border-pehnava-border/50">
                        <div className="flex flex-col gap-3">

                            {/* Mobile Top Row: Count + Compact Sort */}
                            <div className="md:hidden flex justify-between items-center w-full border-b border-pehnava-border/30 pb-2 mb-1">
                                <span className="text-xs font-semibold text-pehnava-slate uppercase tracking-wider">
                                    {filteredProducts.length} Items Found
                                </span>

                                <div className="relative">
                                    <div className="flex items-center gap-1 bg-pehnava-lightGray/50 rounded-lg px-2 py-1">
                                        <SlidersHorizontal className="h-3 w-3 text-pehnava-charcoal" />
                                        <select
                                            value={sort}
                                            onChange={(e) => setSort(e.target.value)}
                                            className="bg-transparent text-xs font-medium text-pehnava-charcoal focus:outline-hidden appearance-none pr-4"
                                        >
                                            <option value="default">Featured</option>
                                            <option value="low-high">Price: Low</option>
                                            <option value="high-low">Price: High</option>
                                            <option value="rating">Top Rated</option>
                                        </select>
                                        <ChevronDown className="absolute right-1 top-1/2 -translate-y-1/2 h-3 w-3 text-pehnava-slate pointer-events-none" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">

                                {/* FILTERS - Horizontal Scroll */}
                                <div className="w-full md:w-auto overflow-x-auto no-scrollbar">
                                    <div className="flex flex-row items-center gap-2 min-w-max pb-1">
                                        <div className="flex items-center gap-1.5 pr-2 border-r border-pehnava-border/50 mr-2 md:hidden">
                                            <Filter className="w-3.5 h-3.5 text-pehnava-primary" />
                                        </div>
                                        {categories.map((item) => (
                                            <button
                                                key={item}
                                                onClick={() => setCategory(item)}
                                                className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 capitalize whitespace-nowrap border ${category === item
                                                    ? "bg-pehnava-primary text-white border-pehnava-primary shadow-lg transform scale-105"
                                                    : "bg-white text-pehnava-slate border-pehnava-border hover:border-pehnava-charcoal"
                                                    }`}
                                            >
                                                {item}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Desktop Sort */}
                                <div className="hidden md:block relative min-w-[200px]">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <SlidersHorizontal className="h-4 w-4 text-pehnava-slate" />
                                    </div>
                                    <select
                                        value={sort}
                                        onChange={(e) => setSort(e.target.value)}
                                        className="block w-full pl-10 pr-10 py-2.5 text-sm border-pehnava-border bg-white focus:outline-hidden focus:ring-2 focus:ring-pehnava-primary rounded-xl cursor-pointer shadow-xs appearance-none"
                                    >
                                        <option value="default">Sort By: Featured</option>
                                        <option value="low-high">Price: Low to High</option>
                                        <option value="high-low">Price: High to Low</option>
                                        <option value="rating">Top Rated</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <ChevronDown className="h-4 w-4 text-pehnava-slate" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* PRODUCT GRID */}
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8 mt-2">
                        {filteredProducts.map((product: any) => (
                            <ProductCard
                                id={product.id}
                                key={product.id}
                                title={product.title}
                                price={product.price}
                                image={product.image}
                                rating={product.rating}
                                originalPrice={product.originalPrice}
                                isNew={product.isNew}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pehnava-lightGray mb-4">
                            <Filter className="h-8 w-8 text-pehnava-slate" />
                        </div>
                        <h3 className="text-xl font-medium text-pehnava-charcoal">No products found</h3>
                        <p className="text-pehnava-slate mt-2">Try adjusting your filters.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShopPage;
