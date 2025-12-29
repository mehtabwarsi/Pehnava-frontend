import HomeCarousel from '../../components/Home/HomeCarousel'
import Categories from '../../components/Home/Categories'
import ProductPage from '../../components/Product/ProductPage'

const HomePage = () => {
    return (
        <main>
            <HomeCarousel />
            <Categories />
            <ProductPage />
        </main>
    )
}

export default HomePage