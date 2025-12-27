import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const cartItemCount = 3;

    return (
        <nav className="sticky top-0 z-50 bg-pehnava-white/80 backdrop-blur-xl shadow-medium border-b border-pehnava-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 sm:h-20">

                    {/* Logo */}
                    <Link
                        to="/"
                        className="flex items-center gap-2 sm:gap-3 group z-50"
                    >
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
                            <span className="hidden sm:block text-xs text-pehnava-slate tracking-wider uppercase">Traditional Wear</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-1">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `relative px-4 py-2 text-sm font-semibold uppercase tracking-wider transition-all duration-300 rounded-lg ${isActive
                                    ? "text-pehnava-primary bg-pehnava-primary/10"
                                    : "text-pehnava-darkSlate hover:text-pehnava-primary hover:bg-pehnava-lightGray"
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    Home
                                    {isActive && (
                                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-pehnava-primary rounded-full animate-fadeIn"></span>
                                    )}
                                </>
                            )}
                        </NavLink>

                        <NavLink
                            to="/products"
                            className={({ isActive }) =>
                                `relative px-4 py-2 text-sm font-semibold uppercase tracking-wider transition-all duration-300 rounded-lg ${isActive
                                    ? "text-pehnava-primary bg-pehnava-primary/10"
                                    : "text-pehnava-darkSlate hover:text-pehnava-primary hover:bg-pehnava-lightGray"
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    Shop
                                    {isActive && (
                                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-pehnava-primary rounded-full animate-fadeIn"></span>
                                    )}
                                </>
                            )}
                        </NavLink>

                        <NavLink
                            to="/collections"
                            className={({ isActive }) =>
                                `relative px-4 py-2 text-sm font-semibold uppercase tracking-wider transition-all duration-300 rounded-lg ${isActive
                                    ? "text-pehnava-primary bg-pehnava-primary/10"
                                    : "text-pehnava-darkSlate hover:text-pehnava-primary hover:bg-pehnava-lightGray"
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    Collections
                                    {isActive && (
                                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-pehnava-primary rounded-full animate-fadeIn"></span>
                                    )}
                                </>
                            )}
                        </NavLink>

                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                `relative px-4 py-2 text-sm font-semibold uppercase tracking-wider transition-all duration-300 rounded-lg ${isActive
                                    ? "text-pehnava-primary bg-pehnava-primary/10"
                                    : "text-pehnava-darkSlate hover:text-pehnava-primary hover:bg-pehnava-lightGray"
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    About
                                    {isActive && (
                                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-pehnava-primary rounded-full animate-fadeIn"></span>
                                    )}
                                </>
                            )}
                        </NavLink>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-2 sm:gap-3">

                        {/* Search - Hidden on mobile */}
                        <button
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className="hidden sm:flex relative p-2 sm:p-3 hover:bg-pehnava-lightGray rounded-xl transition-all duration-300 group"
                            aria-label="Search"
                        >
                            <svg
                                className="w-5 h-5 text-pehnava-slate group-hover:text-pehnava-primary transition-colors"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                            <span className="absolute inset-0 rounded-xl bg-pehnava-primary/10 scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></span>
                        </button>

                        {/* User Profile - Hidden on mobile */}
                        <Link
                            to="/profile"
                            className="hidden sm:flex relative p-2 sm:p-3 hover:bg-pehnava-lightGray rounded-xl transition-all duration-300 group"
                            aria-label="Profile"
                        >
                            <svg
                                className="w-5 h-5 text-pehnava-slate group-hover:text-pehnava-primary transition-colors"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                            </svg>
                            <span className="absolute inset-0 rounded-xl bg-pehnava-primary/10 scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></span>
                        </Link>

                        {/* Cart */}
                        <Link
                            to="/cart"
                            className="relative group"
                            aria-label="Shopping Cart"
                        >
                            <div className="relative px-3 py-2 sm:px-4 sm:py-3 bg-linear-to-br from-pehnava-accent to-pehnava-accentDark rounded-lg sm:rounded-xl shadow-medium hover:shadow-large transition-all duration-300 hover:scale-105">
                                <div className="flex items-center gap-2">
                                    <svg
                                        className="w-5 h-5 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                        />
                                    </svg>
                                    <span className="hidden sm:inline text-sm font-bold text-white">Cart</span>
                                </div>
                                {cartItemCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-pehnava-primary text-white text-xs font-bold rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center shadow-soft ring-2 ring-white animate-scaleIn">
                                        {cartItemCount}
                                    </span>
                                )}
                            </div>
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden relative p-2 hover:bg-pehnava-lightGray rounded-lg transition-all duration-300"
                            aria-label="Toggle menu"
                        >
                            <div className="w-6 h-5 flex flex-col justify-between">
                                <span className={`w-full h-0.5 bg-pehnava-charcoal rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                                <span className={`w-full h-0.5 bg-pehnava-charcoal rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                                <span className={`w-full h-0.5 bg-pehnava-charcoal rounded-full transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Desktop Search Bar */}
                {isSearchOpen && (
                    <div className="hidden sm:block pb-6 pt-2 animate-slideDown">
                        <div className="relative">
                            <div className="absolute inset-0 bg-linear-to-r from-pehnava-primary/20 via-pehnava-accent/20 to-pehnava-secondary/20 rounded-2xl blur-xl"></div>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search for sarees, lehengas, kurtas..."
                                    className="w-full bg-pehnava-lightGray text-pehnava-charcoal placeholder-pehnava-slate px-6 py-4 pl-14 pr-32 rounded-2xl border-2 border-pehnava-border focus:outline-none focus:border-pehnava-primary focus:ring-4 focus:ring-pehnava-primary/10 transition-all shadow-soft hover:shadow-medium font-medium"
                                    autoFocus
                                />
                                <svg
                                    className="w-6 h-6 text-pehnava-primary absolute left-5 top-1/2 -translate-y-1/2"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                                <button className="absolute right-3 top-1/2 -translate-y-1/2 px-5 py-2 bg-linear-to-r from-pehnava-primary to-pehnava-primaryDark text-white text-sm font-semibold rounded-xl hover:shadow-glow transition-all duration-300 hover:scale-105">
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden bg-pehnava-white border-t border-pehnava-border animate-slideDown">
                    <div className="px-4 py-6 space-y-3">
                        {/* Mobile Search */}
                        <div className="mb-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-full bg-pehnava-lightGray text-pehnava-charcoal placeholder-pehnava-slate px-4 py-3 pl-11 rounded-xl border-2 border-pehnava-border focus:outline-none focus:border-pehnava-primary transition-all"
                                />
                                <svg
                                    className="w-5 h-5 text-pehnava-slate absolute left-3 top-1/2 -translate-y-1/2"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </div>
                        </div>

                        {/* Mobile Navigation Links */}
                        <NavLink
                            to="/"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center justify-between px-4 py-3 rounded-xl font-semibold transition-all ${isActive
                                    ? "bg-pehnava-primary text-white"
                                    : "text-pehnava-darkSlate hover:bg-pehnava-lightGray"
                                }`
                            }
                        >
                            <span>Home</span>
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </NavLink>

                        <NavLink
                            to="/products"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center justify-between px-4 py-3 rounded-xl font-semibold transition-all ${isActive
                                    ? "bg-pehnava-primary text-white"
                                    : "text-pehnava-darkSlate hover:bg-pehnava-lightGray"
                                }`
                            }
                        >
                            <span>Shop</span>
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </NavLink>

                        <NavLink
                            to="/collections"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center justify-between px-4 py-3 rounded-xl font-semibold transition-all ${isActive
                                    ? "bg-pehnava-primary text-white"
                                    : "text-pehnava-darkSlate hover:bg-pehnava-lightGray"
                                }`
                            }
                        >
                            <span>Collections</span>
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </NavLink>

                        <NavLink
                            to="/about"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center justify-between px-4 py-3 rounded-xl font-semibold transition-all ${isActive
                                    ? "bg-pehnava-primary text-white"
                                    : "text-pehnava-darkSlate hover:bg-pehnava-lightGray"
                                }`
                            }
                        >
                            <span>About</span>
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </NavLink>

                        {/* Mobile Profile Link */}
                        <Link
                            to="/profile"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center justify-between px-4 py-3 rounded-xl font-semibold text-pehnava-darkSlate hover:bg-pehnava-lightGray transition-all"
                        >
                            <div className="flex items-center gap-3">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <span>My Profile</span>
                            </div>
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
