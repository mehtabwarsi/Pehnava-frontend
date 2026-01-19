import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../../components/Home/ProductCard";
import { SlidersHorizontal, ChevronDown, ShoppingBag, X, Sparkles } from "lucide-react";
import { useInfiniteFilterProduct, useGetGender, useGetSubCategory } from "../../services/useApiHook";
import { Helmet } from "react-helmet-async";

const ShopPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [sort, setSort] = useState("default");
    const [subCategory, setSubCategory] = useState("all");
    const [isFeatured, setIsFeatured] = useState(false);
    const limit = 12;

    const observer = useRef<IntersectionObserver | null>(null);

    // Use URL params directly for gender (which matches 'category' in backend)
    const gender = searchParams.get("gender") || "all";
    const categoryParam = searchParams.get("category");

    useEffect(() => {
        if (categoryParam) {
            setSearchParams({ gender: categoryParam });
        }
    }, [categoryParam, setSearchParams]);

    const { data: genderData } = useGetGender();

    const currentGenderId = useMemo(() => {
        return genderData?.data?.find((g: any) => g.name.toLowerCase() === gender.toLowerCase())?._id;
    }, [genderData, gender]);

    const { data: subCategoryData } = useGetSubCategory(currentGenderId);

    const filter = useMemo(() => ({
        category: gender === "all" ? undefined : gender,
        subCategory: subCategory === "all" ? undefined : subCategory,
        sortByPrice:
            sort === "low-high" ?
                "low-to-high" :
                sort === "high-low" ?
                    "high-to-low"
                    : undefined,
        isFeatured: isFeatured || undefined
    }), [gender, subCategory, sort, isFeatured]);

    const {
        data,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useInfiniteFilterProduct(filter, limit);

    // Flatten pages into products and show only active
    const apiProducts = useMemo(() => {
        if (!data?.pages) return [];
        return data.pages.flatMap((page: any) => page?.data?.products || [])
            .filter((product: any) => product.status === "active");
    }, [data]);

    const lastProductRef = useCallback((node: any) => {
        if (isLoading || isFetchingNextPage) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasNextPage) {
                fetchNextPage();
            }
        });
        if (node) observer.current.observe(node);
    }, [isLoading, isFetchingNextPage, hasNextPage, fetchNextPage]);

    // Reset logic is handled by useInfiniteQuery when filters change (part of Query Key)
    // but we can still keep it for scroll reset if needed
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [gender, subCategory, sort, isFeatured]);

    const categories = useMemo(() => {
        return subCategoryData?.data || [];
    }, [subCategoryData]);

    const [isFilterOpen, setIsFilterOpen] = useState(false);

    useEffect(() => {
        if (isFilterOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isFilterOpen]);

    return (
        <div className="min-h-screen bg-pehnava-offWhite pt-24 pb-12">
            <Helmet>
                <title>{`Shop ${gender !== 'all' ? gender.charAt(0).toUpperCase() + gender.slice(1) : ''} | Pehnava`}</title>
                <meta name="description" content={`Browse our ${gender !== 'all' ? gender : 'latest'} collection of contemporary traditional wear at Pehnava. Find the best kurtas, sherwanis, and more.`} />
                <meta property="og:title" content={`Shop ${gender !== 'all' ? gender : 'Modern Ethnic Wear'} | Pehnava`} />
                <meta name="keywords" content={`shop, traditional wear, ethnic fashion, ${gender}, ${subCategory}, Pehnava`} />
            </Helmet>
            <div className="max-w-7xl mx-auto px-4 md:px-8">

                {/* HERO Header */}
                <div className="text-center mb-6 sm:mb-10 space-y-2 pt-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-pehnava-primary/10 rounded-full text-pehnava-primary text-xs font-bold uppercase tracking-widest mb-2">
                        <Sparkles className="w-3 h-3" />
                        <span>Curated for you</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-pehnava-charcoal uppercase tracking-tighter">
                        {gender === "all" ? "The Entire" : gender} <span className="text-pehnava-primary">Collection</span>
                    </h1>
                    <p className="text-pehnava-slate max-w-xl mx-auto text-sm sm:text-base px-4">
                        Discover the perfect blend of ancestral heritage and modern aesthetics.
                    </p>
                </div>

                {/* Filter & Sort Bar */}
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-3 sm:p-4 rounded-2xl shadow-soft border border-pehnava-border/50 sticky top-24 z-40 mb-8 sm:mb-12">
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <button
                            onClick={() => setIsFilterOpen(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-pehnava-offWhite hover:bg-pehnava-primary/10 text-pehnava-charcoal hover:text-pehnava-primary rounded-xl font-bold transition-all flex-1 sm:flex-none justify-center border border-pehnava-border/20"
                        >
                            <SlidersHorizontal className="w-4 h-4" />
                            <span>Filters</span>
                        </button>

                        {/* Quick filter chips for subcategories */}
                        <div className="hidden md:flex gap-2 ml-4">
                            {categories.slice(0, 3).map((cat: any) => (
                                <button
                                    key={cat._id}
                                    onClick={() => setSubCategory(cat.name)}
                                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border ${subCategory === cat.name
                                        ? "bg-pehnava-primary text-white border-pehnava-primary shadow-glow"
                                        : "bg-white text-pehnava-slate border-pehnava-border/50 hover:border-pehnava-primary"
                                        }`}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0">
                        <div className="relative group flex-1 sm:flex-none">
                            <select
                                value={sort}
                                onChange={(e) => setSort(e.target.value)}
                                className="w-full sm:w-48 appearance-none px-4 py-2.5 bg-pehnava-offWhite border-none rounded-xl text-pehnava-charcoal font-bold text-sm focus:ring-2 focus:ring-pehnava-primary/20 transition-all cursor-pointer"
                            >
                                <option value="default">Default Sorting</option>
                                <option value="low-high">Price: Low to High</option>
                                <option value="high-low">Price: High to Low</option>
                            </select>
                            <ChevronDown className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-pehnava-slate pointer-events-none group-hover:text-pehnava-primary transition-colors" />
                        </div>
                    </div>
                </div>

                {/* Filter Side Panel (Mobile/Tablet) */}
                <div className={`fixed inset-0 z-[100] transition-all duration-500 ${isFilterOpen ? 'visible' : 'invisible'}`}>
                    <div
                        className={`absolute inset-0 bg-pehnava-charcoal/40 backdrop-blur-sm transition-opacity duration-500 ${isFilterOpen ? 'opacity-100' : 'opacity-0'}`}
                        onClick={() => setIsFilterOpen(false)}
                    />
                    <div className={`absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-large transition-transform duration-500 ease-out p-6 flex flex-col ${isFilterOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                        <div className="flex items-center justify-between mb-8 pb-4 border-b border-pehnava-border">
                            <div className="flex items-center gap-2">
                                <SlidersHorizontal className="w-5 h-5 text-pehnava-primary" />
                                <h3 className="text-xl font-black text-pehnava-charcoal uppercase">Refine</h3>
                            </div>
                            <button
                                onClick={() => setIsFilterOpen(false)}
                                className="p-2 hover:bg-pehnava-offWhite rounded-full transition-colors"
                            >
                                <X className="w-5 h-5 text-pehnava-slate" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-8 pr-2 custom-scrollbar">
                            {/* Categories Section */}
                            <div className="space-y-4">
                                <h4 className="text-xs font-bold text-pehnava-slate uppercase tracking-widest bg-pehnava-offWhite px-3 py-1.5 rounded-md inline-block">Product Type</h4>
                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        onClick={() => setSubCategory("all")}
                                        className={`px-4 py-3 rounded-xl text-sm font-bold transition-all text-center border ${subCategory === "all"
                                            ? "bg-pehnava-primary text-white border-pehnava-primary shadow-glow"
                                            : "bg-white text-pehnava-slate border-pehnava-border hover:border-pehnava-primary"
                                            }`}
                                    >
                                        All Items
                                    </button>
                                    {categories.map((cat: any) => (
                                        <button
                                            key={cat._id}
                                            onClick={() => setSubCategory(cat.name)}
                                            className={`px-4 py-3 rounded-xl text-sm font-bold transition-all text-center border ${subCategory === cat.name
                                                ? "bg-pehnava-primary text-white border-pehnava-primary shadow-glow"
                                                : "bg-white text-pehnava-slate border-pehnava-border hover:border-pehnava-primary"
                                                }`}
                                        >
                                            {cat.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Features Section */}
                            <div className="space-y-4">
                                <h4 className="text-xs font-bold text-pehnava-slate uppercase tracking-widest bg-pehnava-offWhite px-3 py-1.5 rounded-md inline-block">Collections</h4>
                                <label className="flex items-center gap-3 p-4 bg-pehnava-offWhite hover:bg-pehnava-primary/5 rounded-2xl cursor-pointer border border-transparent hover:border-pehnava-primary/20 transition-all">
                                    <input
                                        type="checkbox"
                                        checked={isFeatured}
                                        onChange={(e) => setIsFeatured(e.target.checked)}
                                        className="w-5 h-5 accent-pehnava-primary rounded-lg"
                                    />
                                    <span className="font-bold text-pehnava-charcoal">Featured Arrivals</span>
                                </label>
                            </div>
                        </div>

                        <div className="pt-6 mt-6 border-t border-pehnava-border">
                            <button
                                onClick={() => setIsFilterOpen(false)}
                                className="w-full py-4 bg-pehnava-charcoal text-white rounded-xl font-bold hover:bg-pehnava-primary transition-all shadow-medium"
                            >
                                Apply Changes
                            </button>
                        </div>
                    </div>
                </div>

                {/* Product Section */}
                {isLoading ? (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="aspect-[3/4] bg-white rounded-3xl animate-pulse shadow-soft" />
                        ))}
                    </div>
                ) : apiProducts.length > 0 ? (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 gap-y-10 sm:gap-y-16">
                        {apiProducts.map((product: any) => (
                            <ProductCard
                                key={product._id}
                                id={product._id}
                                slug={product.slug}
                                title={product.name}
                                price={product.discountPrice}
                                image={product.images && product.images.length > 0 ? product.images[0] : ""}
                                originalPrice={product.price}
                                isNew={product.isNew}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-[40px] p-12 sm:p-20 text-center border-2 border-dashed border-pehnava-border shadow-soft flex flex-col items-center">
                        <div className="w-24 h-24 bg-pehnava-offWhite rounded-full flex items-center justify-center mb-8">
                            <ShoppingBag className="w-10 h-10 text-pehnava-slate" />
                        </div>
                        <h3 className="text-3xl font-black text-pehnava-charcoal uppercase mb-4">Collection coming soon</h3>
                        <p className="text-pehnava-slate max-w-sm mb-10 text-lg">
                            We're currently updating this collection with our latest arrivals.
                        </p>
                        <button
                            onClick={() => {
                                setSubCategory("all");
                                setIsFeatured(false);
                            }}
                            className="bg-pehnava-charcoal text-white px-8 py-3 rounded-full font-bold hover:bg-pehnava-primary transition-all"
                        >
                            Reset Filters
                        </button>
                    </div>
                )}

                {/* Loading indicator for infinite scroll */}
                {(isFetchingNextPage || hasNextPage) && (
                    <div
                        ref={lastProductRef}
                        className="flex justify-center py-10"
                    >
                        {isFetchingNextPage ? (
                            <div className="flex items-center gap-2 text-pehnava-slate animate-pulse">
                                <div className="w-2 h-2 bg-pehnava-primary rounded-full animate-bounce" />
                                <div className="w-2 h-2 bg-pehnava-primary rounded-full animate-bounce [animation-delay:0.2s]" />
                                <div className="w-2 h-2 bg-pehnava-primary rounded-full animate-bounce [animation-delay:0.4s]" />
                                <span className="text-sm font-medium ml-2">Discovering more...</span>
                            </div>
                        ) : (
                            <div className="h-4" /> // Anchor for intersection observer
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShopPage;
