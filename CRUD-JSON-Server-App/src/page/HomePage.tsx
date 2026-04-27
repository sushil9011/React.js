import { useEffect, useState } from "react";
import { fetchAllProducts } from "../Services/ProductService";
import type { productFetchType } from "../utils/global";
import { Link } from "react-router";

export default function HomePage() {
    const [allProducts, setAllProducts] = useState<productFetchType[]>([]);
    const [allCategories, setAllCategories] = useState<string[]>([]);
    const [filterCategory, setFilterCategory] = useState<string>("All");

    useEffect(() => {
        getAllProductData();
    }, []);

    useEffect(() => {
        let allCategory: any = new Set(allProducts.map((product) => product.p_category));
        allCategory = Array.from(allCategory);
        setAllCategories(["All", ...allCategory]);
    }, [allProducts]);

    const getAllProductData = async () => {
        const allProductData = await fetchAllProducts();
        setAllProducts(allProductData);
    };

    const filterProducts = (filterCategory === "All")
        ? allProducts
        : allProducts.filter((product) => product.p_category === filterCategory);

    return (
        <div className="bg-white min-h-screen font-sans text-slate-900">
            {/* --- Minimalist Header --- */}
            <header className="border-b border-slate-100 sticky top-0 bg-white z-50">
                <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link to="/" className="text-2xl font-bold tracking-tighter text-slate-950">
                        VeloCity<span className="text-indigo-600">.</span>
                    </Link>
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                        <span>Catalog</span>
                        <span className="text-slate-300">/</span>
                        <span className="text-slate-900 font-semibold">{filterCategory}</span>
                    </div>
                </nav>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-12 md:py-16">
                {/* --- Section Title & Description --- */}
                <div className="mb-12 border-l-4 border-indigo-500 pl-6 py-2">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-slate-950">
                        The Core Collection
                    </h1>
                    <p className="mt-3 text-lg text-slate-600 max-w-2xl">
                        Discover a refined selection of essential assets, designed for performance and built to last.
                    </p>
                </div>

                {/* --- Inline Category Navigation --- */}
                <div className="mb-16 border-b border-slate-100">
                    <div className="flex items-center gap-1 -mb-px overflow-x-auto no-scrollbar">
                        {allCategories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setFilterCategory(category)}
                                className={`px-5 py-4 text-sm font-semibold whitespace-nowrap border-b-2 transition-all duration-300 ${
                                    filterCategory === category
                                        ? "border-indigo-600 text-indigo-600"
                                        : "border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-200"
                                }`}
                            >
                                {category}
                                <span className={`ml-2 text-xs px-1.5 py-0.5 rounded ${filterCategory === category ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-100 text-slate-500'}`}>
                                    {category === "All" ? allProducts.length : allProducts.filter(p => p.p_category === category).length}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* --- Studio Product Grid --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
                    {filterProducts.map((product) => (
                        <Link
                            to={`/product-detail/${product.id}`}
                            key={product.id}
                            className="group block"
                        >
                            {/* Image Container - Clean & Structured */}
                            <div className="aspect-[1/1] w-full overflow-hidden bg-slate-50 border border-slate-100 rounded-lg mb-5 transition-all duration-300 group-hover:border-slate-200">
                                <img
                                    src={product.p_image}
                                    alt={product.p_name}
                                    className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>

                            {/* Product Info - Simple Typography */}
                            <div className="space-y-2">
                                <div className="flex items-start justify-between gap-4">
                                    <h3 className="text-lg font-semibold text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors truncate">
                                        {product.p_name}
                                    </h3>
                                    <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded">
                                        {product.p_category}
                                    </span>
                                </div>
                                <p className="text-sm text-slate-600 line-clamp-2">
                                    {product.p_description}
                                </p>
                                <div className="flex items-center justify-between pt-2">
                                    <span className="text-xl font-bold text-slate-950">
                                        ₹{Number(product.p_price).toLocaleString('en-IN')}
                                    </span>
                                    <span className="text-xs font-semibold text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                        View Details →
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* --- Subtle Empty State --- */}
                {filterProducts.length === 0 && (
                    <div className="text-center py-24 bg-slate-50 rounded-lg border border-slate-100 mt-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white border border-slate-200 text-slate-400 mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">No Items found in {filterCategory}</h2>
                        <p className="text-slate-600 mt-2 font-medium">Please select another category or check back later.</p>
                    </div>
                )}
            </main>

            {/* --- Simple, Clean Footer --- */}
            <footer className="border-t border-slate-100 mt-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-6 py-12 text-center">
                    <p className="text-sm font-semibold text-slate-900tracking-tight">
                        VeloCity<span className="text-indigo-600">.</span> Inventory Ecosystem
                    </p>
                    <p className="text-xs text-slate-500 mt-2">© 2026 VeloCity Dynamics. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}