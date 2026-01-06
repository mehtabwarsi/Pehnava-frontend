import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { Search, UserRound, Menu, X, ShoppingCart } from "lucide-react";

const Navbar = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const cartItemCount = 3;



    const NAV_ITEMS = [
        { label: "Home", path: "/" },
        { label: "Shop", path: "/shop" },
        { label: "Collections", path: "/collections" },
        { label: "About", path: "/about" },
    ];

    const DesktopNavItem = ({ to, label }: any) => (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `relative px-4 py-2 text-sm font-semibold uppercase tracking-wider transition-all duration-300 rounded-lg ${isActive
                    ? "text-pehnava-primary bg-pehnava-primary/10"
                    : "text-pehnava-darkSlate hover:text-pehnava-primary hover:bg-pehnava-lightGray"
                }`
            }
        >
            {({ isActive }) => (
                <>
                    {label}
                    {isActive && (
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-pehnava-primary rounded-full animate-fadeIn"></span>
                    )}
                </>
            )}
        </NavLink>
    );


    const MobileNavItem = ({ to, label, close }: any) => (
        <NavLink
            to={to}
            onClick={close}
            className={({ isActive }) =>
                `flex items-center justify-between px-4 py-3 rounded-xl font-semibold transition-all ${isActive
                    ? "bg-pehnava-primary text-white"
                    : "text-pehnava-darkSlate hover:bg-pehnava-lightGray"
                }`
            }
        >
            <span>{label}</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
        </NavLink>
    );

    return (
        <nav className="sticky top-0 z-50 bg-pehnava-white/80 backdrop-blur-xl shadow-medium border-b border-pehnava-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 sm:h-20">

                    {/* Logo (UNCHANGED) */}
                    <Link to="/" className="flex items-center gap-2 sm:gap-3 group z-50">
                        <div className="relative">
                            <div className="absolute inset-0 bg-linear-to-br from-pehnava-primary to-pehnava-accent rounded-lg sm:rounded-xl blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-br from-pehnava-primary to-pehnava-accent rounded-lg sm:rounded-xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-glow">
                                <span className="text-lg sm:text-xl font-bold text-white">P</span>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl sm:text-2xl font-bold tracking-tight text-pehnava-charcoal group-hover:text-pehnava-primary transition-colors duration-300">
                                Pehnava
                            </span>
                            <span className="hidden sm:block text-xs text-pehnava-slate tracking-wider uppercase">
                                Traditional Wear
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation OR Search Input */}
                    <div className="hidden lg:flex items-center flex-1 justify-center px-8">
                        {isSearchOpen ? (
                            // Search Input (Inline)
                            <div className="relative w-full max-w-2xl">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Search className="w-5 h-5 text-pehnava-slate" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search for kurtas, sherwanis, accessories..."
                                    className="w-full pl-12 pr-12 py-2.5 bg-pehnava-offWhite border-2 border-pehnava-border rounded-xl 
                                             text-pehnava-charcoal placeholder-pehnava-slate
                                             focus:outline-none focus:border-pehnava-primary focus:ring-2 focus:ring-pehnava-primary/20
                                             transition-all duration-300 text-sm"
                                    autoFocus
                                />
                                <button
                                    onClick={() => setIsSearchOpen(false)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center group"
                                >
                                    <X className="w-5 h-5 text-pehnava-slate group-hover:text-pehnava-accent transition-colors" />
                                </button>
                            </div>
                        ) : (
                            // Navigation Items
                            <div className="flex items-center gap-1">
                                {NAV_ITEMS.map(item => (
                                    <DesktopNavItem
                                        key={item.path}
                                        to={item.path}
                                        label={item.label}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right Actions (UNCHANGED) */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        <button
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className="flex relative p-2 sm:p-3 hover:bg-pehnava-lightGray rounded-xl transition-all duration-300 group"
                        >
                            <Search className="w-5 h-5 text-pehnava-slate group-hover:text-pehnava-primary" />
                            <span className="absolute inset-0 rounded-xl bg-pehnava-primary/10 scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></span>
                        </button>

                        <Link
                            to="/profile"
                            className="hidden sm:flex relative p-2 sm:p-3 hover:bg-pehnava-lightGray rounded-xl transition-all duration-300 group"
                        >
                            <UserRound className="w-5 h-5 text-pehnava-slate group-hover:text-pehnava-primary" />
                            <span className="absolute inset-0 rounded-xl bg-pehnava-primary/10 scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></span>
                        </Link>

                        <Link to="/cart" className="relative group">
                            <div className="relative px-3 py-2 sm:px-4 sm:py-3 bg-linear-to-br from-pehnava-accent to-pehnava-accentDark rounded-lg sm:rounded-xl shadow-medium hover:shadow-large transition-all duration-300 hover:scale-105">
                                <div className="flex items-center gap-2">
                                    <ShoppingCart className="w-5 h-5 text-white" />
                                    <span className="hidden sm:inline text-sm font-bold text-white">Cart</span>
                                </div>
                                {cartItemCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-pehnava-primary text-white text-xs font-bold rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center shadow-soft ring-2 ring-white animate-scaleIn">
                                        {cartItemCount}
                                    </span>
                                )}
                            </div>
                        </Link>

                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden relative p-2 hover:bg-pehnava-lightGray rounded-lg transition-all duration-300"
                        >
                            {isMobileMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu (SHORTENED, UI SAME) */}
            {isMobileMenuOpen && (
                <div className="lg:hidden bg-pehnava-white border-t border-pehnava-border animate-slideDown">
                    <div className="px-4 py-6 space-y-3">
                        {NAV_ITEMS.map(item => (
                            <MobileNavItem
                                key={item.path}
                                to={item.path}
                                label={item.label}
                                close={() => setIsMobileMenuOpen(false)}
                            />
                        ))}

                        <Link
                            to="/profile"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center justify-between px-4 py-3 rounded-xl font-semibold text-pehnava-darkSlate hover:bg-pehnava-lightGray transition-all"
                        >
                            <div className="flex items-center gap-3">
                                <UserRound className="w-5 h-5" />
                                <span>My Profile</span>
                            </div>
                        </Link>
                    </div>
                </div>
            )}

            {/* Mobile Search Overlay */}
            {isSearchOpen && (
                <div className="lg:hidden fixed inset-0 z-50 bg-pehnava-charcoal/95 backdrop-blur-sm animate-fadeIn">
                    <div className="h-full flex flex-col">
                        {/* Search Header */}
                        <div className="bg-pehnava-white border-b border-pehnava-border px-4 py-4">
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setIsSearchOpen(false)}
                                    className="p-2 hover:bg-pehnava-lightGray rounded-lg transition-all"
                                >
                                    <X className="w-5 h-5 text-pehnava-charcoal" />
                                </button>
                                <div className="relative flex-1">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Search className="w-5 h-5 text-pehnava-slate" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Search products..."
                                        className="w-full pl-10 pr-4 py-3 bg-pehnava-offWhite border-2 border-pehnava-border rounded-xl 
                                                 text-pehnava-charcoal placeholder-pehnava-slate
                                                 focus:outline-none focus:border-pehnava-primary focus:ring-2 focus:ring-pehnava-primary/20
                                                 transition-all duration-300 text-sm"
                                        autoFocus
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Popular Searches */}
                        <div className="flex-1 bg-pehnava-white p-4 overflow-y-auto">
                            <h3 className="text-sm font-bold text-pehnava-charcoal uppercase tracking-wider mb-3">
                                Popular Searches
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {['Kurta Sets', 'Sherwani', 'Ethnic Jackets', 'Accessories', 'Traditional Wear', 'Wedding Collection'].map((tag) => (
                                    <button
                                        key={tag}
                                        onClick={() => setIsSearchOpen(false)}
                                        className="px-4 py-2 bg-pehnava-lightGray hover:bg-pehnava-primary hover:text-white 
                                                 text-pehnava-charcoal text-sm rounded-lg font-medium
                                                 transition-all duration-300"
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
