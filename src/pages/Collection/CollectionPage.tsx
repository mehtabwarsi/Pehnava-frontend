import CollectionCard from "../../components/Collection/CollectionCard";
import { ArrowRight } from "lucide-react";

const collections = [
    {
        id: 1,
        title: "Summer Collection",
        subtitle: "Light, breathable & effortless styles",
        image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
    },
    {
        id: 2,
        title: "Winter Collection",
        subtitle: "Warm layers for cold days",
        image: "https://images.unsplash.com/photo-1542060748-10c28b62716f",
    },
    {
        id: 3,
        title: "Festive Collection",
        subtitle: "Celebrate in style",
        image: "https://images.unsplash.com/photo-1520975916090-3105956dac38",
    },
    {
        id: 4,
        title: "Everyday Essentials",
        subtitle: "Comfort for daily wear",
        image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
    },
];

const CollectionPage = () => {
    return (
        <div className="min-h-screen bg-pehnava-offWhite pt-6 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">

                {/* HERO Header */}
                <div className="text-center mb-10 sm:mb-16 space-y-3 pt-4">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-pehnava-charcoal tracking-tight">
                        Our <span className="text-transparent bg-clip-text bg-linear-to-r from-pehnava-primary to-pehnava-accent">Collections</span>
                    </h1>
                    <p className="text-pehnava-slate text-sm sm:text-lg max-w-2xl mx-auto px-4">
                        Curated styles for every mood & season, crafted with elegance.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                    {collections.map((item) => (
                        <CollectionCard
                            key={item.id}
                            title={item.title}
                            subtitle={item.subtitle}
                            image={item.image}
                            onClick={() => console.log(item.title)}
                        />
                    ))}
                </div>

                {/* View All / Bottom CTA */}
                <div className="mt-12 text-center">
                    <button className="group inline-flex items-center gap-2 text-pehnava-charcoal font-semibold hover:text-pehnava-primary transition-colors cursor-pointer">
                        View All Categories <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CollectionPage;
