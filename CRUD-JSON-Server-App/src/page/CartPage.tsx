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
        <div className="min-h-screen bg-slate-50 p-6 lg:p-10 font-sans">
            <div className="max-w-5xl mx-auto">
                
                {/* Header - More compact */}
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                    <h1 className="text-3xl font-black text-slate-950 tracking-tighter">Your Bag<span className="text-indigo-600">.</span></h1>
                    <Link to="/" className="text-xs font-bold text-slate-500 hover:text-indigo-600 transition-all uppercase tracking-widest">&larr; Store</Link>
                </div>

                {cartItems.length === 0 ? (
                    <div className="bg-white rounded-3xl p-16 text-center border border-slate-100 shadow-sm">
                        <p className="text-slate-400 font-medium mb-5">Your cart is empty.</p>
                        <Link to="/" className="text-sm bg-slate-950 text-white px-6 py-3 rounded-xl font-black transition-all hover:bg-indigo-600">
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-3 gap-8">
                        
                        {/* Cart Items List - More Compact */}
                        <div className="lg:col-span-2 space-y-3">
                            {cartItems.map((item) => (
                                <div key={item.id} className="bg-white p-4 rounded-2xl flex items-center gap-4 border border-slate-100 group">
                                    {/* Choti Image */}
                                    <img src={item.p_image} className="w-16 h-16 object-cover rounded-xl" alt={item.p_name} />
                                    
                                    {/* Name & Price */}
                                    <div className="flex-1">
                                        <h3 className="font-bold text-slate-900 text-sm tracking-tight truncate">{item.p_name}</h3>
                                        <p className="text-indigo-600 font-bold text-sm">₹{item.p_price.toLocaleString()}</p>
                                    </div>

                                    {/* Compact Quantity Controls */}
                                    <div className="flex items-center bg-slate-100 rounded-lg border border-slate-200/50">
                                        <button onClick={() => updateQuantity(item.id, 'dec')} className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-950 font-bold">-</button>
                                        <span className="w-8 text-center font-black text-slate-950 text-xs">{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, 'inc')} className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-indigo-600 font-bold">+</button>
                                    </div>

                                    {/* Compact Delete Button */}
                                    <button onClick={() => removeFromCart(item.id)} className="p-2 text-slate-300 hover:text-rose-500 transition-all">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary - Clean & Slim */}
                        <div className="bg-white p-6 rounded-3xl border border-slate-100 h-fit lg:sticky lg:top-28">
                            <h2 className="text-lg font-black mb-5 text-slate-950 tracking-tight">Summary</h2>
                            
                            <div className="flex justify-between items-center mb-6 pt-5 border-t border-slate-100">
                                <span className="text-sm font-bold text-slate-500">Order Total</span>
                                <span className="text-2xl font-black text-slate-950 tracking-tighter">₹{totalAmount.toLocaleString()}</span>
                            </div>

                            <button className="w-full bg-slate-950 text-white py-4 rounded-xl font-black text-xs tracking-[0.15em] uppercase hover:bg-indigo-600 transition-all">
                                Checkout Now
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}