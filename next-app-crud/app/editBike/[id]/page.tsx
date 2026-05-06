"use client";

import { bikeColor, bikeBrand, bikeFuel, formBikeDataType } from "@/app/utils/type";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { toast } from "react-toastify";
import { Bike, IndianRupee, Save, ChevronLeft } from "lucide-react";

interface FormErrors {
    bikeName?: string;
    bikeModel?: string;
    bikePrice?: string;
    bikeBrand?: string;
    bikeColor?: string;
    bikeFuel?: string;
}

export default function EditBikePage() {
    const { id } = useParams();
    const router = useRouter();

    const [formBikeData, setFormBikeData] = useState<formBikeDataType>({
        id: 0,
        bikeName: "",
        bikeModel: "",
        bikePrice: 0,
        bikeBrand: "",
        bikeColor: [],
        bikeFuel: ""
    });

    const [errorForm, setErrorForm] = useState<FormErrors>({});
    const [isMounted, setIsMounted] = useState(false);

    // Hydration Fix & Initial Data Loading
    useEffect(() => {
        setIsMounted(true);
        if (!id) return;

        const allBikes: formBikeDataType[] = JSON.parse(localStorage.getItem('bikes') || '[]');
        const bikeData = allBikes.find((bike) => bike.id === Number(id));

        if (bikeData) {
            // Cascading Render Fix: Comparison check
            setFormBikeData(prev => {
                if (prev.id !== bikeData.id) return bikeData;
                return prev;
            });
        }
    }, [id]);

    const onHandleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormBikeData(prev => ({ 
            ...prev, 
            [name]: (name === 'bikePrice') ? Number(value) : value 
        }));
    };

    const onColorChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
        setFormBikeData(prev => ({ 
            ...prev, 
            bikeColor: checked 
                ? [...prev.bikeColor, value] 
                : prev.bikeColor.filter((color) => color !== value) 
        }));
    };

    const validation = (): boolean => {
        const errors: FormErrors = {};
        if (!formBikeData.bikeName.trim()) errors.bikeName = "Bike name is required...";
        if (!formBikeData.bikeModel.trim()) errors.bikeModel = "Model is required...";
        if (!formBikeData.bikePrice || formBikeData.bikePrice <= 0) errors.bikePrice = "Invalid price...";
        if (!formBikeData.bikeBrand.trim()) errors.bikeBrand = "Brand is required...";
        if (formBikeData.bikeColor.length === 0) errors.bikeColor = "Select at least one color...";
        if (!formBikeData.bikeFuel.trim()) errors.bikeFuel = "Fuel type is required...";

        setErrorForm(errors);
        return Object.keys(errors).length === 0;
    };

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (!validation()) return;

        const allBikes: formBikeDataType[] = JSON.parse(localStorage.getItem('bikes') || '[]');
        const updatedBikes = allBikes.map((bike) => (bike.id === Number(id) ? formBikeData : bike));

        localStorage.setItem('bikes', JSON.stringify(updatedBikes));
        toast.success("Machine specifications updated!");
        router.push('/viewBike');
    };

    if (!isMounted) return null;

    return (
        <div className="min-h-screen bg-[#FAFAFA] pt-32 pb-20 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Back Button */}
                <button 
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors mb-8"
                >
                    <ChevronLeft className="w-4 h-4" /> Return to Garage
                </button>

                {/* Header Section */}
                <div className="mb-12">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-red-600 mb-2">Configuration</p>
                    <h1 className="text-5xl font-black text-black tracking-tighter uppercase italic">
                        Edit <span className="text-gray-300">Machine.</span>
                    </h1>
                </div>

                {/* Main Form Card */}
                <form onSubmit={onSubmit} className="bg-white border border-gray-100 rounded-[2.5rem] shadow-2xl shadow-black/5 p-10 md:p-16 space-y-10">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Bike Name */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Bike Designation</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="bikeName"
                                    value={formBikeData.bikeName}
                                    onChange={onHandleChange}
                                    placeholder="e.g. Hayabusa"
                                    className={`w-full px-6 py-4 bg-gray-50 border ${errorForm.bikeName ? 'border-red-500' : 'border-transparent'} rounded-2xl focus:bg-white focus:border-black outline-none transition-all font-bold text-black`}
                                />
                                <Bike className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-200" />
                            </div>
                            {errorForm.bikeName && <p className="text-red-500 text-[10px] font-bold uppercase ml-1">{errorForm.bikeName}</p>}
                        </div>

                        {/* Bike Model */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Model / Year</label>
                            <input
                                type="text"
                                name="bikeModel"
                                value={formBikeData.bikeModel}
                                onChange={onHandleChange}
                                placeholder="e.g. 2024 Gen-3"
                                className={`w-full px-6 py-4 bg-gray-50 border ${errorForm.bikeModel ? 'border-red-500' : 'border-transparent'} rounded-2xl focus:bg-white focus:border-black outline-none transition-all font-bold text-black`}
                            />
                            {errorForm.bikeModel && <p className="text-red-500 text-[10px] font-bold uppercase ml-1">{errorForm.bikeModel}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Price */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Price (INR)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    name="bikePrice"
                                    value={formBikeData.bikePrice || ''}
                                    onChange={onHandleChange}
                                    className={`w-full px-6 py-4 bg-gray-50 border ${errorForm.bikePrice ? 'border-red-500' : 'border-transparent'} rounded-2xl focus:bg-white focus:border-black outline-none transition-all font-bold text-black`}
                                />
                                <IndianRupee className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-200" />
                            </div>
                            {errorForm.bikePrice && <p className="text-red-500 text-[10px] font-bold uppercase ml-1">{errorForm.bikePrice}</p>}
                        </div>

                        {/* Brand Select */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Manufacturer</label>
                            <select
                                name="bikeBrand"
                                value={formBikeData.bikeBrand}
                                onChange={onHandleChange}
                                className={`w-full px-6 py-4 bg-gray-50 border ${errorForm.bikeBrand ? 'border-red-500' : 'border-transparent'} rounded-2xl focus:bg-white focus:border-black outline-none transition-all font-bold text-black appearance-none`}
                            >
                                <option value="">Select Brand</option>
                                {bikeBrand.map((brand, index) => <option key={index} value={brand}>{brand}</option>)}
                            </select>
                            {errorForm.bikeBrand && <p className="text-red-500 text-[10px] font-bold uppercase ml-1">{errorForm.bikeBrand}</p>}
                        </div>
                    </div>

                    {/* Colors - Modern Chips */}
                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Available Finishes</label>
                        <div className="flex flex-wrap gap-3">
                            {bikeColor.map((color, index) => (
                                <label key={index} className={`relative px-6 py-3 rounded-xl border cursor-pointer transition-all ${formBikeData.bikeColor.includes(color) ? 'bg-black border-black text-white' : 'bg-white border-gray-100 text-gray-600 hover:border-black'}`}>
                                    <input
                                        type="checkbox"
                                        value={color}
                                        checked={formBikeData.bikeColor.includes(color)}
                                        onChange={onColorChange}
                                        className="absolute opacity-0"
                                    />
                                    <span className="text-xs font-black uppercase tracking-tighter">{color}</span>
                                </label>
                            ))}
                        </div>
                        {errorForm.bikeColor && <p className="text-red-500 text-[10px] font-bold uppercase ml-1">{errorForm.bikeColor}</p>}
                    </div>

                    {/* Fuel Type */}
                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Propulsion System</label>
                        <div className="flex flex-wrap gap-6">
                            {bikeFuel.map((fuel, index) => (
                                <label key={index} className="flex items-center group cursor-pointer">
                                    <input
                                        type="radio"
                                        name="bikeFuel"
                                        value={fuel}
                                        checked={formBikeData.bikeFuel === fuel}
                                        onChange={onHandleChange}
                                        className="w-5 h-5 accent-red-600 border-gray-300 mr-3"
                                    />
                                    <span className={`text-sm font-black uppercase ${formBikeData.bikeFuel === fuel ? 'text-black' : 'text-gray-300 group-hover:text-gray-500 transition-colors'}`}>{fuel}</span>
                                </label>
                            ))}
                        </div>
                        {errorForm.bikeFuel && <p className="text-red-500 text-[10px] font-bold uppercase ml-1">{errorForm.bikeFuel}</p>}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-10">
                        <button
                            type="submit"
                            className="w-full bg-black text-white py-6 rounded-2xl font-black uppercase tracking-[0.3em] hover:bg-red-600 transition-all duration-500 shadow-xl shadow-black/10 active:scale-95 flex items-center justify-center gap-3"
                        >
                            <Save className="w-5 h-5" /> Update Specifications
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}