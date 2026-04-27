import { useEffect, useState } from "react";
import type { productFetchType } from "../utils/global";
import { deleteProduct, fetchAllProducts } from "../Services/ProductService";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function ViewProductPage() {
    const [allProducts, setAllProduct] = useState<productFetchType[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemPerPage, setItemPerPage] = useState(10);
    const navigate = useNavigate();

    const totalItems = allProducts.length;
    const totalPages = Math.ceil(totalItems / itemPerPage);
    const startIndex = (currentPage - 1) * itemPerPage;
    const currentProducts = allProducts.slice(startIndex, startIndex + itemPerPage);

    useEffect(() => { getAllProducts(); }, []);

    const getAllProducts = async () => {
        const allProductData = await fetchAllProducts();
        setAllProduct(allProductData);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            const status = await deleteProduct(id);
            if (status) {
                toast.error("Product deleted successfully!");
                getAllProducts(); // List refresh karne ke liye
            } else {
                toast.warning("Could not delete product.");
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#F1F5F9] p-6 lg:p-10 font-sans">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
                    <div>
                        <h1 className="text-5xl font-black text-slate-900 tracking-tighter">
                            VeloCity<span className="text-indigo-600">.</span>
                        </h1>
                        <p className="text-slate-500 mt-2 font-medium">Enterprise Resource Control Center</p>
                    </div>
                    <button 
                        onClick={() => navigate('/add-product')}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-bold shadow-2xl shadow-indigo-200 transition-all active:scale-95 flex items-center gap-2"
                    >
                        <span>+</span> New Asset
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Stock</p>
                        <h3 className="text-3xl font-black text-slate-800 mt-1">{totalItems} Items</h3>
                    </div>
                    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Inventory Value</p>
                        <h3 className="text-3xl font-black text-emerald-600 mt-1">₹ High</h3>
                    </div>
                    <div className="bg-indigo-600 p-6 rounded-[2rem] shadow-xl shadow-indigo-100 text-white">
                        <p className="text-xs font-bold text-indigo-200 uppercase tracking-widest">System Status</p>
                        <h3 className="text-3xl font-black mt-1">Operational</h3>
                    </div>
                </div>

                <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/50 border-b border-slate-100">
                            <tr>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Identity</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Product</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Category</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Price</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {currentProducts.map((product, index) => (
                                <tr key={product.id} className="hover:bg-indigo-50/30 transition-colors group">
                                    <td className="px-8 py-6 font-mono text-xs text-slate-400">#{startIndex + index + 1}</td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <img src={product.p_image} className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-md" />
                                            <span className="font-bold text-slate-800 text-lg">{product.p_name}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-widest">
                                            {product.p_category}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 font-black text-slate-900 text-xl">₹{product.p_price}</td>
                                    <td className="px-8 py-6">
                                        <div className="flex justify-center gap-3">
                                            <button onClick={() => navigate(`/edit-product/${product.id}`)} className="p-3 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition-all">Edit</button>
                                            <button onClick={() => handleDelete(product.id)} className="p-3 bg-rose-50 text-rose-500 rounded-xl hover:bg-rose-100 transition-all">Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="p-8 bg-slate-50/50 flex justify-between items-center border-t border-slate-100">
                        <select 
                            className="bg-white border-2 border-slate-200 rounded-xl px-4 py-2 font-bold text-slate-600 outline-none"
                            onChange={(e) => setItemPerPage(Number(e.target.value))}
                        >
                            <option value={10}>10 Items</option>
                            <option value={20}>20 Items</option>
                            <option value={50}>50 Items</option>
                        </select>
                        <div className="flex gap-2">
                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`w-12 h-12 rounded-xl font-black transition-all ${currentPage === i + 1 ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-slate-400 border border-slate-200'}`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}