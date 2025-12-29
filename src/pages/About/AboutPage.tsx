const AboutPage = () => {
    return (
        <div className="bg-pehnava-offWhite">

            {/* HERO */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 py-20 text-center">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-pehnava-charcoal tracking-tight">
                    Designed for Everyday Elegance
                </h1>
                <p className="mt-6 text-pehnava-slate text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                    Pehnava is a modern fashion brand focused on timeless silhouettes,
                    premium fabrics, and effortless comfort.
                </p>
            </section>

            {/* STORY */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div>
                    <span className="text-xs uppercase tracking-widest text-pehnava-slate">
                        Our Story
                    </span>
                    <h2 className="mt-3 text-2xl sm:text-3xl font-medium text-pehnava-charcoal">
                        Clothing that feels right
                    </h2>
                    <p className="mt-6 text-pehnava-slate text-sm sm:text-base leading-relaxed">
                        Pehnava was created with a simple belief — clothing should feel
                        comfortable, look refined, and stay relevant beyond trends.
                        Every piece is thoughtfully designed for everyday living.
                    </p>
                </div>

                <div className="h-[320px] rounded-2xl overflow-hidden bg-pehnava-lightGray">
                    <img
                        src="https://images.unsplash.com/photo-1520975916090-3105956dac38"
                        alt="Pehnava story"
                        className="w-full h-full object-cover"
                    />
                </div>
            </section>

            {/* WHY PEHNAVA */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
                <h2 className="text-center text-2xl sm:text-3xl font-medium text-pehnava-charcoal mb-14">
                    Why Pehnava
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
                    {[
                        "Premium Fabrics",
                        "Timeless Design",
                        "Thoughtful Craft",
                        "Everyday Comfort",
                    ].map((item, index) => (
                        <div key={index} className="text-center">
                            <div className="h-20 w-20 mx-auto mb-4 rounded-full bg-pehnava-lightGray flex items-center justify-center text-pehnava-charcoal font-medium">
                                {index + 1}
                            </div>
                            <p className="text-sm text-pehnava-slate">
                                {item}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* VALUES */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 py-20 text-center">
                <h2 className="text-2xl sm:text-3xl font-medium text-pehnava-charcoal mb-6">
                    Our Values
                </h2>
                <p className="text-pehnava-slate text-sm sm:text-base leading-relaxed">
                    Simplicity, quality, and authenticity guide everything we create.
                    Pehnava believes in fashion that is effortless, refined, and
                    made to be worn every day.
                </p>
            </section>

        </div>
    );
};

export default AboutPage;
