'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Zap, Shield, Battery, Gauge } from 'lucide-react';

type BikeSlide = {
    id: number;
    model: string;
    category: string;
    description: string;
    image: string;
    price: string;
    specs: {
        engine: string;
        power: string;
        torque: string;
        weight: string;
    };
    features: string[];
}

const bikeSlides: BikeSlide[] = [
    {
        id: 1,
        model: "Adventure XR 1250",
        category: "ADVENTURE TOURING",
        description: "Conquer any terrain with confidence. Advanced suspension, all-weather capabilities, and long-range touring comfort.",
        image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39",
        price: "$18,999",
        specs: {
            engine: "1250cc Twin",
            power: "136 HP",
            torque: "143 Nm",
            weight: "249 kg"
        },
        features: ["Off-road Ready", "Smart Connectivity", "Cruise Control", "Heated Grips"]
    },
    {
        id: 2,
        model: "Urban Velocity S",
        category: "CITY COMMUTER",
        description: "Navigate urban landscapes with agility and style. Perfect for daily commuting with electric-assist technology.",
        image: "https://images.unsplash.com/photo-1517846693594-1567da72af75",
        price: "$12,499",
        specs: {
            engine: "750cc Parallel Twin",
            power: "68 HP",
            torque: "65 Nm",
            weight: "189 kg"
        },
        features: ["Electric Assist", "Fast Charging", "Storage Compartment", "LED Lighting"]
    },
    {
        id: 3,
        model: "Heritage Classic",
        category: "CRUISER",
        description: "Timeless American styling with modern reliability. Experience the open road with classic cruiser comfort.",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64",
        price: "$15,799",
        specs: {
            engine: "900cc V-Twin",
            power: "65 HP",
            torque: "78 Nm",
            weight: "265 kg"
        },
        features: ["Leather Accents", "Custom Exhaust", "Comfort Seat", "Classic Styling"]
    },
    {
        id: 4,
        model: "Track Dominator RR",
        category: "SPORT BIKE",
        description: "Track-focused performance with street legality. Precision engineering for maximum speed and control.",
        image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87",
        price: "$24,999",
        specs: {
            engine: "1000cc Inline-4",
            power: "202 HP",
            torque: "113 Nm",
            weight: "174 kg"
        },
        features: ["Carbon Fiber", "Quick Shifter", "Launch Control", "Race ABS"]
    }
];

export default function BikeSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % bikeSlides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + bikeSlides.length) % bikeSlides.length);
    };

    useEffect(() => {
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
            {/* Slides */}
            {bikeSlides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                        index === currentSlide
                            ? 'opacity-100 translate-x-0'
                            : index < currentSlide
                            ? 'opacity-0 -translate-x-full'
                            : 'opacity-0 translate-x-full'
                    }`}
                >
                    {/* Background Image with Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent z-10" />
                    <img
                        src={slide.image}
                        alt={slide.model}
                        className="h-full w-full object-cover object-center scale-105"
                    />

                    {/* Content Container */}
                    <div className="absolute inset-0 z-20 flex items-center">
                        <div className="container mx-auto px-4 md:px-8 lg:px-16">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                                {/* Left Column: Bike Info */}
                                <div className="space-y-6">
                                    <div className="inline-flex items-center gap-2 bg-red-600/90 px-4 py-2 rounded-md">
                                        <Shield className="w-4 h-4" />
                                        <span className="text-sm font-semibold uppercase tracking-wider">
                                            {slide.category}
                                        </span>
                                    </div>
                                    
                                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                                        {slide.model}
                                    </h1>
                                    
                                    <p className="text-lg text-gray-300 max-w-xl">
                                        {slide.description}
                                    </p>
                                    
                                    {/* Specifications Grid */}
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4">
                                        <div className="bg-black/40 backdrop-blur-sm p-4 rounded-lg border border-gray-800">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Zap className="w-4 h-4 text-red-500" />
                                                <span className="text-sm text-gray-400">Engine</span>
                                            </div>
                                            <div className="text-xl font-bold text-white">{slide.specs.engine}</div>
                                        </div>
                                        
                                        <div className="bg-black/40 backdrop-blur-sm p-4 rounded-lg border border-gray-800">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Gauge className="w-4 h-4 text-red-500" />
                                                <span className="text-sm text-gray-400">Power</span>
                                            </div>
                                            <div className="text-xl font-bold text-white">{slide.specs.power}</div>
                                        </div>
                                        
                                        <div className="bg-black/40 backdrop-blur-sm p-4 rounded-lg border border-gray-800">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Battery className="w-4 h-4 text-red-500" />
                                                <span className="text-sm text-gray-400">Torque</span>
                                            </div>
                                            <div className="text-xl font-bold text-white">{slide.specs.torque}</div>
                                        </div>
                                        
                                        <div className="bg-black/40 backdrop-blur-sm p-4 rounded-lg border border-gray-800">
                                            <div className="text-sm text-gray-400 mb-2">Weight</div>
                                            <div className="text-xl font-bold text-white">{slide.specs.weight}</div>
                                        </div>
                                    </div>
                                    
                                    {/* Features */}
                                    <div className="flex flex-wrap gap-2">
                                        {slide.features.map((feature, idx) => (
                                            <span 
                                                key={idx}
                                                className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm border border-white/20"
                                            >
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                    
                                    {/* Price and CTA */}
                                    <div className="flex items-center justify-between pt-6">
                                        <div>
                                            <div className="text-sm text-gray-400">Starting from</div>
                                            <div className="text-3xl font-bold text-red-500">{slide.price}</div>
                                        </div>
                                        <div className="flex gap-4">
                                            <button className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md transition-all duration-300 hover:scale-105">
                                                Book Test Ride
                                            </button>
                                            <button className="px-8 py-3 bg-transparent hover:bg-white/10 text-white font-semibold rounded-md border border-white/30 transition-all duration-300">
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Right Column: Bike Image Focus */}
                                <div className="relative">
                                    <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-3xl"></div>
                                    <div className="relative">
                                        <div className="text-8xl font-black text-white/10 absolute -top-8 -right-8">
                                            0{slide.id}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 bg-black/80 backdrop-blur-sm hover:bg-black rounded-full p-4 transition-all duration-300 group border border-gray-700"
                aria-label="Previous bike"
            >
                <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            </button>

            <button
                onClick={nextSlide}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 bg-black/80 backdrop-blur-sm hover:bg-black rounded-full p-4 transition-all duration-300 group border border-gray-700"
                aria-label="Next bike"
            >
                <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
                {bikeSlides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`transition-all duration-300 flex items-center gap-2 ${
                            index === currentSlide 
                            ? 'text-red-500' 
                            : 'text-gray-500 hover:text-gray-300'
                        }`}
                        aria-label={`View ${bikeSlides[index].model}`}
                    >
                        <div className={`w-2 h-2 rounded-full ${
                            index === currentSlide ? 'bg-red-500' : 'bg-gray-600'
                        }`}></div>
                        <span className="text-sm font-medium">
                            {bikeSlides[index].category.split(' ')[0]}
                        </span>
                    </button>
                ))}
            </div>

            {/* Current Slide Number */}
            <div className="absolute bottom-8 right-8 z-30">
                <div className="text-white/50 text-sm">
                    <span className="text-2xl font-bold text-white">{currentSlide + 1}</span>
                    <span className="mx-2">/</span>
                    <span>{bikeSlides.length}</span>
                </div>
            </div>
        </div>
    );
}