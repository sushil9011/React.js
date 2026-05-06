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
        if (window.confirm("Are you sure you want to delete this menu item?")) {
            const status = await deleteProduct(id);
            if (status) {
                toast.error("Item removed from menu!");
                getAllProducts(); 
            } else {
                toast.warning("Could not remove item.");
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#faf7f2] p-6 lg:p-10 font-sans">
            <div className="max-w-7xl mx-auto">
                {/* --- HEADER SECTION --- */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <h1 className="text-6xl font-black text-[#5d4037] tracking-tighter uppercase leading-none">
                            Inventory<span className="text-[#b08968]">.</span>
                        </h1>
                        <p className="text-[#a1887f] mt-3 font-serif italic text-lg">Manage your artisan cafe offerings</p>
                    </div>
                    <button 
                        onClick={() => navigate('/add-product')}
                        className="bg-[#5d4037] hover:bg-[#4a3728] text-white px-10 py-5 rounded-[2rem] font-black uppercase tracking-widest shadow-2xl shadow-[#5d4037]/20 transition-all active:scale-95 flex items-center gap-3 text-xs"
                    >
                        <span className="text-xl">+</span> Add New Item
                    </button>
                </div>

                {/* --- STATS CARDS --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-8 rounded-[2.5rem] border border-[#ede0d4] shadow-sm">
                        <p className="text-[10px] font-black text-[#a1887f] uppercase tracking-[0.2em]">Live Menu items</p>
                        <h3 className="text-4xl font-black text-[#5d4037] mt-2">{totalItems} Dishes</h3>
                    </div>
                    <div className="bg-white p-8 rounded-[2.5rem] border border-[#ede0d4] shadow-sm">
                        <p className="text-[10px] font-black text-[#a1887f] uppercase tracking-[0.2em]">Kitchen Capacity</p>
                        <h3 className="text-4xl font-black text-[#b08968] mt-2">Optimal</h3>
                    </div>
                    <div className="bg-[#b08968] p-8 rounded-[2.5rem] shadow-xl shadow-[#b08968]/20 text-white">
                        <p className="text-[10px] font-black text-[#fdfbf7]/80 uppercase tracking-[0.2em]">Store Status</p>
                        <h3 className="text-4xl font-black mt-2">Open Now</h3>
                    </div>
                </div>

                {/* --- TABLE CONTAINER --- */}
                <div className="bg-white rounded-[3rem] border border-[#ede0d4] shadow-2xl shadow-[#5d4037]/5 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#faf7f2]/50 border-b border-[#ede0d4]">
                                    <th className="px-10 py-8 text-[11px] font-black uppercase tracking-[0.3em] text-[#a1887f]">ID</th>
                                    <th className="px-10 py-8 text-[11px] font-black uppercase tracking-[0.3em] text-[#a1887f]">Menu Item</th>
                                    <th className="px-10 py-8 text-[11px] font-black uppercase tracking-[0.3em] text-[#a1887f]">Category</th>
                                    <th className="px-10 py-8 text-[11px] font-black uppercase tracking-[0.3em] text-[#a1887f]">Price</th>
                                    <th className="px-10 py-8 text-[11px] font-black uppercase tracking-[0.3em] text-[#a1887f] text-center">Manage</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#faf7f2]">
                                {currentProducts.map((product, index) => (
                                    <tr key={product.id} className="hover:bg-[#faf7f2]/40 transition-colors group">
                                        <td className="px-10 py-8 font-mono text-[10px] text-[#a1887f]">#{startIndex + index + 1}</td>
                                        <td className="px-10 py-8">
                                            <div className="flex items-center gap-5">
                                                <div className="relative">
                                                    <img src={product.p_image} className="w-16 h-16 rounded-[1.25rem] object-cover border-2 border-white shadow-md group-hover:rotate-3 transition-transform" />
                                                    <div className="absolute inset-0 rounded-[1.25rem] ring-1 ring-inset ring-black/5"></div>
                                                </div>
                                                <span className="font-black text-[#5d4037] text-xl tracking-tight leading-none">{product.p_name}</span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8">
                                            <span className="px-5 py-2 rounded-full bg-[#f5ebe0] text-[#b08968] text-[10px] font-black uppercase tracking-widest border border-[#ede0d4]">
                                                {product.p_category}
                                            </span>
                                        </td>
                                        <td className="px-10 py-8 font-black text-[#5d4037] text-2xl">₹{product.p_price}</td>
                                        <td className="px-10 py-8">
                                            <div className="flex justify-center gap-4">
                                                <button 
                                                    onClick={() => navigate(`/edit-product/${product.id}`)} 
                                                    className="px-6 py-3 bg-[#faf7f2] text-[#5d4037] rounded-2xl text-[10px] font-black uppercase tracking-widest border border-[#ede0d4] hover:bg-[#5d4037] hover:text-white transition-all shadow-sm"
                                                >
                                                    Modify
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(product.id)} 
                                                    className="px-6 py-3 bg-white text-[#e63946] rounded-2xl text-[10px] font-black uppercase tracking-widest border border-[#ffccd5] hover:bg-[#e63946] hover:text-white transition-all shadow-sm"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* --- PAGINATION & FOOTER --- */}
                    <div className="p-10 bg-[#faf7f2]/30 flex flex-col sm:row justify-between items-center border-t border-[#ede0d4] gap-6">
                        <div className="relative">
                            <select 
                                className="appearance-none bg-white border-2 border-[#ede0d4] rounded-2xl px-8 py-3 font-black text-[10px] uppercase tracking-widest text-[#5d4037] outline-none cursor-pointer focus:border-[#b08968] transition-all"
                                onChange={(e) => setItemPerPage(Number(e.target.value))}
                            >
                                <option value={10}>10 per page</option>
                                <option value={20}>20 per page</option>
                                <option value={50}>50 per page</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[#5d4037]">
                                <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                            </div>
                        </div>
                        
                        <div className="flex gap-3">
                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`w-14 h-14 rounded-2xl font-black transition-all text-xs border ${currentPage === i + 1 ? 'bg-[#5d4037] text-white border-[#5d4037] shadow-xl shadow-[#5d4037]/20 scale-110' : 'bg-white text-[#a1887f] border-[#ede0d4] hover:border-[#b08968]'}`}
                                >
                                    {String(i + 1).padStart(2, '0')}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}