import { Star } from "lucide-react";

const RatingStars = ({ rating, size = 'md' }: any) => (
    <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
            <Star
                key={i}
                className={
                    size === 'sm'
                        ? `w-3 h-3 ${i < Math.floor(rating)
                            ? 'fill-pehnava-primary text-pehnava-primary'
                            : 'text-pehnava-slate/30'
                        }`
                        : `w-4 h-4 md:w-5 md:h-5 ${i < Math.floor(rating)
                            ? 'fill-pehnava-primary text-pehnava-primary'
                            : 'text-pehnava-slate/30'
                        }`
                }
            />
        ))}
    </div>
);

export default RatingStars;