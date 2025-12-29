import {
    Facebook,
    Instagram,
    Twitter,
    Youtube,
    Mail,
    Phone,
    MapPin,
    ArrowRight,
    Globe,
    Shield
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
    const socialIcons = [
        { Icon: Instagram, bg: "hover:bg-pink-500" },
        { Icon: Twitter, bg: "hover:bg-sky-500" },
        { Icon: Facebook, bg: "hover:bg-blue-600" },
        { Icon: Youtube, bg: "hover:bg-red-600" },
    ];
    return (
        <footer className="bg-white pt-10 lg:pt-16 border-t border-pehnava-border/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                {/* Top Section: Brand & Newsletter */}
                <div className="grid grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 lg:pb-16">
                    {/* Brand Info - Full width on mobile */}
                    <div className="col-span-2 lg:col-span-4 space-y-4 lg:space-y-6">
                        <Link to="/" className="flex items-center gap-3 group">
                            <div className="w-10 h-10 bg-gradient-to-br from-pehnava-primary to-pehnava-accent rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-glow transition-transform group-hover:scale-110">
                                P
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-black text-pehnava-charcoal tracking-tighter leading-none">
                                    Pehnava
                                </span>
                                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-pehnava-primary mt-2">
                                    Traditional Wear
                                </span>
                            </div>
                        </Link>
                        <p className="text-pehnava-slate text-sm leading-relaxed max-w-sm">
                            Redefining contemporary ethnic fashion for the modern man.
                            Premium fabrics, timeless designs, and the soul of tradition.
                        </p>
                        <div className="flex items-center gap-4">
                            {socialIcons.map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className={`p-2.5 bg-pehnava-lightGray text-pehnava-charcoal rounded-full hover:bg-pehnava-primary hover:text-white transition-all duration-300 shadow-soft ${Icon.bg}`}
                                >
                                    <Icon.Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links - Half width on mobile */}
                    <div className="col-span-1 lg:col-span-2 space-y-4 lg:space-y-6">
                        <h4 className="text-pehnava-charcoal font-bold text-sm lg:text-base uppercase tracking-wider">Shop</h4>
                        <ul className="space-y-3 lg:space-y-4">
                            {['Sherwanis', 'Kurtas', 'Jackets', 'Accessories'].map((item) => (
                                <li key={item}>
                                    <Link to="#" className="text-pehnava-slate hover:text-pehnava-primary text-sm transition-colors flex items-center group">
                                        <ArrowRight className="hidden lg:block w-0 h-3 opacity-0 -ml-4 group-hover:w-3 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 mr-2 lg:mr-0" />
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company - Half width on mobile */}
                    <div className="col-span-1 lg:col-span-2 space-y-4 lg:space-y-6">
                        <h4 className="text-pehnava-charcoal font-bold text-sm lg:text-base uppercase tracking-wider">Company</h4>
                        <ul className="space-y-3 lg:space-y-4">
                            {['About Us', 'Collections', 'Sustainability', 'Blog'].map((item) => (
                                <li key={item}>
                                    <Link to="#" className="text-pehnava-slate hover:text-pehnava-primary text-sm transition-colors flex items-center group">
                                        <ArrowRight className="hidden lg:block w-0 h-3 opacity-0 -ml-4 group-hover:w-3 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 mr-2 lg:mr-0" />
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter - Full width on mobile */}
                    <div className="col-span-2 lg:col-span-4 space-y-4 lg:space-y-6">
                        <h4 className="text-pehnava-charcoal font-bold text-sm lg:text-base uppercase tracking-wider">Newsletter</h4>
                        <p className="text-pehnava-slate text-sm">
                            Join our elite circle and get 15% off your first purchase.
                        </p>
                        <form className="relative group max-w-md lg:max-w-none">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full bg-pehnava-lightGray border border-pehnava-border/50 rounded-xl lg:rounded-2xl py-3 lg:py-4 px-4 lg:px-6 text-sm text-pehnava-charcoal outline-none focus:ring-2 focus:ring-pehnava-primary/20 focus:border-pehnava-primary transition-all pr-28 lg:pr-32"
                            />
                            <button
                                type="submit"
                                className="absolute right-1.5 top-1.5 bottom-1.5 px-4 lg:px-6 bg-pehnava-charcoal text-white text-[10px] lg:text-xs font-bold uppercase tracking-widest rounded-lg lg:rounded-xl hover:bg-pehnava-primary transition-colors shadow-medium"
                            >
                                Join
                            </button>
                        </form>
                        <div className="flex flex-wrap items-center gap-4 text-pehnava-slate">
                            <div className="flex items-center gap-2">
                                <Shield className="w-4 h-4 text-pehnava-secondary" />
                                <span className="text-[10px] font-medium uppercase tracking-wider">Secure Payments</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Globe className="w-4 h-4 text-pehnava-secondary" />
                                <span className="text-[10px] font-medium uppercase tracking-wider">Free Shipping</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Strip */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 py-8 border-y border-pehnava-border/30">
                    <div className="flex items-center gap-4 text-pehnava-charcoal">
                        <div className="p-3 bg-pehnava-offWhite rounded-xl border border-pehnava-border/50 shadow-sm">
                            <MapPin className="w-5 h-5 text-pehnava-primary" />
                        </div>
                        <div>
                            <p className="text-[10px] text-pehnava-slate uppercase font-bold tracking-widest">Visit Us</p>
                            <p className="text-sm font-bold">Lucknow, Uttar Pradesh, India</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 text-pehnava-charcoal">
                        <div className="p-3 bg-pehnava-offWhite rounded-xl border border-pehnava-border/50 shadow-sm">
                            <Mail className="w-5 h-5 text-pehnava-primary" />
                        </div>
                        <div>
                            <p className="text-[10px] text-pehnava-slate uppercase font-bold tracking-widest">Email Us</p>
                            <p className="text-sm font-bold">concierge@pehnava.com</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 text-pehnava-charcoal sm:col-span-2 lg:col-span-1">
                        <div className="p-3 bg-pehnava-offWhite rounded-xl border border-pehnava-border/50 shadow-sm">
                            <Phone className="w-5 h-5 text-pehnava-primary" />
                        </div>
                        <div>
                            <p className="text-[10px] text-pehnava-slate uppercase font-bold tracking-widest">Call Us</p>
                            <p className="text-sm font-bold">+91 800 555 1234</p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="py-8 lg:py-10 flex flex-col md:flex-row justify-between items-center gap-4 lg:gap-6 text-center md:text-left">
                    <p className="text-pehnava-slate text-xs order-2 md:order-1">
                        © {new Date().getFullYear()} Pehnava Traditional Wear. Crafted with passion by Team Pehnava.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 lg:gap-8 order-1 md:order-2">
                        {['Privacy Policy', 'Terms of Service', 'Cookie Settings'].map((item) => (
                            <Link key={item} to="#" className="text-pehnava-slate hover:text-pehnava-primary text-xs transition-colors">
                                {item}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;