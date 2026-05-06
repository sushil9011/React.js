import { useEffect, useState } from "react";
import type { productFetchType } from "../utils/global";
import { Link } from "react-router";

interface CartItem extends productFetchType {
    quantity: number;
}

export default function CartPage() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
        const itemsWithQty = savedCart.map((item: any) => ({
            ...item,
            quantity: item.quantity || 1
        }));
        setCartItems(itemsWithQty);
    }, []);

    const syncCart = (updatedCart: CartItem[]) => {
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        window.dispatchEvent(new Event("storage"));
    };

    const updateQuantity = (id: string, type: 'inc' | 'dec') => {
        const updatedCart = cartItems.map(item => {
            if (item.id === id) {
                const newQty = type === 'inc' ? item.quantity + 1 : item.quantity - 1;
                return { ...item, quantity: newQty < 1 ? 1 : newQty };
            }
            return item;
        });
        syncCart(updatedCart);
    };

    const removeFromCart = (id: string) => {
        const updatedCart = cartItems.filter(item => item.id !== id);
        syncCart(updatedCart);
    };

    const totalAmount = cartItems.reduce((acc, item) => acc + (item.p_price * item.quantity), 0);

    return (
        <div className="min-h-screen bg-[#faf7f2] p-6 lg:p-12 font-sans text-[#4a3728]">
            <div className="max-w-5xl mx-auto">
                
                {/* --- HEADER --- */}
                <div className="flex items-end justify-between mb-12 border-b-2 border-[#ede0d4] pb-6">
                    <div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#b08968] block mb-2">Your Selection</span>
                        <h1 className="text-4xl md:text-5xl font-black text-[#5d4037] tracking-tighter uppercase">Order Tray<span className="text-[#b08968]">.</span></h1>
                    </div>
                    <Link to="/" className="text-[10px] font-black text-[#a1887f] hover:text-[#5d4037] transition-all uppercase tracking-[0.2em] pb-1">
                        &larr; Back to Menu
                    </Link>
                </div>

                {cartItems.length === 0 ? (
                    <div className="bg-white rounded-[3rem] p-20 text-center border border-[#ede0d4] shadow-sm">
                        <div className="w-20 h-20 bg-[#faf7f2] rounded-full flex items-center justify-center mx-auto mb-6 text-[#ede0d4]">
                             <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                        </div>
                        <p className="text-[#a1887f] font-serif italic text-lg mb-8">Your tray is currently empty.</p>
                        <Link to="/" className="inline-block bg-[#5d4037] text-white px-10 py-4 rounded-full font-black text-xs uppercase tracking-widest transition-all hover:bg-[#4a3728] shadow-xl shadow-[#5d4037]/20">
                            Start Brewing
                        </Link>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-3 gap-12 items-start">
                        
                        {/* --- CART ITEMS LIST --- */}
                        <div className="lg:col-span-2 space-y-4">
                            {cartItems.map((item) => (
                                <div key={item.id} className="bg-white p-5 rounded-[2.5rem] flex items-center gap-6 border border-[#ede0d4] hover:shadow-xl hover:shadow-[#5d4037]/5 transition-all duration-500 group">
                                    {/* Product Image */}
                                    <div className="relative overflow-hidden rounded-[1.5rem] bg-[#faf7f2]">
                                        <img src={item.p_image} className="w-20 h-20 object-cover transition-transform duration-500 group-hover:scale-110" alt={item.p_name} />
                                    </div>
                                    
                                    {/* Info */}
                                    <div className="flex-1">
                                        <span className="text-[9px] font-black uppercase tracking-widest text-[#b08968] mb-1 block">{item.p_category}</span>
                                        <h3 className="font-black text-[#5d4037] text-lg tracking-tight uppercase leading-none mb-2">{item.p_name}</h3>
                                        <p className="text-[#b08968] font-bold">₹{item.p_price.toLocaleString()}</p>
                                    </div>

                                    {/* Custom Quantity Controls */}
                                    <div className="flex items-center bg-[#faf7f2] rounded-2xl border border-[#ede0d4] p-1">
                                        <button onClick={() => updateQuantity(item.id, 'dec')} className="w-8 h-8 flex items-center justify-center text-[#a1887f] hover:text-[#5d4037] transition-colors rounded-xl hover:bg-white">-</button>
                                        <span className="w-10 text-center font-black text-[#5d4037] text-xs">{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, 'inc')} className="w-8 h-8 flex items-center justify-center text-[#a1887f] hover:text-[#5d4037] transition-colors rounded-xl hover:bg-white">+</button>
                                    </div>

                                    {/* Remove Button */}
                                    <button onClick={() => removeFromCart(item.id)} className="p-3 text-[#ede0d4] hover:text-rose-400 transition-all">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* --- ORDER SUMMARY (RECEIPT STYLE) --- */}
                        <div className="bg-white p-8 rounded-[3rem] border border-[#ede0d4] shadow-sm lg:sticky lg:top-28 relative overflow-hidden">
                            {/* Decorative Top Edge */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-[#5d4037]"></div>
                            
                            <h2 className="text-xl font-black mb-8 text-[#5d4037] uppercase tracking-tighter flex items-center justify-between">
                                Summary
                                <span className="text-[10px] text-[#a1887f] font-medium italic lowercase">#{Math.floor(Math.random()*1000)}</span>
                            </h2>
                            
                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#a1887f] font-medium">Subtotal</span>
                                    <span className="font-bold">₹{totalAmount.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#a1887f] font-medium">Service Fee</span>
                                    <span className="font-bold">₹0.00</span>
                                </div>
                                <div className="h-[1px] w-full border-t border-dashed border-[#ede0d4] my-4"></div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-black uppercase tracking-widest text-[#5d4037]">Grand Total</span>
                                    <span className="text-3xl font-black text-[#5d4037] tracking-tighter">₹{totalAmount.toLocaleString()}</span>
                                </div>
                            </div>

                            <button className="w-full bg-[#5d4037] text-white py-5 rounded-[2rem] font-black text-[10px] tracking-[0.2em] uppercase hover:bg-[#4a3728] transition-all shadow-xl shadow-[#5d4037]/20 active:scale-95">
                                Place Order Now
                            </button>
                            
                            <p className="text-center mt-6 text-[10px] text-[#a1887f] font-serif italic">
                                Thank you for choosing The Cozy Bean.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}