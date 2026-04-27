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

    const productCategory = ["Electronic", "Home & Living", "Sports", "Fashion"];
    const labelClasses = "block text-sm font-semibold text-slate-700 mb-1.5";
    const inputClasses = "w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 transition-all focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 placeholder:text-slate-400";

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
            toast.warn("All valid fields are required!");
            return;
        }

        const status = await updateProduct(productData);
        if (status) {
            toast.success("Product updated successfully!");
            navigate('/view-product');
        } else {
            toast.error("Failed to update product.");
        }
    }

    return (
        <div className="max-w-2xl mx-auto py-10 px-6">
            <div className="mb-8 border-b border-slate-100 pb-5">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Update Product</h1>
                <p className="mt-2 text-slate-500">Fill in the details below to update your inventory item.</p>
            </div>

            <form className="space-y-6" onSubmit={onHandleSubmit}>
                <div>
                    <label className={labelClasses}>Product Name</label>
                    <input type="text" name="p_name" value={productData.p_name} onChange={onHandleChange} className={inputClasses} />
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                        <label className={labelClasses}>Product Price (₹)</label>
                        <input type="number" name="p_price" value={productData.p_price} onChange={onHandleChange} className={inputClasses} />
                    </div>
                    <div>
                        <label className={labelClasses}>Product Stock</label>
                        <input type="number" name="p_stock" value={productData.p_stock} onChange={onHandleChange} className={inputClasses} />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                        <label className={labelClasses}>Product Image URL</label>
                        <input type="text" name="p_image" value={productData.p_image} onChange={onHandleChange} className={inputClasses} />
                    </div>
                    <div>
                        <label className={labelClasses}>Product Category</label>
                        <select name="p_category" value={productData.p_category} onChange={onHandleChange} className={inputClasses}>
                            <option value="">Select a category</option>
                            {productCategory.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <label className={labelClasses}>Product Description</label>
                    <textarea name="p_description" rows={4} value={productData.p_description} onChange={onHandleChange} className={`${inputClasses} resize-none`}></textarea>
                </div>

                <div className="flex items-center justify-end gap-4 pt-4">
                    <button type="button" onClick={() => navigate(-1)} className="px-6 py-2.5 text-sm font-semibold text-slate-600">Cancel</button>
                    <button type="submit" className="rounded-xl bg-indigo-600 px-8 py-2.5 text-sm font-bold text-white shadow-lg transition-all hover:bg-indigo-700 active:scale-95">
                        Update Product
                    </button>
                </div>
            </form>
        </div>
    );
}