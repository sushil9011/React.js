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
        <header className="sticky top-0 z-[100] bg-white/90 backdrop-blur-xl border-b border-[#ede0d4]/50">
            <nav className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="flex h-24 items-center justify-between">
                    
                    {/* --- CAFE LOGO --- */}
                    <div className="flex items-center gap-12">
                        <NavLink to="/" className="flex items-center gap-3 group">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#5d4037] shadow-lg shadow-[#5d4037]/20 transition-all duration-500 group-hover:rotate-12">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#ede0d4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-black tracking-tighter text-[#5d4037] uppercase leading-none">
                                    The Cozy <span className="text-[#b08968]">Bean</span>
                                </span>
                                <span className="text-[10px] font-bold text-[#a1887f] tracking-[0.2em] uppercase mt-1">Artisan Kitchen</span>
                            </div>
                        </NavLink>

                        {/* --- NAVIGATION --- */}
                        <ul className="hidden md:flex items-center bg-[#faf7f2] p-1.5 rounded-2xl border border-[#ede0d4]">
                            <li>
                                <NavLink to="/" className={({ isActive }) => `px-6 py-2.5 text-[13px] font-black uppercase tracking-wider transition-all rounded-xl ${isActive ? "bg-white text-[#5d4037] shadow-sm" : "text-[#a1887f] hover:text-[#5d4037]"}`}>
                                    Menu
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/view-product" className={({ isActive }) => `px-6 py-2.5 text-[13px] font-black uppercase tracking-wider transition-all rounded-xl ${isActive ? "bg-white text-[#5d4037] shadow-sm" : "text-[#a1887f] hover:text-[#5d4037]"}`}>
                                    Inventory
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    {/* --- ACTIONS --- */}
                    <div className="flex items-center gap-5">
                        {/* CART WITH LOGIC */}
                        <NavLink to="/cart" className="relative p-3.5 bg-[#faf7f2] border border-[#ede0d4] rounded-2xl hover:bg-[#f5ebe0] transition-all group">
                            <svg className="w-6 h-6 text-[#5d4037] group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-[#b08968] text-white text-[10px] font-black w-6 h-6 flex items-center justify-center rounded-full border-2 border-white shadow-md">
                                    {cartCount}
                                </span>
                            )}
                        </NavLink>

                        {/* NEW ENTRY BUTTON */}
                        <NavLink to="/add-product" className="hidden sm:flex items-center gap-2 rounded-2xl bg-[#5d4037] px-8 py-4 text-xs font-black uppercase tracking-widest text-white hover:bg-[#4a3728] transition-all shadow-xl shadow-[#5d4037]/10">
                            <span>New Entry</span>
                        </NavLink>
                    </div>
                </div>
            </nav>
        </header>
    );
}