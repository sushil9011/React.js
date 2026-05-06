import { useEffect, useState } from "react";
import { type productFetchType } from "../utils/global";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";
import { fetchSingleProduct, updateProduct } from "../Services/ProductService";

export default function EditProductPage() {
    const { productId } = useParams();
    const navigate = useNavigate();

    const [productData, setProductData] = useState<productFetchType>({
        id: "",
        p_name: "",
        p_price: 0,
        p_stock: 0,
        p_image: "",
        p_category: "",
        p_description: "",
    });

    const productCategory = ["Coffee", "Bakery", "Beverages", "Desserts", "Merchandise"];
    
    // Updated Classes for Cafe Theme
    const labelClasses = "block text-[10px] font-black uppercase tracking-[0.2em] text-[#a1887f] mb-2 ml-1";
    const inputClasses = "w-full rounded-[1.25rem] border-2 border-[#ede0d4] bg-white px-5 py-4 text-sm font-bold text-[#5d4037] transition-all focus:border-[#b08968] focus:outline-none focus:ring-4 focus:ring-[#b08968]/5 placeholder:text-[#a1887f]/50";

    useEffect(() => {
        if (productId) getSingleProductData();
    }, [productId]);

    async function getSingleProductData() {
        const data = await fetchSingleProduct(productId || "");
        if(data) setProductData(data);
    }

    const onHandleChange = (event: any) => {
        const { name, value } = event.target;
        setProductData(prev => ({ ...prev, [name]: (name === 'p_price' || name === 'p_stock') ? Number(value) : value }));
    }

    const onHandleSubmit = async (event: any) => {
        event.preventDefault();

        if (!productData.p_name || productData.p_price <= 0 || productData.p_stock <= 0 || !productData.p_category) {
            toast.warn("Please provide all necessary details!");
            return;
        }

        const status = await updateProduct(productData);
        if (status) {
            toast.success("Menu item updated successfully!");
            navigate('/view-product');
        } else {
            toast.error("Failed to update item.");
        }
    }

    return (
        <div className="min-h-screen bg-[#faf7f2] py-16 px-6">
            <div className="max-w-3xl mx-auto">
                {/* --- HEADER --- */}
                <div className="mb-12 text-center">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#b08968]">Kitchen Lab</span>
                    <h1 className="text-5xl font-black tracking-tighter text-[#5d4037] uppercase mt-2">Modify <span className="text-[#b08968]">Recipe</span></h1>
                    <div className="w-12 h-1 bg-[#ede0d4] mx-auto mt-6 rounded-full"></div>
                </div>

                {/* --- FORM CARD --- */}
                <div className="bg-white rounded-[3rem] border border-[#ede0d4] shadow-2xl shadow-[#5d4037]/5 p-8 md:p-12">
                    <form className="space-y-8" onSubmit={onHandleSubmit}>
                        
                        {/* ITEM NAME */}
                        <div className="group">
                            <label className={labelClasses}>Item Designation</label>
                            <input type="text" name="p_name" value={productData.p_name} onChange={onHandleChange} placeholder="e.g. Arabica Dark Roast" className={inputClasses} />
                        </div>

                        {/* PRICE & STOCK */}
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                            <div>
                                <label className={labelClasses}>Valuation (₹)</label>
                                <input type="number" name="p_price" value={productData.p_price} onChange={onHandleChange} className={inputClasses} />
                            </div>
                            <div>
                                <label className={labelClasses}>Available Quantity</label>
                                <input type="number" name="p_stock" value={productData.p_stock} onChange={onHandleChange} className={inputClasses} />
                            </div>
                        </div>

                        {/* IMAGE & CATEGORY */}
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                            <div>
                                <label className={labelClasses}>Visual Identity (URL)</label>
                                <input type="text" name="p_image" value={productData.p_image} onChange={onHandleChange} placeholder="https://image-link.com" className={inputClasses} />
                            </div>
                            <div className="relative">
                                <label className={labelClasses}>Menu Category</label>
                                <select name="p_category" value={productData.p_category} onChange={onHandleChange} className={`${inputClasses} appearance-none cursor-pointer`}>
                                    <option value="">Select a category</option>
                                    {productCategory.map((cat) => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute bottom-5 right-5 text-[#b08968]">
                                    <svg className="h-5 w-5 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                                </div>
                            </div>
                        </div>

                        {/* DESCRIPTION */}
                        <div>
                            <label className={labelClasses}>Flavor Notes / Description</label>
                            <textarea name="p_description" rows={4} value={productData.p_description} onChange={onHandleChange} placeholder="Describe the aroma and ingredients..." className={`${inputClasses} resize-none`}></textarea>
                        </div>

                        {/* ACTIONS */}
                        <div className="flex flex-col sm:flex-row items-center justify-end gap-6 pt-6 border-t border-[#faf7f2]">
                            <button 
                                type="button" 
                                onClick={() => navigate(-1)} 
                                className="text-xs font-black uppercase tracking-[0.2em] text-[#a1887f] hover:text-[#5d4037] transition-colors"
                            >
                                Discard Changes
                            </button>
                            <button 
                                type="submit" 
                                className="w-full sm:w-auto rounded-[1.5rem] bg-[#5d4037] px-12 py-5 text-xs font-black uppercase tracking-[0.2em] text-white shadow-xl shadow-[#5d4037]/20 transition-all hover:bg-[#4a3728] active:scale-95"
                            >
                                Update Recipe
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}