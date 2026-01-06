import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const slides = [
    {
        id: 1,
        title: "Pehnava",
        subtitle: "Your Style, Your Identity",
        description: "Discover exquisite traditional wear crafted with precision and elegance",
        image: "https://images.unsplash.com/photo-1520975916090-3105956dac38",
        gradient: "from-pehnava-charcoal/30 via-transparent to-transparent",
    },
    {
        id: 2,
        title: "Ethnic & Modern Wear",
        subtitle: "Made for India",
        description: "Where tradition meets contemporary fashion",
        image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
        gradient: "from-pehnava-charcoal/40 via-pehnava-charcoal/20 to-transparent",
    },
    {
        id: 3,
        title: "New Collection",
        subtitle: "Discover the Latest",
        description: "Exclusive designs that celebrate your heritage",
        image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d",
        gradient: "from-black/35 via-transparent to-transparent",
    },
];

const HomeCarousel = () => {
    const [current, setCurrent] = useState(0);
    const navigate = useNavigate();
    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    };

    // Auto slide
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative h-[calc(100vh-80px)] overflow-hidden bg-pehnava-lightGray">
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-all duration-700 ${index === current
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-105"
                        }`}
                >
                    {/* Background Image with Parallax Effect */}
                    <div className="absolute inset-0">
                        <img
                            src={slide.image}
                            alt={slide.title}
                            className={`w-full h-full object-cover object-[50%_20%] transition-transform duration-1000 ${index === current ? "scale-100" : "scale-110"
                                }`}
                        />
                    </div>

                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-linear-to-r ${slide.gradient}`} />

                    {/* Content Container */}
                    <div className="relative h-full flex items-center">
                        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
                            <div className={`max-w-2xl space-y-6 transition-all duration-700 delay-200 ${index === current
                                ? "opacity-100 translate-x-0"
                                : "opacity-0 -translate-x-10"
                                }`}>

                                {/* Title */}
                                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight drop-shadow-2xl">
                                    {slide.title}
                                </h1>

                                {/* Description */}
                                <p className="text-lg sm:text-xl text-white font-light leading-relaxed drop-shadow-lg">
                                    {slide.description}
                                </p>

                                {/* CTA Buttons */}
                                <div className="flex flex-wrap items-center gap-4 pt-4">
                                    <button onClick={() => navigate("/shop")} className="group relative px-8 py-4 bg-white text-pehnava-primary font-bold rounded-xl shadow-large hover:shadow-glow transition-all duration-300 hover:scale-105 overflow-hidden">
                                        <span className="relative z-10">Shop Collection</span>
                                        <div className="absolute inset-0 bg-linear-to-r from-pehnava-primary to-pehnava-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        <span className="absolute inset-0 z-10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-bold">
                                            Shop Collection
                                        </span>
                                    </button>

                                    <button className="px-8 py-4 bg-white/10  text-white font-semibold rounded-xl border-2 border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300 hover:scale-105">
                                        Learn More
                                    </button>
                                </div>

                                {/* Stats */}
                                <div className="flex items-center gap-8 pt-6">
                                    <div className="space-y-1">
                                        <div className="text-3xl font-bold text-white drop-shadow-lg">500+</div>
                                        <div className="text-sm text-white drop-shadow-md">Products</div>
                                    </div>
                                    <div className="w-px h-12 bg-white/30"></div>
                                    <div className="space-y-1">
                                        <div className="text-3xl font-bold text-white drop-shadow-lg">10K+</div>
                                        <div className="text-sm text-white drop-shadow-md">Happy Customers</div>
                                    </div>
                                    <div className="w-px h-12 bg-white/30"></div>
                                    <div className="space-y-1">
                                        <div className="text-3xl font-bold text-white drop-shadow-lg">4.9★</div>
                                        <div className="text-sm text-white drop-shadow-md">Rating</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="hidden md:block absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 text-white hover:scale-110"
                aria-label="Previous slide"
            >
                <ChevronLeft className="w-12 h-12" />
            </button>

            <button
                onClick={nextSlide}
                className="hidden md:block absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 text-white hover:scale-110"
                aria-label="Next slide"
            >
                <ChevronRight className="w-12 h-12" />
            </button>

            Progress Indicators
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className="group relative"
                        aria-label={`Go to slide ${index + 1}`}
                    >
                        {index === current ? (
                            <div className="relative w-12 h-1.5 bg-white rounded-full overflow-hidden">
                                <div className="absolute inset-0 bg-white/40"></div>
                                <div className="absolute inset-0 bg-white animate-[slideProgress_5s_linear_infinite]"></div>
                            </div>
                        ) : (
                            <div className="w-12 h-1.5 bg-white/40 rounded-full group-hover:bg-white/60 transition-colors"></div>
                        )}
                    </button>
                ))}
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-20 right-10 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
        </section>
    );
};

export default HomeCarousel;
