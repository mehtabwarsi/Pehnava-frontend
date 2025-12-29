import { Gem, Leaf, ShieldCheck, Heart, Award, Sparkles, MoveRight } from "lucide-react";

const AboutPage = () => {
    return (
        <div className="bg-pehnava-offWhite overflow-hidden">

            {/* HERO SECTION */}
            <section className="relative px-4 sm:px-6 py-24 sm:py-32 lg:py-40 text-center">
                {/* Background Decoration */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pehnava-primary/10 via-transparent to-transparent pointer-events-none" />

                <div className="relative max-w-4xl mx-auto space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pehnava-primary/10 text-pehnava-primary text-xs font-bold uppercase tracking-wider mb-4 animate-fadeIn">
                        <Sparkles className="w-4 h-4" /> Since 2024
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-pehnava-charcoal tracking-tight leading-tight">
                        Weaving Tradition with <br />
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-pehnava-primary to-pehnava-accent">
                            Modern Elegance
                        </span>
                    </h1>
                    <p className="text-pehnava-slate text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
                        Pehnava isn't just a brand; it's a celebration of heritage tailored for the contemporary lifestyle.
                    </p>
                </div>
            </section>

            {/* STORY SECTION */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <div className="relative">
                    <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                        <img
                            src="https://images.unsplash.com/photo-1520975916090-3105956dac38"
                            alt="Pehnava Craftsman"
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                        />
                    </div>
                    {/* Floating Badge */}
                    <div className="absolute -bottom-6 -right-6 lg:right-6 bg-white p-6 rounded-2xl shadow-xl max-w-[200px] hidden sm:block">
                        <p className="text-4xl font-bold text-pehnava-primary">100%</p>
                        <p className="text-sm font-medium text-pehnava-charcoal mt-1">Handcrafted by expert artisans</p>
                    </div>
                </div>

                <div className="space-y-8">
                    <div>
                        <span className="text-sm font-bold text-pehnava-primary uppercase tracking-widest">Our Story</span>
                        <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-pehnava-charcoal">
                            Crafted for the Soul
                        </h2>
                    </div>
                    <div className="space-y-6 text-pehnava-slate text-lg leading-relaxed">
                        <p>
                            It started with a simple observation: traditional wear was becoming an "occasion-only" outfit. We wanted to change that.
                        </p>
                        <p>
                            At Pehnava, we believe that cultural identity shouldn't be uncomfortable. By blending premium, breathable fabrics with cuts that respect modern movement, we've created a line that feels as good as it looks.
                        </p>
                    </div>
                    <div className="pt-4">
                        <button className="group flex items-center gap-2 text-pehnava-charcoal font-bold border-b-2 border-pehnava-charcoal pb-1 hover:text-pehnava-primary hover:border-pehnava-primary transition-colors cursor-pointer">
                            Read Our Full Journey <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </button>
                    </div>
                </div>
            </section>

            {/* WHY CHOOSE US - GRID */}
            <section className="bg-white py-24 border-y border-pehnava-border/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-pehnava-charcoal mb-4">Why Choose Pehnava?</h2>
                        <p className="text-pehnava-slate">We obsess over the details so you don't have to.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: Gem, title: "Premium Fabrics", desc: "Sourced from the finest mills across India." },
                            { icon: Award, title: "Master Craftsmanship", desc: "Every stitch tells a story of perfection." },
                            { icon: Leaf, title: "Sustainable", desc: "Eco-friendly dyes and plastic-free packaging." },
                            { icon: Heart, title: "Made with Love", desc: "Designed to make you feel confident." },
                        ].map((feature, idx) => (
                            <div key={idx} className="group p-8 rounded-3xl bg-pehnava-offWhite border border-transparent hover:border-pehnava-primary/20 hover:shadow-large transition-all duration-300">
                                <div className="w-14 h-14 bg-white rounded-2xl shadow-soft flex items-center justify-center text-pehnava-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <feature.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-bold text-pehnava-charcoal mb-3">{feature.title}</h3>
                                <p className="text-pehnava-slate leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* OUR VALUES */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24 text-center">
                <div className="max-w-3xl mx-auto space-y-8">
                    <div className="w-16 h-16 mx-auto bg-pehnava-primary/10 rounded-full flex items-center justify-center text-pehnava-primary">
                        <ShieldCheck className="w-8 h-8" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-pehnava-charcoal">
                        Our Promise to You
                    </h2>
                    <p className="text-xl text-pehnava-slate leading-relaxed">
                        "We promise quality that lasts, designs that inspire, and a shopping experience that feels personal. If you don't love it, we'll make it right."
                    </p>
                    <div className="flex items-center justify-center gap-4 pt-4">
                        <div className="flex -space-x-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="w-12 h-12 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                                    <img src={`https://randomuser.me/api/portraits/men/${i + 20}.jpg`} alt="Team" className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                        <div className="text-left">
                            <p className="text-sm font-bold text-pehnava-charcoal">Trusted by</p>
                            <p className="text-xs text-pehnava-slate">10,000+ Customers</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* NEWSLETTER CTA */}
            <section className="px-4 sm:px-6 pb-24">
                <div className="max-w-5xl mx-auto bg-pehnava-charcoal rounded-[2.5rem] p-8 sm:p-16 text-center relative overflow-hidden">
                    {/* Abstract Shapes */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-pehnava-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-pehnava-accent/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>

                    <div className="relative z-10 space-y-8">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
                            Join the Pehnava Family
                        </h2>
                        <p className="text-white/70 text-lg max-w-xl mx-auto">
                            Be the first to know about new collections, exclusive events, and style tips.
                        </p>
                        <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="flex-1 bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-white placeholder-white/50 focus:outline-hidden focus:ring-2 focus:ring-white/50 backdrop-blur-md transition-all"
                            />
                            <button className="bg-white text-pehnava-charcoal font-bold px-8 py-4 rounded-xl hover:scale-105 transition-transform shadow-lg cursor-pointer">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default AboutPage;
