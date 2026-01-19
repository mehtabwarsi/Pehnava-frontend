import { useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetCollectionBySlug, useInfiniteGetCollectionProducts } from '../../services/useApiHook';
import ProductCard from '../../components/Home/ProductCard';
import ProductSkeleton from '../../components/Product/ProductSkeleton';
import { ChevronLeft } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const CollectionProductsPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const limit = 12;

    const observer = useRef<IntersectionObserver | null>(null);

    const { data: collectionRes, isLoading: isCollectionLoading } = useGetCollectionBySlug(slug || '');
    const {
        data: productsRes,
        isLoading: isProductsLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useInfiniteGetCollectionProducts(slug || '', limit);

    const collection = collectionRes?.data;
    const products = productsRes?.pages?.flatMap((page: any) => page?.data?.products || []) || [];

    const lastProductRef = useCallback((node: any) => {
        if (isProductsLoading || isFetchingNextPage) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasNextPage) {
                fetchNextPage();
            }
        });
        if (node) observer.current.observe(node);
    }, [isProductsLoading, isFetchingNextPage, hasNextPage, fetchNextPage]);

    // Reset scroll when slug changes
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [slug]);

    if (isCollectionLoading) {
        return (
            <div className="min-h-screen bg-pehnava-offWhite pt-24 pb-12 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="h-8 w-48 bg-gray-200 animate-pulse rounded mb-4"></div>
                    <div className="h-4 w-96 bg-gray-200 animate-pulse rounded mb-12"></div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <ProductSkeleton key={i} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (!collection) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-pehnava-offWhite px-4">
                <h2 className="text-2xl font-bold text-pehnava-charcoal mb-4">Collection Not Found</h2>
                <button
                    onClick={() => navigate('/collections')}
                    className="px-6 py-2 bg-pehnava-primary text-white rounded-full font-medium"
                >
                    Back to Collections
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-pehnava-offWhite pt-24 pb-12 px-4 md:px-8">
            <Helmet>
                <title>{collection?.title ? `${collection.title} Collection | Pehnava` : 'Collection | Pehnava'}</title>
                <meta name="description" content={collection?.subtitle || "Explore our exclusive collections at Pehnava."} />
                <meta property="og:title" content={collection?.title} />
                <meta property="og:description" content={collection?.subtitle} />
                <meta property="og:image" content={products?.[0]?.images?.[0]} />
            </Helmet>
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-pehnava-slate hover:text-pehnava-primary transition-colors mb-6 group"
                    >
                        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-medium uppercase tracking-widest">Back</span>
                    </button>

                    <h1 className="text-3xl md:text-4xl font-black text-pehnava-charcoal mb-2 uppercase tracking-tight">
                        {collection.title}
                    </h1>
                    <p className="text-pehnava-slate text-lg max-w-2xl">
                        {collection.subtitle}
                    </p>
                </div>

                {/* Products Grid */}
                {isProductsLoading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                        {[1, 2, 3, 4].map((i) => (
                            <ProductSkeleton key={i} />
                        ))}
                    </div>
                ) : products.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                        {products.map((product: any) => (
                            <ProductCard
                                key={product._id}
                                id={product._id}
                                slug={product.slug}
                                title={product.name}
                                price={product.discountPrice || product.price}
                                originalPrice={product.price}
                                image={product.images?.[0]}
                                rating={product.ratings}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-3xl p-12 text-center border border-pehnava-border">
                        <div className="w-20 h-20 bg-pehnava-offWhite rounded-full flex items-center justify-center mx-auto mb-6">
                            <span className="text-4xl">🏷️</span>
                        </div>
                        <h3 className="text-xl font-bold text-pehnava-charcoal mb-2">No Products Found</h3>
                        <p className="text-pehnava-slate mb-8">
                            We couldn't find any products matching this collection's criteria at the moment.
                        </p>
                        <button
                            onClick={() => navigate('/shop')}
                            className="px-8 py-3 bg-pehnava-charcoal text-white rounded-full font-bold hover:bg-pehnava-primary transition-colors"
                        >
                            Explore All Products
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
                                <span className="text-sm font-medium ml-2">Loading more...</span>
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

export default CollectionProductsPage;
