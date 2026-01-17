import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Search, UserRound, Menu, X, ShoppingBag } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { useCartCount, useSearchProducts } from "../../services/useApiHook";

import { useDebounce } from "../../hooks/useDebounce";

const Navbar = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleSearchToggle = () => {
        if (window.innerWidth < 1024) {
            navigate("/search");
        } else {
            setIsSearchOpen(!isSearchOpen);
        }
    };

    // Dynamic counts from Redux
    const user = useSelector((state: RootState) => state.auth.user);
    const [searchQuery, setSearchQuery] = useState("");

    // Debounce search query by 500ms
    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    const { data: searchResults, isLoading } = useSearchProducts(debouncedSearchQuery);
    const { data: cartCount } = useCartCount({
        enabled: !!user
    });


    const NAV_ITEMS = [
        { label: "Home", path: "/" },
        { label: "Men", path: "/shop?gender=men" },
        { label: "Women", path: "/shop?gender=women" },
        { label: "Collections", path: "/collections" },
    ];

    const DesktopNavItem = ({ to, label }: any) => {
        const location = useLocation();
        const isActive = location.pathname + location.search === to;

        return (
            <NavLink
                to={to}
                className={`relative px-4 py-2 text-sm font-semibold uppercase tracking-wider transition-all duration-300 rounded-lg ${isActive
                    ? "text-pehnava-primary bg-pehnava-primary/10"
                    : "text-pehnava-darkSlate hover:text-pehnava-primary hover:bg-pehnava-lightGray"
                    }`}
            >
                <>
                    {label}
                    {isActive && (
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-pehnava-primary rounded-full animate-fadeIn"></span>
                    )}
                </>
            </NavLink>
        );
    };


    const MobileNavItem = ({ to, label, close }: any) => {
        const location = useLocation();
        const isActive = location.pathname + location.search === to;

        return (
            <NavLink
                to={to}
                onClick={close}
                className={`flex items-center justify-between px-4 py-3 rounded-xl font-semibold transition-all ${isActive
                    ? "bg-pehnava-primary text-white"
                    : "text-pehnava-darkSlate hover:bg-pehnava-lightGray"
                    }`}
            >
                <span>{label}</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </NavLink>
        );
    };

    return (
        <nav id="main-navbar" className="sticky top-0 z-50 bg-pehnava-white/80 backdrop-blur-xl shadow-medium border-b border-pehnava-border transition-transform duration-300">
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
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    type="text"
                                    placeholder="Search for kurtas, sherwanis, accessories..."
                                    className="w-full pl-12 pr-12 py-2.5 bg-pehnava-offWhite border-2 border-pehnava-border rounded-xl 
                                             text-pehnava-charcoal placeholder-pehnava-slate
                                             focus:outline-none focus:border-pehnava-primary focus:ring-2 focus:ring-pehnava-primary/20
                                             transition-all duration-300 text-sm"
                                    autoFocus
                                />
                                <button
                                    onClick={() => {
                                        setIsSearchOpen(false);
                                        setSearchQuery("");
                                    }}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center group"
                                >
                                    <X className="w-5 h-5 text-pehnava-slate group-hover:text-pehnava-accent transition-colors" />
                                </button>

                                {/* Desktop Search Dropdown */}
                                {searchQuery && (
                                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-pehnava-border overflow-hidden max-h-[400px] overflow-y-auto z-50">
                                        {isLoading ? (
                                            <div className="p-4 flex items-center justify-center gap-2 text-pehnava-slate text-sm">
                                                <div className="w-4 h-4 border-2 border-pehnava-primary border-t-transparent rounded-full animate-spin"></div>
                                                Searching...
                                            </div>
                                        ) : searchResults?.data?.products?.length > 0 ? (
                                            <div className="py-2">
                                                {searchResults.data.products.map((product: any) => (
                                                    <a
                                                        key={product._id}
                                                        href={`/product/${product._id}`}
                                                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-pehnava-offWhite transition-colors border-b border-pehnava-border/50 last:border-0"
                                                    >
                                                        <Search className="w-4 h-4 text-pehnava-slate/70" />
                                                        <h4 className="text-sm font-medium text-pehnava-charcoal truncate">{product.name}</h4>
                                                    </a>
                                                ))}
                                            </div>
                                        ) : debouncedSearchQuery ? (
                                            <div className="p-4 text-center text-pehnava-slate text-sm">
                                                No products found for "{searchQuery}"
                                            </div>
                                        ) : null}
                                    </div>
                                )}
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
                            onClick={handleSearchToggle}
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
                                    <ShoppingBag className="w-5 h-5 text-white" />
                                    <span className="hidden sm:inline text-sm font-bold text-white">Bag</span>
                                </div>
                                {user && cartCount?.data?.totalQuantity > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-pehnava-primary text-white text-xs font-bold rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center shadow-soft ring-2 ring-white animate-scaleIn">
                                        {cartCount?.data?.totalQuantity}
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

        </nav>
    );
};

export default Navbar;
