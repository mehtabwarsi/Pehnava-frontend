import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../../components/Home/ProductCard";
import { SlidersHorizontal, ChevronDown, ShoppingBag, X, Sparkles } from "lucide-react";
import { useFilterProduct, useGetCategory, useGetGender } from "../../services/useApiHook";

const ShopPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [sort, setSort] = useState("default");
    const [subCategory, setSubCategory] = useState("all");
    const [isFeatured, setIsFeatured] = useState(false);

    // Use URL params directly for gender (which matches 'category' in backend)
    const gender = searchParams.get("gender") || "all";

    // Reset subCategory when gender changes
    useEffect(() => {
        setSubCategory("all");
    }, [gender]);

    const { data: genderData } = useGetGender();

    // Derive genderId from name (case-insensitive)
    const genderId = useMemo(() => {
        if (!genderData?.data) return undefined;
        return genderData.data.find(
            (item: any) => item.name.toLowerCase() === gender.toLowerCase()
        )?._id;
    }, [genderData, gender]);

    const { data: categoryData } = useGetCategory(genderId);
    // Stable filter object for the API hook
    const filter = useMemo(() => ({
        category: gender === "all" ? undefined : gender,
        subCategory: subCategory === "all" ? undefined : subCategory,
        sortByPrice: sort === "low-high" ? "low-to-high" : sort === "high-low" ? "high-to-low" : undefined,
        isFeatured: isFeatured || undefined
    }), [gender, subCategory, sort, isFeatured]);

    const { data, isLoading, isError } = useFilterProduct(filter);

    // Only show active products
    const apiProducts = useMemo(() => {
        return (data?.data || []).filter((product: any) => product.status === "active");
    }, [data]);

    const categories = useMemo(() => {
        const fetched = categoryData?.data?.map((item: any) => item.name) || [];
        return ["all", ...fetched];
    }, [categoryData]);



    const handleGenderChange = (newGender: string) => {
        if (newGender === "all") {
            searchParams.delete("gender");
        } else {
            searchParams.set("gender", newGender);
        }
        setSearchParams(searchParams);
    };

    return (
        <div className="min-h-screen bg-pehnava-offWhite pt-2 sm:pt-6 pb-20 px-3 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">

                {/* HERO Header */}
                <div className="text-center mb-6 sm:mb-10 space-y-2 pt-4">
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
                        <div className="flex flex-col gap-4">

                            {/* Gender / Backend Category selection (to match navbar) */}
                            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar border-b border-pehnava-border/30 pb-3">
                                <span className="text-xs font-bold text-pehnava-charcoal uppercase tracking-widest min-w-[60px]">Gender:</span>
                                {["all", "men", "women"].map((g) => (
                                    <button
                                        key={g}
                                        onClick={() => handleGenderChange(g)}
                                        className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all capitalize border ${gender === g
                                            ? "bg-pehnava-primary text-white border-pehnava-primary shadow-glow"
                                            : "bg-pehnava-lightGray/50 text-pehnava-slate border-transparent hover:border-pehnava-primary/30"
                                            }`}
                                    >
                                        {g}
                                    </button>
                                ))}
                            </div>

                            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                                {/* SUB-CATEGORY FILTERS - Horizontal Scroll */}
                                <div className="w-full md:w-auto overflow-x-auto no-scrollbar">
                                    <div className="flex flex-row items-center gap-2 min-w-max">
                                        <span className="text-xs font-bold text-pehnava-charcoal uppercase tracking-widest min-w-[60px]">Type:</span>
                                        {(gender === "all") ? (
                                            <span className="text-[10px] text-pehnava-slate italic">Select a gender to see types</span>
                                        ) : (categoryData === undefined) ? (
                                            <div className="flex gap-2 animate-pulse">
                                                {[1, 2, 3].map(i => <div key={i} className="h-7 w-16 bg-pehnava-lightGray rounded-full" />)}
                                            </div>
                                        ) : (
                                            categories.map((item) => (
                                                <button
                                                    key={`${gender}-${item}`}
                                                    onClick={() => setSubCategory(item)}
                                                    className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 capitalize whitespace-nowrap border ${subCategory === item
                                                        ? "bg-pehnava-primary text-white border-pehnava-primary shadow-lg"
                                                        : "bg-white text-pehnava-slate border-pehnava-border hover:border-pehnava-charcoal"
                                                        }`}
                                                >
                                                    {item}
                                                </button>
                                            ))
                                        )}

                                        <div className="h-6 w-px bg-pehnava-border/50 mx-2" />

                                        <button
                                            onClick={() => setIsFeatured(!isFeatured)}
                                            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${isFeatured
                                                ? "bg-pehnava-accent text-white border-pehnava-accent shadow-glow"
                                                : "bg-white text-pehnava-accent border-pehnava-accent/30 hover:bg-pehnava-accent/10"
                                                }`}
                                        >
                                            <Sparkles className={`w-3 h-3 ${isFeatured ? "animate-pulse" : ""}`} />
                                            Featured
                                        </button>
                                    </div>
                                </div>

                                {/* Desktop Sort */}
                                <div className="hidden md:flex items-center gap-4">
                                    <span className="text-xs font-bold text-pehnava-slate uppercase tracking-wider">
                                        {isLoading ? "..." : apiProducts.length} Items
                                    </span>
                                    <div className="relative min-w-[180px]">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <SlidersHorizontal className="h-4 w-4 text-pehnava-slate" />
                                        </div>
                                        <select
                                            value={sort}
                                            onChange={(e) => setSort(e.target.value)}
                                            className="block w-full pl-10 pr-10 py-2 text-sm border-pehnava-border bg-pehnava-lightGray/20 focus:outline-hidden focus:ring-1 focus:ring-pehnava-primary rounded-xl cursor-pointer shadow-xs appearance-none font-medium"
                                        >
                                            <option value="default">Featured</option>
                                            <option value="low-high">Price: Low to High</option>
                                            <option value="high-low">Price: High to Low</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                            <ChevronDown className="h-4 w-4 text-pehnava-slate" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* PRODUCT GRID */}
                {isLoading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8 mt-6">
                        {[...Array(8)].map((_, index) => (
                            <div key={index} className="animate-pulse bg-white rounded-2xl h-[350px] shadow-soft border border-pehnava-border/30" />
                        ))}
                    </div>
                ) : isError ? (
                    <div className="text-center py-20 bg-white rounded-3xl border border-pehnava-border/50 mt-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4 px-4 text-red-600">
                            <X className="h-8 w-8" />
                        </div>
                        <h3 className="text-xl font-bold text-pehnava-charcoal">Failed to load products</h3>
                        <p className="text-pehnava-slate mt-2">There was an error connecting to the server.</p>
                    </div>
                ) : apiProducts.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8 mt-6 animate-fadeIn">
                        {apiProducts.map((product: any) => (
                            <ProductCard
                                id={product._id}
                                key={product._id}
                                title={product.name}
                                price={product.discountPrice}
                                image={product.images && product.images.length > 0 ? product.images[0] : ""}
                                originalPrice={product.price}
                                isNew={product.isNew}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 bg-white rounded-3xl border border-pehnava-border/50 shadow-soft mt-10">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-pehnava-lightGray mb-6">
                            <ShoppingBag className="h-10 w-10 text-pehnava-slate/40" />
                        </div>
                        <h3 className="text-2xl font-bold text-pehnava-charcoal">No products found</h3>
                        <p className="text-pehnava-slate mt-2 max-w-sm mx-auto">
                            Try adjusting your filters or search terms to find what you're looking for.
                        </p>
                        <button
                            onClick={() => { setSubCategory("all"); handleGenderChange("all"); setIsFeatured(false); setSort("default"); }}
                            className="mt-8 px-8 py-3 bg-pehnava-primary text-white rounded-xl font-bold shadow-glow hover:-translate-y-1 transition-all"
                        >
                            Reset All Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShopPage;
