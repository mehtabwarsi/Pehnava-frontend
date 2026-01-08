import Skeleton from '../common/Skeleton';

const ProductDetailsSkeleton = () => {
    return (
        <div className="min-h-screen bg-pehnava-offWhite">
            {/* Breadcrumb Skeleton */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center gap-2">
                    <Skeleton width="60px" height="16px" />
                    <Skeleton width="10px" height="16px" />
                    <Skeleton width="60px" height="16px" />
                    <Skeleton width="10px" height="16px" />
                    <Skeleton width="150px" height="16px" />
                </div>
            </div>

            {/* Main Content Skeleton */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 md:pb-20">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
                    {/* Image Gallery Skeleton */}
                    <div className="w-full lg:w-[55%] space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Skeleton height="500px" className="rounded-md" />
                            <Skeleton height="500px" className="rounded-md" />
                            <Skeleton height="500px" className="rounded-md" />
                            <Skeleton height="500px" className="rounded-md" />
                        </div>
                    </div>

                    {/* Product Info Skeleton */}
                    <div className="w-full lg:w-[45%] h-fit space-y-8">
                        <div className="space-y-4">
                            <Skeleton width="80%" height="40px" />
                            <Skeleton width="40%" height="24px" />

                            <div className="flex items-baseline gap-3">
                                <Skeleton width="100px" height="40px" />
                                <Skeleton width="80px" height="24px" />
                                <Skeleton width="100px" height="28px" className="rounded-full" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Skeleton width="100%" height="16px" />
                            <Skeleton width="100%" height="16px" />
                            <Skeleton width="60%" height="16px" />
                        </div>

                        <div className="space-y-3">
                            <Skeleton width="100px" height="20px" />
                            <div className="flex gap-2">
                                <Skeleton width="50px" height="40px" className="rounded-xl" />
                                <Skeleton width="50px" height="40px" className="rounded-xl" />
                                <Skeleton width="50px" height="40px" className="rounded-xl" />
                                <Skeleton width="50px" height="40px" className="rounded-xl" />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Skeleton width="100px" height="20px" />
                            <div className="flex gap-2">
                                <Skeleton width="40px" height="40px" className="rounded-lg" />
                                <Skeleton width="80px" height="40px" className="rounded-lg" />
                                <Skeleton width="40px" height="40px" className="rounded-lg" />
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4 border-t border-pehnava-border">
                            <Skeleton width="60%" height="56px" className="rounded-md" />
                            <Skeleton width="40%" height="56px" className="rounded-md" />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-pehnava-border">
                            <Skeleton height="80px" className="rounded-xl" />
                            <Skeleton height="80px" className="rounded-xl" />
                            <Skeleton height="80px" className="rounded-xl" />
                        </div>
                    </div>
                </div>

                {/* Additional Details Skeleton */}
                <div className="mt-10 md:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                    <Skeleton height="300px" className="rounded-2xl" />
                    <Skeleton height="300px" className="rounded-2xl" />
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsSkeleton;
