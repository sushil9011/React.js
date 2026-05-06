import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router"; //[cite: 20]
import { fetchSingleProduct } from "../Services/ProductService";
import type { productFetchType } from "../utils/global";

export default function ProductDetailPage() {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [productData, setProductData] = useState<productFetchType | null>(null);

    useEffect(() => {
        if (productId) getSingleProduct();
    }, [productId]);

    const getSingleProduct = async () => {
        const data = await fetchSingleProduct(productId || "");
        setProductData(data);
    };

    const handleAddToCart = () => {
        if (productData) {
            const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
            const isExist = currentCart.find((item: any) => item.id === productData.id);
            if (!isExist) {
                const updatedCart = [...currentCart, productData];
                localStorage.setItem("cart", JSON.stringify(updatedCart));
            }
            window.dispatchEvent(new Event("storage")); 
            navigate("/cart"); 
        }
    };

    if (!productData) return (
        <div className="min-h-screen flex items-center justify-center bg-[#faf7f2]">
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-[#ede0d4] border-t-[#5d4037] rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-[10px] font-black text-[#a1887f] uppercase tracking-[0.3em]">Brewing Details...</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#faf7f2]">
            <div className="max-w-7xl mx-auto px-6 py-12 lg:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    
                    {/* --- IMAGE --- */}
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-[#ede0d4]/50 rounded-[3.5rem] blur-2xl group-hover:bg-[#b08968]/20 transition-all duration-700"></div>
                        <img 
                            src={productData.p_image} 
                            className="relative w-full aspect-square object-cover rounded-[3rem] shadow-2xl transition-all duration-700 group-hover:scale-[1.02]" 
                            alt={productData.p_name} 
                        />
                    </div>

                    {/* --- CONTENT --- */}
                    <div className="lg:pl-10">
                        <nav className="mb-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#b08968]">
                            <span>Menu</span>
                            <span className="text-[#ede0d4]">/</span>
                            <span>{productData.p_category}</span>
                        </nav>

                        <h1 className="text-5xl lg:text-7xl font-black tracking-tighter text-[#5d4037] uppercase mb-6 leading-none">
                            {productData.p_name}
                        </h1>

                        <div className="flex items-center gap-6 mb-10">
                            <p className="text-4xl font-black text-[#b08968]">₹{productData.p_price.toLocaleString()}</p>
                            <div className="h-8 w-[2px] bg-[#ede0d4]"></div>
                            <span className="px-4 py-1.5 rounded-full bg-white border border-[#ede0d4] text-[10px] font-black uppercase text-[#a1887f]">
                                {productData.p_stock > 0 ? 'Freshly Available' : 'Out of Stock'}
                            </span>
                        </div>

                        <div className="space-y-6 mb-12">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#a1887f]">Flavour Profile & Notes</p>
                            <p className="text-xl text-[#5d4037]/80 font-serif leading-relaxed italic">
                                "{productData.p_description}"
                            </p>
                        </div>

                        {/* --- ACTIONS --- */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button 
                                onClick={handleAddToCart} 
                                className="flex-1 bg-[#5d4037] text-white py-6 rounded-[2rem] font-black text-xs tracking-[0.2em] uppercase hover:bg-[#4a3728] transition-all shadow-xl shadow-[#5d4037]/20 active:scale-95"
                            >
                                Add to Order
                            </button>
                            <button 
                                onClick={() => navigate(`/edit-product/${productData.id}`)}
                                className="px-10 py-6 rounded-[2rem] border-2 border-[#ede0d4] text-[#5d4037] font-black text-xs tracking-[0.2em] uppercase hover:bg-white transition-all shadow-sm"
                            >
                                Edit Item
                            </button>
                        </div>
                        
                        <button 
                            onClick={() => navigate('/')}
                            className="mt-8 text-[10px] font-black uppercase tracking-widest text-[#a1887f] hover:text-[#5d4037] transition-all"
                        >
                            ← Back to Menu
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}