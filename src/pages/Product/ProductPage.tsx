import React from 'react'
import { products } from '../../temp/productData'
import ProductCard from '../../components/Home/ProductCard'

const ProductPage = () => {
    return (
        <section className="max-w-7xl mx-auto px-4 md:px-6 py-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                <div className="space-y-2">
                    <h2 className="text-3xl md:text-4xl font-bold text-pehnava-charcoal tracking-tight">
                        Featured <span className="text-pehnava-primary">Products</span>
                    </h2>
                    <p className="text-pehnava-slate max-w-md text-sm md:text-base">
                        Discover our top-rated arrivals and latest trends in contemporary menswear.
                    </p>
                </div>
                <button className="text-pehnava-primary font-bold hover:underline transition-all text-sm md:text-base">
                    View All Products
                </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8 md:gap-10">
                {products.map(product => (
                    <ProductCard
                        key={product.id}
                        title={product.title}
                        price={product.price}
                        image={product.image}
                        originalPrice={product.originalPrice}
                        rating={product.rating}
                        isNew={product.isNew}
                    />
                ))}
            </div>
        </section>
    )
}

export default ProductPage