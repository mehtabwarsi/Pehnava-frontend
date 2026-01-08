import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MALE_CATEGORIES = [
    { name: 'Shirt', image: 'https://images.unsplash.com/photo-1740711152088-88a009e877bb?q=80&w=880&auto=format&fit=crop', count: '45+' },
    { name: 'Tshirt', image: 'https://i.pinimg.com/1200x/03/dd/c7/03ddc7e7219bfd86a9b0a4ed48ca1fcc.jpg', count: '150+' },
    { name: 'Jeans', image: 'https://i.pinimg.com/736x/a1/d7/84/a1d7840ad9c93d88e9704da027f50e01.jpg', count: '90+' },
    { name: 'Formal wear', image: 'https://i.pinimg.com/736x/f2/e5/89/f2e589b8055c33b9a4750dd263d0b98c.jpg', count: '30+' },
];

const FEMALE_CATEGORIES = [
    { name: 'Sarees', image: 'https://i.pinimg.com/736x/c4/8a/99/c48a99596ac597f1c7fd6dfbbb4d7c7b.jpg', count: '120+' },
    { name: 'Kurti Sets', image: 'https://i.pinimg.com/736x/3e/ad/bf/3eadbffa679638e4627c42bf094d2f50.jpg', count: '200+' },
    { name: 'Lehengas', image: 'https://i.pinimg.com/736x/c0/de/c3/c0dec3e1b86b5e9aeede8b74f0b93142.jpg', count: '80+' },
    { name: 'Gowns', image: 'https://i.pinimg.com/1200x/d9/9f/b0/d99fb05881632088625808eeda843de5.jpg', count: '60+' },
];

const CategorySection = ({ title, description, categories, gender, genderValue }: any) => {
    const navigate = useNavigate();
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {categories.map((category: any, index: number) => (
                    <div
                        key={category.name}
                        className="group relative h-[450px] rounded-2xl overflow-hidden shadow-medium hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-scaleIn"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <img
                            src={category.image}
                            alt={category.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-pehnava-charcoal/90 via-pehnava-charcoal/30 to-transparent opacity-70 group-hover:opacity-85 transition-opacity duration-500" />

                        <div className="absolute inset-x-0 bottom-0 p-8 transform transition-transform duration-500 group-hover:translate-y-[-10px]">
                            <p className="text-pehnava-accentLight text-sm font-bold tracking-widest uppercase mb-1">
                                {category.count} Items
                            </p>
                            <h3 className="text-white text-3xl font-bold mb-4 drop-shadow-lg">
                                {category.name}
                            </h3>
                            <button
                                onClick={() => navigate(`/shop?gender=${genderValue}`)}
                                className="flex items-center gap-2 text-white font-semibold bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-xl border border-white/20 hover:bg-white hover:text-pehnava-primary transition-all duration-300"
                            >
                                Explorer Collection
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
    return (
        <div className="bg-pehnava-offWhite space-y-8">
            <CategorySection
                title="Men's"
                gender="Catalog"
                genderValue="men"
                description="Explore our curated selection of premium traditional attire specifically designed for men."
                categories={MALE_CATEGORIES}
            />

            <div className="max-w-7xl mx-auto px-6">
                <div className="w-full h-px bg-linear-to-r from-transparent via-pehnava-border to-transparent opacity-50" />
            </div>

            <CategorySection
                title="Women's"
                gender="Catalog"
                genderValue="women"
                description="Discover elegance with our timeless collection of feminine traditional wear and jewelry."
                categories={FEMALE_CATEGORIES}
            />

            <div className="pb-16" />
        </div>
    );
};

export default Categories;
