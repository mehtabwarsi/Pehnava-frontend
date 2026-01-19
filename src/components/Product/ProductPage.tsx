import ProductCard from '../../components/Home/ProductCard'
import { useNavigate } from 'react-router-dom'
import { useInfiniteGetAllProducts } from '../../services/useApiHook'
import ProductSkeleton from './ProductSkeleton'
import { useRef, useCallback, useMemo } from 'react'

const ProductPage = () => {
    const navigate = useNavigate();
    const limit = 12;
    const observer = useRef<IntersectionObserver | null>(null);

    const {
        data,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useInfiniteGetAllProducts(limit);

    const apiData = useMemo(() => {
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
    return (
        <section className="max-w-7xl bg-pehnava-offWhite mx-auto px-4 pb-20 md:px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                <div className="space-y-2">
                    <h2 className="text-3xl md:text-4xl font-bold text-pehnava-charcoal tracking-tight">
                        Featured <span className="text-pehnava-primary">Products</span>
                    </h2>
                    <p className="text-pehnava-slate max-w-md text-sm md:text-base">
                        Discover our top-rated arrivals and latest trends in contemporary traditional wear.
                    </p>
                </div>
                <button onClick={() => navigate("/shop")} className="text-pehnava-primary font-bold hover:underline transition-all text-sm md:text-base">
                    View All Products
                </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8 md:gap-10">
                {isLoading ? (
                    // Show skeletons while loading
                    [...Array(6)].map((_, index) => (
                        <ProductSkeleton key={index} />
                    ))
                ) : isError ? (
                    <div className="col-span-full py-10 text-center text-pehnava-slate">
                        Failed to load products. Please try again later.
                    </div>
                ) : (
                    apiData?.map((product: any) => (
                        <ProductCard
                            key={product._id}
                            id={product._id}
                            title={product.name}
                            price={product.discountPrice}
                            image={product.images[0]}
                            originalPrice={product.price}
                        />
                    ))
                )}
            </div>

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
                            <span className="text-sm font-medium ml-2">Loading more products...</span>
                        </div>
                    ) : (
                        <div className="h-4" /> // Anchor for intersection observer
                    )}
                </div>
            )}
        </section>
    )
}

export default ProductPage