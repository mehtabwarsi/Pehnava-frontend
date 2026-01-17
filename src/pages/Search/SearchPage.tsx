import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ArrowLeft, X, ArrowUpRight } from "lucide-react";
import { useSearchProducts } from "../../services/useApiHook";
import { useDebounce } from "../../hooks/useDebounce";

const SearchPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    const { data: searchResults, isLoading } = useSearchProducts(debouncedSearchQuery);

    return (
        <div className="min-h-screen bg-pehnava-white flex flex-col">
            {/* Search Header */}
            <div className="sticky top-0 z-50 bg-pehnava-white border-b border-pehnava-border px-4 py-4">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 hover:bg-pehnava-lightGray rounded-full transition-all"
                    >
                        <ArrowLeft className="w-6 h-6 text-pehnava-charcoal" />
                    </button>
                    <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="w-5 h-5 text-pehnava-slate" />
                        </div>
                        <input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            type="text"
                            placeholder="Search products..."
                            className="w-full pl-10 pr-4 py-3 bg-pehnava-offWhite border-none rounded-xl 
                                     text-pehnava-charcoal placeholder-pehnava-slate
                                     focus:outline-none focus:ring-2 focus:ring-pehnava-primary/20
                                     transition-all duration-300 text-base"
                            autoFocus
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                                <X className="w-5 h-5 text-pehnava-slate hover:text-pehnava-charcoal" />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Search Results */}
            <div className="flex-1 bg-pehnava-white overflow-y-auto">
                {searchQuery ? (
                    <div className="px-4">
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center py-20 gap-4 text-pehnava-slate">
                                <div className="w-10 h-10 border-4 border-pehnava-primary/10 border-t-pehnava-primary rounded-full animate-spin"></div>
                                <p className="text-sm font-medium tracking-wide">Searching products...</p>
                            </div>
                        ) : searchResults?.data?.products?.length > 0 ? (
                            <div className="divide-y divide-pehnava-border/40">
                                {searchResults.data.products.map((product: any) => (
                                    <button
                                        key={product._id}
                                        onClick={() => navigate(`/product/${product._id}`)}
                                        className="w-full flex items-center justify-between py-5 active:bg-pehnava-offWhite transition-all group text-left"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-pehnava-offWhite flex items-center justify-center text-pehnava-slate/60 group-active:text-pehnava-primary">
                                                <Search className="w-4 h-4" />
                                            </div>
                                            <span className="text-[16px] font-medium text-pehnava-charcoal">{product.name}</span>
                                        </div>
                                        <ArrowUpRight className="w-5 h-5 text-pehnava-slate/30" />
                                    </button>
                                ))}
                            </div>
                        ) : debouncedSearchQuery ? (
                            <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
                                <div className="w-20 h-20 bg-pehnava-offWhite rounded-full flex items-center justify-center mb-4">
                                    <Search className="w-10 h-10 text-pehnava-slate/20" />
                                </div>
                                <h4 className="text-lg font-bold text-pehnava-charcoal mb-2">No results found</h4>
                                <p className="text-pehnava-slate">We couldn't find any products matching "{searchQuery}"</p>
                            </div>
                        ) : null}
                    </div>
                ) : (
                    <div className="p-6">
                        <h3 className="text-xs font-bold text-pehnava-slate uppercase tracking-widest mb-4">
                            Popular Searches
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {['Kurta Sets', 'Sherwani', 'Ethnic Jackets', 'Accessories', 'Traditional Wear'].map((tag) => (
                                <button
                                    key={tag}
                                    onClick={() => setSearchQuery(tag)}
                                    className="px-5 py-2.5 bg-pehnava-offWhite hover:bg-pehnava-primary/10 
                                             text-pehnava-charcoal text-sm rounded-full font-medium
                                             transition-all duration-300 border border-pehnava-border/30"
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchPage;
