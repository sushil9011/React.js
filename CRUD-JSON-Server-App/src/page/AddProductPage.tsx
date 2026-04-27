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

        // Validation Check
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

    const inputStyle = "w-full bg-slate-50 border-2 border-slate-100 rounded-[1.25rem] px-6 py-4 focus:border-indigo-500 focus:bg-white outline-none transition-all font-semibold text-slate-800 placeholder:text-slate-300";
    const labelStyle = "block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 ml-2";

    return (
        <div className="min-h-screen bg-[#F8FAFC] py-20 px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-[3rem] shadow-2xl shadow-slate-200 overflow-hidden flex flex-col md:flex-row">
                <div className="md:w-1/3 bg-slate-900 p-12 text-white flex flex-col justify-between">
                    <div>
                        <h2 className="text-3xl font-black leading-tight">VeloCity<br/>Registry.</h2>
                        <div className="h-1 w-12 bg-indigo-500 mt-6 rounded-full"></div>
                    </div>
                    <p className="text-slate-500 text-sm font-medium italic">"Efficiency is doing things right."</p>
                </div>

                <form className="md:w-2/3 p-12 space-y-8" onSubmit={onHandleSubmit}>
                    <h3 className="text-2xl font-black text-slate-800 mb-8">Asset Details</h3>
                    
                    <div className="space-y-6">
                        <div>
                            <label className={labelStyle}>Product Identity</label>
                            <input name="p_name" value={productData.p_name} onChange={onHandleChange} placeholder="Enter name..." className={inputStyle} />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className={labelStyle}>Valuation (₹)</label>
                                <input type="number" name="p_price" value={productData.p_price} onChange={onHandleChange} placeholder="0.00" className={inputStyle} />
                            </div>
                            <div>
                                <label className={labelStyle}>Inventory Count</label>
                                <input type="number" name="p_stock" value={productData.p_stock} onChange={onHandleChange} placeholder="0" className={inputStyle} />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className={labelStyle}>Media URL</label>
                                <input name="p_image" value={productData.p_image} onChange={onHandleChange} placeholder="https://..." className={inputStyle} />
                            </div>
                            <div>
                                <label className={labelStyle}>Classification</label>
                                <select name="p_category" value={productData.p_category} onChange={onHandleChange} className={inputStyle}>
                                    <option value="">Select Category</option>
                                    <option value="Electronic">Electronic</option>
                                    <option value="Fashion">Fashion</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className={labelStyle}>Brief Description</label>
                            <textarea name="p_description" value={productData.p_description} onChange={onHandleChange} rows={3} className={`${inputStyle} resize-none`} placeholder="Describe details..."></textarea>
                        </div>
                    </div>

                    <div className="flex justify-end pt-6">
                        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-5 rounded-[1.5rem] font-black text-lg shadow-xl shadow-indigo-100 transition-all active:scale-95">
                            Deploy Item
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}