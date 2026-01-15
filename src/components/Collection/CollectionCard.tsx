type CollectionCardProps = {
    title: string;
    subtitle: string;
    image: string;
    onClick?: () => void;
};

const CollectionCard = ({ title, subtitle, image, onClick }: CollectionCardProps) => {
    return (
        <div
            onClick={onClick}
            className="
        group relative cursor-pointer
        h-[300px] sm:h-[350px] md:h-[400px]
        rounded-2xl
        overflow-hidden
        shadow-md hover:shadow-xl transition-all duration-300
      "
        >
            {/* Image */}
            <img
                src={image}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity duration-300" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-2xl sm:text-3xl font-bold mb-2 drop-shadow-sm">
                    {title}
                </h3>
                <p className="text-sm sm:text-base text-gray-200 mb-4 line-clamp-2 max-w-[90%] font-medium">
                    {subtitle}
                </p>

                <span className="inline-block text-sm font-semibold border-b-2 border-white/80 pb-0.5 group-hover:text-pehnava-accentLight group-hover:border-pehnava-accentLight transition-colors">
                    Explore Collection
                </span>
            </div>
        </div>
    );
};

export default CollectionCard;
