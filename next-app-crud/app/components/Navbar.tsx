"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Bike, PlusCircle, Eye, Smartphone } from "lucide-react";

export default function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-xl sticky top-0 z-50 border-b border-gray-800">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo/Brand */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-red-600 to-red-800 rounded-lg">
                <Bike className="w-6 h-6 text-white" />
              </div>
              <Link href="/" className="group">
                <div className="flex flex-col">
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent group-hover:from-red-600 group-hover:to-orange-600 transition-all duration-300">
                    BIKE HUB
                  </h1>
                  <span className="text-xs text-gray-400 font-medium tracking-wider">
                    PREMIUM MOTORCYCLES
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              <Link
                href="/"
                className="flex items-center gap-2 px-5 py-3 text-gray-300 hover:text-white font-medium rounded-lg transition-all duration-200 hover:bg-gradient-to-r hover:from-gray-800 hover:to-gray-900 relative group"
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-red-500 group-hover:scale-150 transition-transform"></div>
                </div>
                <span>Home</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>

              <Link
                href="/addBike"
                className="flex items-center gap-2 px-5 py-3 text-gray-300 hover:text-white font-medium rounded-lg transition-all duration-200 hover:bg-gradient-to-r hover:from-gray-800 hover:to-gray-900 relative group"
              >
                <PlusCircle className="w-5 h-5 text-red-500" />
                <span>Add Bike</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>

              <Link
                href="/viewBike"
                className="flex items-center gap-2 px-5 py-3 text-gray-300 hover:text-white font-medium rounded-lg transition-all duration-200 hover:bg-gradient-to-r hover:from-gray-800 hover:to-gray-900 relative group"
              >
                <Eye className="w-5 h-5 text-red-500" />
                <span>View Bikes</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>

              <Link
                href="/addBikes/flutter"
                className="flex items-center gap-2 px-5 py-3 text-gray-300 hover:text-white font-medium rounded-lg transition-all duration-200 hover:bg-gradient-to-r hover:from-gray-800 hover:to-gray-900 relative group"
              >
                <Smartphone className="w-5 h-5 text-red-500" />
                <span>Mobile App</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>

              {/* Call to Action Button */}
              <Link
                href="/contact"
                className="ml-4 px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-900/30 hover:scale-105"
              >
                Contact Dealer
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-3 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-gray-300 hover:text-white rounded-lg transition-all duration-200 border border-gray-700 hover:border-gray-600"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-800 bg-gradient-to-b from-gray-900 to-gray-950 rounded-b-xl shadow-2xl">
              <div className="flex flex-col space-y-1">
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-4 text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-800 hover:to-gray-900 rounded-lg font-medium transition-all duration-200 group"
                >
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 group-hover:bg-gray-700">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  </div>
                  <div className="flex flex-col">
                    <span>Home</span>
                    <span className="text-xs text-gray-500">Dashboard</span>
                  </div>
                </Link>

                <Link
                  href="/addBike"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-4 text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-800 hover:to-gray-900 rounded-lg font-medium transition-all duration-200 group"
                >
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 group-hover:bg-gray-700">
                    <PlusCircle className="w-4 h-4 text-red-500" />
                  </div>
                  <div className="flex flex-col">
                    <span>Add Bike</span>
                    <span className="text-xs text-gray-500">List new motorcycle</span>
                  </div>
                </Link>

                <Link
                  href="/viewBike"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-4 text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-800 hover:to-gray-900 rounded-lg font-medium transition-all duration-200 group"
                >
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 group-hover:bg-gray-700">
                    <Eye className="w-4 h-4 text-red-500" />
                  </div>
                  <div className="flex flex-col">
                    <span>View Bikes</span>
                    <span className="text-xs text-gray-500">Browse inventory</span>
                  </div>
                </Link>

                <Link
                  href="/addBikes/flutter"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-4 text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-800 hover:to-gray-900 rounded-lg font-medium transition-all duration-200 group"
                >
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 group-hover:bg-gray-700">
                    <Smartphone className="w-4 h-4 text-red-500" />
                  </div>
                  <div className="flex flex-col">
                    <span>Mobile App</span>
                    <span className="text-xs text-gray-500">Flutter application</span>
                  </div>
                </Link>

                {/* Mobile CTA Button */}
                <div className="pt-4 px-4">
                  <Link
                    href="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full text-center px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-900/30"
                  >
                    Contact Dealer
                  </Link>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  );
}