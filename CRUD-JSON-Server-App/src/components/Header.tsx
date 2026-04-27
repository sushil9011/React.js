import { useEffect, useState } from "react";
import { NavLink } from "react-router";

export default function Header() {
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const updateCount = () => {
            const cart = JSON.parse(localStorage.getItem("cart") || "[]");
            setCartCount(cart.length);
        };
        updateCount();
        window.addEventListener("storage", updateCount);
        return () => window.removeEventListener("storage", updateCount);
    }, []);

    return (
        <header className="sticky top-0 z-[100] bg-white/80 backdrop-blur-md border-b border-slate-100">
            <nav className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">
                    <div className="flex items-center gap-12">
                        <NavLink to="/" className="flex items-center gap-3 group">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 transition-transform duration-500 group-hover:rotate-[360deg]">
                                <span className="text-white font-black text-xl italic">V</span>
                            </div>
                            <span className="text-2xl font-black tracking-tighter text-slate-950">VeloCity<span className="text-indigo-600">.</span></span>
                        </NavLink>
                        <ul className="hidden md:flex items-center gap-2">
                            <li><NavLink to="/" className={({ isActive }) => `px-5 py-2 text-sm font-bold rounded-full ${isActive ? "text-slate-950 bg-slate-100" : "text-slate-500 hover:text-slate-950"}`}>Showcase</NavLink></li>
                            <li><NavLink to="/view-product" className={({ isActive }) => `px-5 py-2 text-sm font-bold rounded-full ${isActive ? "text-slate-950 bg-slate-100" : "text-slate-500 hover:text-slate-950"}`}>Inventory</NavLink></li>
                        </ul>
                    </div>

                    <div className="flex items-center gap-4">
                        <NavLink to="/cart" className="relative p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all">
                            <svg className="w-6 h-6 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                                    {cartCount}
                                </span>
                            )}
                        </NavLink>
                        <NavLink to="/add-product" className="hidden sm:flex items-center gap-2 rounded-2xl bg-indigo-600 px-6 py-3 text-sm font-black text-white hover:bg-indigo-700 transition-all">
                            <span>New Asset</span>
                        </NavLink>
                    </div>
                </div>
            </nav>
        </header>
    );
}