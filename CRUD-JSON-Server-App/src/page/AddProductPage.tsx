import { useState } from "react";
import type { productType } from "../utils/global";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { addProduct } from "../Services/ProductService";

export default function AddProductPage() {
    const navigate = useNavigate();
    const [productData, setProductData] = useState<productType>({
        p_name: "", p_price: 0, p_stock: 0, p_image: "", p_category: "", p_description: "",
    });

    const onHandleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProductData(prev => ({ 
            ...prev, 
            [name]: (name === 'p_price' || name === 'p_stock') ? Number(value) : value 
        }));
    };

    const onHandleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!productData.p_name || productData.p_price <= 0 || productData.p_stock <= 0 || !productData.p_category) {
            toast.warn("Please fill all fields with valid data!");
            return;
        }

        try {
            const status = await addProduct(productData);
            if (status) {
                toast.success("Product added successfully!");
                navigate('/view-product');
            } else {
                toast.error("Server error: Could not add product.");
            }
        } catch (error) {
            toast.error("Something went wrong!");
        }
    };

    // Updated Cafe-Themed Styles
    const inputStyle = "w-full bg-[#faf7f2] border-2 border-[#ede0d4] rounded-[1.5rem] px-6 py-4 focus:border-[#b08968] focus:bg-white outline-none transition-all font-bold text-[#5d4037] placeholder:text-[#d6ccc2]";
    const labelStyle = "block text-[10px] font-black uppercase tracking-[0.2em] text-[#a1887f] mb-3 ml-2";

    return (
        <div className="min-h-screen bg-[#faf7f2] py-20 px-4">
            <div className="max-w-5xl mx-auto bg-white rounded-[3.5rem] shadow-2xl shadow-[#5d4037]/5 overflow-hidden flex flex-col md:flex-row border border-[#ede0d4]">
                
                {/* --- SIDEBAR PANEL --- */}
                <div className="md:w-1/3 bg-[#5d4037] p-12 text-white flex flex-col justify-between relative overflow-hidden">
                    <div className="relative z-10">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#b08968]">Inventory Portal</span>
                        <h2 className="text-4xl font-black leading-tight mt-4 uppercase tracking-tighter">Bean<br/>Registry.</h2>
                        <div className="h-1.5 w-12 bg-[#b08968] mt-6 rounded-full"></div>
                    </div>
                    
                    <div className="relative z-10">
                        <p className="text-[#d6ccc2] text-sm font-serif italic leading-relaxed">
                            "Great coffee is a journey from the bean to the cup."
                        </p>
                    </div>

                    {/* Decorative Background Element */}
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#b08968] rounded-full opacity-10 blur-3xl"></div>
                </div>

                {/* --- FORM SECTION --- */}
                <form className="md:w-2/3 p-8 md:p-16 space-y-8" onSubmit={onHandleSubmit}>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-black text-[#5d4037] uppercase tracking-tighter">New Item Details</h3>
                        <span className="h-2 w-2 rounded-full bg-[#b08968] animate-pulse"></span>
                    </div>
                    
                    <div className="space-y-6">
                        {/* Item Name */}
                        <div>
                            <label className={labelStyle}>Menu Item Name</label>
                            <input name="p_name" value={productData.p_name} onChange={onHandleChange} placeholder="e.g. Dark Roast Arabica" className={inputStyle} />
                        </div>

                        {/* Price & Stock */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className={labelStyle}>Price (₹)</label>
                                <input type="number" name="p_price" value={productData.p_price} onChange={onHandleChange} placeholder="0.00" className={inputStyle} />
                            </div>
                            <div>
                                <label className={labelStyle}>Batch Stock</label>
                                <input type="number" name="p_stock" value={productData.p_stock} onChange={onHandleChange} placeholder="0" className={inputStyle} />
                            </div>
                        </div>

                        {/* Image & Category */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className={labelStyle}>Display Image URL</label>
                                <input name="p_image" value={productData.p_image} onChange={onHandleChange} placeholder="https://images..." className={inputStyle} />
                            </div>
                            <div>
                                <label className={labelStyle}>Menu Category</label>
                                <select name="p_category" value={productData.p_category} onChange={onHandleChange} className={inputStyle}>
                                    <option value="">Select Category</option>
                                    <option value="Coffee">Coffee</option>
                                    <option value="Desserts">Desserts</option>
                                    <option value="Burgers">Burgers</option>
                                    <option value="Electronic">Electronic</option>
                                    <option value="Fashion">Fashion</option>
                                </select>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className={labelStyle}>Flavor Notes & Description</label>
                            <textarea name="p_description" value={productData.p_description} onChange={onHandleChange} rows={3} className={`${inputStyle} resize-none py-5`} placeholder="Describe the taste profile..."></textarea>
                        </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-6">
                        <button type="submit" className="w-full bg-[#5d4037] text-white py-6 rounded-[2rem] font-black text-xs tracking-[0.2em] uppercase hover:bg-[#4a3728] transition-all shadow-xl shadow-[#5d4037]/20 active:scale-95">
                            Register Item to Menu
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}