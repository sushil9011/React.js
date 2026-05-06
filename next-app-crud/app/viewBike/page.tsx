"use client";

import { useEffect, useState } from "react";
import { formBikeDataType } from "@/app/utils/type";
import { LayoutGrid, Trash2, Edit3, Bike, IndianRupee, Fuel, ShieldCheck, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function ViewBikes() {
    const router = useRouter();
    const [allBikes, setAllBikes] = useState<formBikeDataType[]>([]);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('bikes') || '[]');
        setAllBikes(data);
        setIsMounted(true);
    }, []);

    // Stats Calculation
    const totalValuation = allBikes.reduce((acc, bike) => acc + (Number(bike.bikePrice) || 0), 0);
    const uniqueBrands = new Set(allBikes.map(b => b.bikeBrand)).size;
    const uniqueFuels = new Set(allBikes.map(b => b.bikeFuel)).size;

    const deleteBike = (id: number) => {
        const updatedBikes = allBikes.filter(bike => bike.id !== id);
        localStorage.setItem('bikes', JSON.stringify(updatedBikes));
        setAllBikes(updatedBikes);
        toast.error("Machine removed from inventory!");
    };

    if (!isMounted) return null;

    return (
        <div className="min-h-screen bg-[#F8F9FA] pt-28 pb-20 px-6">
            <div className="max-w-7xl mx-auto">
                
                {/* 4 SECTIONS STATS HEADER */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {/* Section 1: Total Stock */}
                    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 group hover:border-black transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-gray-50 p-3 rounded-xl group-hover:bg-red-50 transition-colors">
                                <LayoutGrid className="w-6 h-6 text-black group-hover:text-red-600" />
                            </div>
                            <span className="text-[10px] font-black uppercase text-gray-300">Live</span>
                        </div>
                        <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Total Stock</p>
                        <p className="text-4xl font-black text-black mt-1 italic tracking-tighter">{allBikes.length}</p>
                    </div>

                    {/* Section 2: Manufacturers */}
                    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 group hover:border-black transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-gray-50 p-3 rounded-xl group-hover:bg-blue-50 transition-colors">
                                <ShieldCheck className="w-6 h-6 text-black group-hover:text-blue-600" />
                            </div>
                            <span className="text-[10px] font-black uppercase text-gray-300">Brands</span>
                        </div>
                        <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Brand Variety</p>
                        <p className="text-4xl font-black text-black mt-1 italic tracking-tighter">{uniqueBrands}</p>
                    </div>

                    {/* Section 3: Propulsion Types */}
                    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 group hover:border-black transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-gray-50 p-3 rounded-xl group-hover:bg-orange-50 transition-colors">
                                <Fuel className="w-6 h-6 text-black group-hover:text-orange-600" />
                            </div>
                            <span className="text-[10px] font-black uppercase text-gray-300">Energy</span>
                        </div>
                        <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Fuel Types</p>
                        <p className="text-4xl font-black text-black mt-1 italic tracking-tighter">{uniqueFuels}</p>
                    </div>

                    {/* Section 4: Valuation */}
                    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 group hover:border-black transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-gray-50 p-3 rounded-xl group-hover:bg-green-50 transition-colors">
                                <Zap className="w-6 h-6 text-black group-hover:text-green-600" />
                            </div>
                            <span className="text-[10px] font-black uppercase text-gray-300">Equity</span>
                        </div>
                        <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Total Value</p>
                        <div className="flex items-baseline gap-1 mt-1">
                            <span className="text-sm font-black text-black">₹</span>
                            <p className="text-2xl font-black text-black italic tracking-tighter truncate">
                                {(totalValuation / 100000).toFixed(1)}L
                            </p>
                        </div>
                    </div>
                </div>

                {/* Grid Layout (Bikes Cards) */}
                {allBikes.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {allBikes.map((bike) => (
                            <div key={bike.id} className="group bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden hover:shadow-2xl hover:shadow-black/5 transition-all duration-500 hover:-translate-y-2">
                                <div className="p-8">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="bg-gray-50 p-4 rounded-2xl group-hover:bg-red-50 transition-colors">
                                            <Bike className="w-8 h-8 text-black group-hover:text-red-600 transition-colors" />
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-tighter bg-black text-white px-3 py-1 rounded-full">
                                            {bike.bikeBrand}
                                        </span>
                                    </div>

                                    <h3 className="text-2xl font-black text-black uppercase italic tracking-tighter mb-1">
                                        {bike.bikeName}
                                    </h3>
                                    <p className="text-gray-400 text-xs font-bold uppercase mb-6">{bike.bikeModel} • {bike.bikeFuel}</p>

                                    <div className="space-y-4 border-t border-gray-50 pt-6">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] font-black uppercase text-gray-300">Inventory Price</span>
                                            <div className="flex items-center text-xl font-black text-black">
                                                <IndianRupee className="w-4 h-4" />
                                                {Number(bike.bikePrice).toLocaleString()}
                                            </div>
                                        </div>
                                        
                                        <div className="flex gap-2">
                                            {bike.bikeColor.map((color, idx) => (
                                                <span key={idx} className="w-3 h-3 rounded-full border border-gray-200" title={color} style={{ backgroundColor: color.toLowerCase() }}></span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex border-t border-gray-50">
                                    <button 
                                        onClick={() => router.push(`/editBike/${bike.id}`)}
                                        className="flex-1 flex items-center justify-center gap-2 py-5 font-black uppercase text-[10px] tracking-widest hover:bg-gray-50 transition-colors border-r border-gray-50"
                                    >
                                        <Edit3 className="w-4 h-4" /> Edit
                                    </button>
                                    <button 
                                        onClick={() => deleteBike(bike.id)}
                                        className="flex-1 flex items-center justify-center gap-2 py-5 font-black uppercase text-[10px] tracking-widest text-red-500 hover:bg-red-50 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" /> Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-40">
                        <div className="inline-block p-10 bg-white rounded-[3rem] shadow-sm border border-gray-100">
                            <Bike className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                            <p className="text-gray-400 font-black uppercase tracking-widest text-xs">No Machines in Stock</p>
                            <button 
                                onClick={() => router.push('/addBike')}
                                className="mt-6 text-red-600 font-black uppercase text-[10px] tracking-widest hover:underline"
                            >
                                + Add First Motorcycle
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}