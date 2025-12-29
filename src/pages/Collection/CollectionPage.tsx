import CollectionCard from "../../components/Collection/CollectionCard";

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
        <div className="max-w-7xl bg-pehnava-offWhite mx-auto px-4 sm:px-6 py-16 sm:py-20">

            {/* Heading */}
            <div className="mb-10 sm:mb-12 text-center">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-medium text-pehnava-charcoal">
                    Our Collections
                </h1>
                <p className="text-sm sm:text-base text-pehnava-slate mt-2">
                    Curated styles for every mood & season
                </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                {collections.map(item => (
                    <CollectionCard
                        key={item.id}
                        title={item.title}
                        subtitle={item.subtitle}
                        image={item.image}
                        onClick={() => console.log(item.title)}
                    />
                ))}
            </div>
        </div>
    );
};

export default CollectionPage;
