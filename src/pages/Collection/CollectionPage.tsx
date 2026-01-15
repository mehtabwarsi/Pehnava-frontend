import CollectionCard from "../../components/Collection/CollectionCard";
import { ArrowRight, Loader } from "lucide-react";
import { useGetCollections } from "../../services/useApiHook";
import { useNavigate } from "react-router-dom";

const CollectionPage = () => {
    const { data: collectionResponse, isLoading } = useGetCollections();
    const navigate = useNavigate();

    const collections = collectionResponse?.data || [];

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
                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <Loader className="w-8 h-8 animate-spin text-pehnava-primary" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                        {collections.map((item: any) => (
                            <CollectionCard
                                key={item._id}
                                title={item.title}
                                subtitle={item.subtitle}
                                image={item.image}
                                onClick={() => navigate(item.redirectUrl || '#')}
                            />
                        ))}
                    </div>
                )}

                {collections.length === 0 && !isLoading && (
                    <div className="text-center py-20 text-pehnava-slate">
                        No collections found.
                    </div>
                )}


                {/* View All / Bottom CTA */}
                <div className="mt-12 text-center">
                    <button
                        onClick={() => navigate('/shop?gender=all')}
                        className="group inline-flex items-center gap-2 text-pehnava-charcoal font-semibold hover:text-pehnava-primary transition-colors cursor-pointer"
                    >
                        View All Categories <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CollectionPage;
