import Skeleton from '../common/Skeleton';

const ProductSkeleton = () => {
    return (
        <div className="bg-white rounded-lg md:rounded-lg overflow-hidden shadow-soft animate-fadeIn">
            {/* Image Container Skeleton */}
            <div className="relative aspect-4/5 bg-pehnava-lightGray">
                <Skeleton height="100%" width="100%" />
            </div>

            {/* Content Skeleton */}
            <div className="p-3 md:p-5 space-y-3">
                {/* Star Rating Skeleton */}
                <div className="flex items-center gap-1">
                    <Skeleton width={80} height={12} />
                </div>

                {/* Title Skeleton */}
                <Skeleton width="90%" height={24} className="md:height-[28px]" />

                {/* Price Skeleton */}
                <div className="flex items-center gap-2">
                    <Skeleton width={60} height={24} />
                    <Skeleton width={40} height={16} />
                </div>
            </div>
        </div>
    );
};

export default ProductSkeleton;
