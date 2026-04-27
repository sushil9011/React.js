import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
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
            window.dispatchEvent(new Event("storage")); // Header update ke liye
            navigate("/cart"); // Direct cart page par
        }
    };

    if (!productData) return <div className="p-20 text-center font-bold text-slate-400 uppercase tracking-widest animate-pulse">Loading Asset...</div>;

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-6 py-12 lg:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    <img src={productData.p_image} className="w-full aspect-[4/5] object-cover rounded-[2.5rem] shadow-2xl grayscale hover:grayscale-0 transition-all duration-700" alt="" />
                    <div className="lg:sticky lg:top-32">
                        <span className="text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] mb-6 block">{productData.p_category}</span>
                        <h1 className="text-5xl lg:text-7xl font-black tracking-tighter text-slate-950 mb-4">{productData.p_name}</h1>
                        <p className="text-3xl font-bold text-slate-900 mb-8">₹{productData.p_price.toLocaleString()}</p>
                        <p className="text-lg text-slate-500 leading-relaxed mb-10">{productData.p_description}</p>
                        <button onClick={handleAddToCart} className="w-full bg-slate-950 text-white py-5 rounded-2xl font-black text-sm tracking-widest uppercase hover:bg-indigo-600 transition-all">
                            Acquire Asset
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}