import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../../components/Home/ProductCard";
import { ShoppingBag, Sparkles } from "lucide-react";
import { useInfiniteFilterProduct, useGetGender, useGetSubCategory } from "../../services/useApiHook";
import { Helmet } from "react-helmet-async";

const ShopPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [subCategory, setSubCategory] = useState("all");
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
    }), [gender, subCategory]);

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
    }, [gender, subCategory]);

    const categories = useMemo(() => {
        return subCategoryData?.data || [];
    }, [subCategoryData]);



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
                <div className="bg-white p-3 sm:p-4 rounded-2xl shadow-soft border border-pehnava-border/50 sticky top-24 z-40 mb-8 sm:mb-12">
                    {/* Horizontal Category List */}
                    <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar -mx-1 px-1">
                        <button
                            onClick={() => setSubCategory("all")}
                            className={`flex-shrink-0 px-5 py-2 rounded-lg text-sm font-bold transition-all border whitespace-nowrap ${subCategory === "all"
                                ? "bg-pehnava-charcoal text-white border-pehnava-charcoal shadow-md"
                                : "bg-white text-pehnava-slate border-pehnava-border hover:border-pehnava-charcoal hover:text-pehnava-charcoal"
                                }`}
                        >
                            All
                        </button>
                        {categories.map((cat: any) => (
                            <button
                                key={cat._id}
                                onClick={() => setSubCategory(cat.name)}
                                className={`flex-shrink-0 px-5 py-2 rounded-lg text-sm font-bold transition-all border whitespace-nowrap ${subCategory === cat.name
                                    ? "bg-pehnava-charcoal text-white border-pehnava-charcoal shadow-md"
                                    : "bg-white text-pehnava-slate border-pehnava-border hover:border-pehnava-charcoal hover:text-pehnava-charcoal"
                                    }`}
                            >
                                {cat.name}
                            </button>
                        ))}
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
