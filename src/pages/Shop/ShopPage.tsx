import { useState } from "react";
import ProductCard from "../../components/Home/ProductCard";
import { products } from "../../temp/productData";

const ShopPage = () => {
    const [sort, setSort] = useState("default");
    const [category, setCategory] = useState("all");

    // FILTER
    let filteredProducts =
        category === "all"
            ? products
            : products.filter((p: any) => p.category === category);

    // SORT
    if (sort === "low-high") {
        filteredProducts = [...filteredProducts].sort(
            (a, b) => a.price - b.price
        );
    }

    if (sort === "high-low") {
        filteredProducts = [...filteredProducts].sort(
            (a, b) => b.price - a.price
        );
    }

    if (sort === "rating") {
        filteredProducts = [...filteredProducts].sort(
            (a, b) => b.rating - a.rating
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-20">

            {/* HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
                <h1 className="text-2xl font-semibold">Shop Products</h1>

                {/* SORT */}
                <select
                    value={sort}
                    onChange={e => setSort(e.target.value)}
                    className="border px-4 py-2 rounded-md"
                >
                    <option value="default">Sort By</option>
                    <option value="low-high">Price: Low to High</option>
                    <option value="high-low">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                </select>
            </div>

            {/* FILTER */}
            <div className="flex gap-3 mb-10 flex-wrap ">
                {["all", "shirt", "tshirt", "pant", "jacket"].map(item => (
                    <button
                        key={item}
                        onClick={() => setCategory(item)}
                        className={` cursor-pointer px-5 py-2 rounded-full border ${category === item
                            ? "bg-black text-white"
                            : "bg-white"
                            }`}
                    >
                        {item.toUpperCase()}
                    </button>
                ))}
            </div>

            {/* PRODUCTS */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                    <ProductCard
                        key={product.id}
                        title={product.title}
                        price={product.price}
                        image={product.image}
                        rating={product.rating}
                        originalPrice={product.originalPrice}
                    />
                ))}
            </div>
        </div>
    );
};

export default ShopPage;
