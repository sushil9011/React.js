"use client";

import { useState } from "react";
import { Bike, Plus, Fuel, Palette, Tag, Hash, DollarSign } from "lucide-react";

export default function AddBike() {
  const bikeBrand = ["Harley-Davidson", "Honda", "Yamaha", "Kawasaki", "Ducati", "BMW", "Triumph", "Royal Enfield"];
  const bikeColor = ["Matte Black", "Gloss White", "Racing Red", "Metallic Blue", "Carbon Gray", "Custom Wrap"];
  const bikeFuel = ["Petrol", "Diesel", "Electric", "Hybrid"];

  type formBikeDataType = {
    id: number,
    bikeName: string,
    bikeModel: string,
    bikePrice: number,
    bikeBrand: string,
    bikeColor: string[],
    bikeFuel: string
  }

  const [formBikeData, setFormBikeData] = useState<formBikeDataType>({
    id: Math.floor(Math.random() * 10000),
    bikeName: "",
    bikeModel: "",
    bikePrice: 0,
    bikeBrand: "",
    bikeColor: [],
    bikeFuel: ""
  });

  const onSubmit = (event: any) => {
    event.preventDefault();
    console.log("Form Submit.....");
    console.log("Bike : ", formBikeData);
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-600 to-orange-600 rounded-2xl shadow-xl mb-6">
              <Bike className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">
              Add New Motorcycle
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Fill in the details below to add a new motorcycle to your inventory
            </p>
            <div className="w-32 h-1.5 bg-gradient-to-r from-red-600 to-orange-600 mx-auto mt-6 rounded-full"></div>
          </div>

          {/* Form Container */}
          <form onSubmit={onSubmit} className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Form Header */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-8 py-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-red-600 to-orange-600 rounded-lg">
                  <Plus className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white">Motorcycle Details</h2>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-8 space-y-8">
              {/* Grid Layout for Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Bike Name */}
                <div className="space-y-3">
                  <label htmlFor="bikeName" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <Tag className="w-4 h-4 text-red-600" />
                    Bike Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="bikeName"
                      id="bikeName"
                      placeholder="e.g., Streetfighter, Ninja, Panigale"
                      className="w-full px-4 pl-12 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all duration-200 bg-gray-50 hover:bg-white"
                    />
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                      <Bike className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Bike Model */}
                <div className="space-y-3">
                  <label htmlFor="bikeModel" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <Hash className="w-4 h-4 text-red-600" />
                    Model Variant <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="bikeModel"
                      id="bikeModel"
                      placeholder="e.g., V4 S, ZX-10R, S1000RR"
                      className="w-full px-4 pl-12 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all duration-200 bg-gray-50 hover:bg-white"
                    />
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                      <Hash className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Bike Price */}
                <div className="space-y-3">
                  <label htmlFor="bikePrice" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <DollarSign className="w-4 h-4 text-red-600" />
                    Price (₹) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="bikePrice"
                      id="bikePrice"
                      placeholder="e.g., 1500000"
                      className="w-full px-4 pl-12 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all duration-200 bg-gray-50 hover:bg-white"
                    />
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                      <DollarSign className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Bike Brand */}
                <div className="space-y-3">
                  <label htmlFor="bikeBrand" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <Bike className="w-4 h-4 text-red-600" />
                    Manufacturer <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="bikeBrand"
                      id="bikeBrand"
                      className="w-full px-4 pl-12 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all duration-200 bg-gray-50 hover:bg-white appearance-none"
                    >
                      <option value="">Select manufacturer</option>
                      {bikeBrand.map((brand, index) => {
                        return <option key={index} value={brand}>{brand}</option>
                      })}
                    </select>
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                      <Bike className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bike Color */}
              <div className="space-y-4">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Palette className="w-4 h-4 text-red-600" />
                  Available Colors <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {bikeColor.map((color, index) => {
                    return (
                      <label key={index} className="group relative">
                        <input
                          type="checkbox"
                          name="bikeColor"
                          value={color}
                          className="sr-only peer"
                        />
                        <div className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-xl hover:border-red-300 hover:bg-red-50 cursor-pointer transition-all duration-200 peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:shadow-md">
                          <div className={`w-8 h-8 rounded-full mb-2 ${
                            color === "Matte Black" ? "bg-gray-900" :
                            color === "Gloss White" ? "bg-gray-100 border border-gray-300" :
                            color === "Racing Red" ? "bg-red-600" :
                            color === "Metallic Blue" ? "bg-blue-600" :
                            color === "Carbon Gray" ? "bg-gray-600" :
                            "bg-gradient-to-r from-purple-500 to-pink-500"
                          }`}></div>
                          <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{color}</span>
                        </div>
                        <div className="absolute top-2 right-2 w-5 h-5 border-2 border-gray-300 rounded peer-checked:bg-red-500 peer-checked:border-red-500 flex items-center justify-center transition-all duration-200">
                          <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </label>
                    )
                  })}
                </div>
              </div>

              {/* Bike Fuel */}
              <div className="space-y-4">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Fuel className="w-4 h-4 text-red-600" />
                  Fuel Type <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {bikeFuel.map((fuel, index) => {
                    return (
                      <label key={index} className="group relative">
                        <input
                          type="radio"
                          name="bikeFuel"
                          value={fuel}
                          className="sr-only peer"
                        />
                        <div className="flex items-center justify-center p-4 border-2 border-gray-200 rounded-xl hover:border-red-300 hover:bg-red-50 cursor-pointer transition-all duration-200 peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:shadow-md">
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full border-2 border-gray-400 peer-checked:border-red-500 peer-checked:bg-red-500 transition-all duration-200`}></div>
                            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{fuel}</span>
                          </div>
                        </div>
                      </label>
                    )
                  })}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-8">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] focus:ring-4 focus:ring-red-500/30 shadow-lg hover:shadow-xl"
                >
                  <div className="flex items-center justify-center gap-3">
                    <Plus className="w-5 h-5" />
                    <span className="text-lg">Add Motorcycle to Inventory</span>
                  </div>
                </button>
                <p className="text-center text-gray-500 text-sm mt-4">
                  All fields marked with <span className="text-red-500">*</span> are required
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}