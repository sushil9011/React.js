"use client";

import { useState, useEffect } from "react";
import { Bike, IndianRupee, Plus, ChevronLeft, Gauge, Type } from "lucide-react";
import { formBikeDataType, bikeBrand, bikeColor, bikeFuel } from "../utils/type"; 
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function AddBike() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  // Lazy Initializer for State
  const [formBikeData, setFormBikeData] = useState<formBikeDataType>(() => ({
    id: Math.floor(Math.random() * 10000),
    bikeName: "",
    bikeModel: "",
    bikePrice: 0,
    bikeBrand: "",
    bikeColor: [] as string[],
    bikeFuel: "",
    bikeCC: "",          
    bikeDescription: ""   
  }));

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormBikeData(prev => ({ 
      ...prev, 
      [name]: name === "bikePrice" ? Number(value) : value 
    }));
  };

  const handleColorChange = (color: string) => {
    setFormBikeData(prev => ({
      ...prev,
      bikeColor: prev.bikeColor.includes(color)
        ? prev.bikeColor.filter(c => c !== color)
        : [...prev.bikeColor, color]
    }));
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    // Validation
    if (!formBikeData.bikeBrand || formBikeData.bikeColor.length === 0 || !formBikeData.bikeFuel) {
      toast.error("Please fill all professional specifications!");
      return;
    }

    const existingBikes = JSON.parse(localStorage.getItem('bikes') || '[]');
    const updatedBikes = [...existingBikes, formBikeData];
    localStorage.setItem('bikes', JSON.stringify(updatedBikes));
    
    toast.success("Machine added to showroom!");
    router.push('/viewBike');
  };

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Navigation */}
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors mb-8"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Dashboard
        </button>

        {/* Header */}
        <div className="mb-12">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-red-600 mb-2">New Entry</p>
          <h1 className="text-5xl font-black text-black tracking-tighter uppercase italic">
            Add <span className="text-gray-300">Machine.</span>
          </h1>
        </div>

        <form onSubmit={onSubmit} className="bg-white border border-gray-100 rounded-[2.5rem] shadow-2xl shadow-black/5 p-10 md:p-16 space-y-10">
          
          {/* Identity Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Bike Name</label>
              <div className="relative">
                <input
                  type="text"
                  name="bikeName"
                  placeholder="e.g. Ninja H2"
                  value={formBikeData.bikeName}
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:border-black outline-none transition-all font-bold text-black"
                  required
                />
                <Type className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-200" />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Model Variant</label>
              <input
                type="text"
                name="bikeModel"
                placeholder="e.g. Carbon Edition"
                value={formBikeData.bikeModel}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:border-black outline-none transition-all font-bold text-black"
                required
              />
            </div>
          </div>

          {/* Specs Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Ex-Showroom Price</label>
              <div className="relative">
                <input
                  type="number"
                  name="bikePrice"
                  value={formBikeData.bikePrice || ""}
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:border-black outline-none transition-all font-bold text-black"
                  required
                />
                <IndianRupee className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-200" />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Engine CC</label>
              <div className="relative">
                <input
                  type="text"
                  name="bikeCC"
                  placeholder="998"
                  value={formBikeData.bikeCC}
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:border-black outline-none transition-all font-bold text-black"
                  required
                />
                <Gauge className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-200" />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Manufacturer</label>
              <select
                name="bikeBrand"
                value={formBikeData.bikeBrand}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:border-black outline-none transition-all font-bold text-black appearance-none"
                required
              >
                <option value="">Select Brand</option>
                {bikeBrand.map((brand, idx) => (
                  <option key={idx} value={brand}>{brand}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Finishes (Colors) */}
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Color Options</label>
            <div className="flex flex-wrap gap-3">
              {bikeColor.map((color, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleColorChange(color)}
                  className={`px-6 py-3 rounded-xl border transition-all text-xs font-black uppercase tracking-tighter ${
                    formBikeData.bikeColor.includes(color)
                      ? "bg-black border-black text-white"
                      : "bg-white border-gray-100 text-gray-400 hover:border-black"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Fuel System */}
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Propulsion</label>
            <div className="flex flex-wrap gap-8">
              {bikeFuel.map((fuel, idx) => (
                <label key={idx} className="flex items-center group cursor-pointer">
                  <input
                    type="radio"
                    name="bikeFuel"
                    value={fuel}
                    checked={formBikeData.bikeFuel === fuel}
                    onChange={handleChange}
                    className="w-5 h-5 accent-red-600 border-gray-300 mr-3"
                    required
                  />
                  <span className={`text-sm font-black uppercase transition-colors ${
                    formBikeData.bikeFuel === fuel ? "text-black" : "text-gray-300 group-hover:text-gray-400"
                  }`}>
                    {fuel}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Detailed Description</label>
            <textarea
              name="bikeDescription"
              rows={4}
              value={formBikeData.bikeDescription}
              onChange={handleChange}
              placeholder="Enter machine highlights..."
              className="w-full px-6 py-4 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:border-black outline-none transition-all font-bold text-black resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              className="w-full bg-black text-white py-6 rounded-2xl font-black uppercase tracking-[0.3em] hover:bg-red-600 transition-all duration-500 shadow-xl shadow-black/10 active:scale-95 flex items-center justify-center gap-3"
            >
              <Plus className="w-5 h-5" /> Register Machine
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}