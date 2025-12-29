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
        h-[220px] sm:h-[280px] md:h-[320px]
        rounded-xl sm:rounded-2xl
        overflow-hidden
      "
        >
            {/* Image */}
            <img
                src={image}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent" />

            {/* Content */}
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 text-white">
                <h3 className="text-base sm:text-lg md:text-xl font-medium mb-1">
                    {title}
                </h3>
                <p className="text-xs sm:text-sm text-white/80">
                    {subtitle}
                </p>

                <span className="inline-block mt-3 sm:mt-4 text-xs sm:text-sm font-medium underline underline-offset-4">
                    Explore Collection
                </span>
            </div>
        </div>
    );
};

export default CollectionCard;
