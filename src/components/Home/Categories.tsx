import React from 'react';
import { ArrowRight } from 'lucide-react';

const MALE_CATEGORIES = [
    { name: 'Shirts', image: 'https://images.unsplash.com/photo-1740711152088-88a009e877bb?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', count: '45+' },
    { name: 'T-Shirts', image: 'https://plus.unsplash.com/premium_photo-1673125287084-e90996bad505?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&=3wxMjA3fDB8MHxzZWFyY2h8NXx8dCUyMHNoaXJ0c3xlbnwwfHwwfHx8M', count: '150+' },
    { name: 'Jeans', image: 'https://images.unsplash.com/photo-1681510322759-208be5882ab7?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', count: '90+' },
    { name: 'Pants', image: 'https://images.pexels.com/photos/7256410/pexels-photo-7256410.jpeg', count: '30+' },
];

const Categories = () => {
    return (
        <section className="max-w-7xl mx-auto px-6 py-20 animate-fadeIn">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div className="space-y-2">
                    <h2 className="text-4xl font-bold text-pehnava-charcoal tracking-tight">
                        Men's <span className="text-pehnava-primary">Collection</span>
                    </h2>
                    <p className="text-pehnava-slate max-w-md">
                        Explore our curated selection of premium traditional attire specifically designed for men.
                    </p>
                </div>
            </div>

            {/* Category Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {MALE_CATEGORIES.map((category, index) => (
                    <div
                        key={category.name}
                        className="group relative h-[400px] rounded-lg overflow-hidden shadow-medium hover:shadow-large transition-all duration-500 hover:-translate-y-2 animate-scaleIn"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        {/* Image */}
                        <img
                            src={category.image}
                            alt={category.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-linear-to-t from-pehnava-charcoal/80 via-pehnava-charcoal/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                        {/* Content */}
                        <div className="absolute inset-x-0 bottom-0 p-8 transform transition-transform duration-500 group-hover:translate-y-[-10px]">
                            <p className="text-pehnava-accentLight text-sm font-bold tracking-widest uppercase mb-1 drop-shadow-md">
                                {category.count} Items
                            </p>
                            <h3 className="text-white text-3xl font-bold mb-4 drop-shadow-lg">
                                {category.name}
                            </h3>

                            <button className="flex items-center gap-2 text-white font-semibold group/btn bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 hover:bg-white hover:text-pehnava-primary transition-all duration-300">
                                View More
                                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                            </button>
                        </div>

                        {/* Subtle Glow on Hover */}
                        <div className="absolute inset-0 ring-1 ring-inset ring-white/20 rounded-3xl group-hover:ring-pehnava-primary/50 transition-all duration-500" />
                    </div>
                ))}
            </div>

            {/* Bottom Accent Line */}
            <div className="mt-16 w-full h-px bg-linear-to-r from-transparent via-pehnava-border to-transparent" />
        </section>
    );
};

export default Categories;
