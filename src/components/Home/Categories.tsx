import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useGetCategories } from '../../services/useApiHook';

const CategorySection = ({ title, description, categories, gender }: any) => {
    const navigate = useNavigate();

    if (!categories || categories.length === 0) return null;

    return (
        <section className="max-w-7xl mx-auto px-6 py-16 animate-fadeIn">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div className="space-y-2">
                    <h2 className="text-4xl font-bold text-pehnava-charcoal tracking-tight">
                        {title} <span className="text-pehnava-primary">{gender}</span>
                    </h2>
                    <p className="text-pehnava-slate max-w-md">
                        {description}
                    </p>
                </div>
            </div>

            {/* Horizontal Scroll on Mobile, Grid on Desktop */}
            <div className="flex overflow-x-auto lg:grid lg:grid-cols-4 gap-6 sm:gap-8 pb-4 -mx-6 px-6 lg:mx-0 lg:px-0 no-scrollbar snap-x snap-mandatory">
                {categories.map((category: any, index: number) => (
                    <div
                        key={category._id || index}
                        className="group relative h-[400px] sm:h-[450px] min-w-[280px] sm:min-w-[320px] lg:min-w-0 flex-shrink-0 lg:flex-shrink rounded-2xl overflow-hidden shadow-medium hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-scaleIn snap-center"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <img
                            src={category.image}
                            alt={category.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-pehnava-charcoal/90 via-pehnava-charcoal/30 to-transparent opacity-70 group-hover:opacity-85 transition-opacity duration-500" />

                        <div className="absolute inset-x-0 bottom-0 p-8 transform transition-transform duration-500 group-hover:translate-y-[-10px]">
                            <p className="text-pehnava-accentLight text-sm font-bold tracking-widest uppercase mb-1">
                                {category.subtitle} Items
                            </p>
                            <h3 className="text-white text-3xl font-bold mb-4 drop-shadow-lg">
                                {category.title}
                            </h3>
                            <button
                                onClick={() => {
                                    if (category.redirectUrl) {
                                        navigate(category.redirectUrl);
                                    } else {
                                        // Fallback to shop filter
                                        navigate(`/shop?gender=${category.gender}&subCategory=${category.title}`);
                                    }
                                }}
                                className="flex items-center gap-2 text-white font-semibold bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-xl border border-white/20 hover:bg-white hover:text-pehnava-primary transition-all duration-300"
                            >
                                Explore Collection
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

const Categories = () => {
    const { data: categoriesResponse } = useGetCategories();
    const categories = categoriesResponse?.data || [];

    const menCategories = categories.filter((cat: any) => cat.gender === 'men' && cat.isActive);
    const womenCategories = categories.filter((cat: any) => cat.gender === 'women' && cat.isActive);

    return (
        <div className="bg-pehnava-offWhite">
            <CategorySection
                title="Men's"
                gender="Catalog"
                description="Explore our curated selection of premium traditional attire specifically designed for men."
                categories={menCategories}
            />

            <div className="max-w-7xl mx-auto px-6">
                <div className="w-full h-px bg-linear-to-r from-transparent via-pehnava-border to-transparent opacity-50" />
            </div>

            <CategorySection
                title="Women's"
                gender="Catalog"
                description="Discover elegance with our timeless collection of feminine traditional wear and jewelry."
                categories={womenCategories}
            />

            <div className="pb-4" />
        </div>
    );
};

export default Categories;
