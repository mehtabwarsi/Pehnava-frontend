import ProductCard from '../../components/Home/ProductCard'
import { useNavigate } from 'react-router-dom'
import { useGetAllProducts } from '../../services/useApiHook'
import ProductSkeleton from './ProductSkeleton'

const ProductPage = () => {
    const navigate = useNavigate();
    const { data, isLoading } = useGetAllProducts();
    const apiData = data?.data;
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
        </section>
    )
}

export default ProductPage