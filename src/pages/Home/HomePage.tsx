import React from 'react'
import HomeCarousel from '../../components/Home/HomeCarousel'
import Categories from '../../components/Home/Categories'
import ProductCard from '../../components/Home/ProductCard'
import { products } from '../../temp/productData'
import ProductPage from '../Product/ProductPage'

const HomePage = () => {
    return (
        <main className="bg-pehnava-offWhite min-h-screen">
            <HomeCarousel />

            <Categories />

            <ProductPage />
        </main>
    )
}

export default HomePage