import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router'; //

interface Product {
  id: string;
  p_name: string;
  p_price: number;
  p_image: string;
  p_category: string;
  p_description: string;
}

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const navigate = useNavigate(); //

  const categories = ['All', 'Coffee', 'Desserts', 'Burgers'];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/product');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        console.error("Error loading menu:", err);
      }
    };
    fetchProducts();
  }, []);

  const filterMenu = (category: string) => {
    setActiveCategory(category);
    if (category === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.p_category === category));
    }
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] text-[#4a3728]">
      {/* --- HERO SECTION --- */}
      <section className="relative h-[60vh] flex items-center justify-center bg-[#5d4037] overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2000" 
            alt="Cafe Background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 text-center px-4">
          <span className="text-[#d6ccc2] uppercase tracking-[0.3em] text-sm font-bold">Premium Quality</span>
          <h1 className="text-6xl md:text-8xl font-black text-white mt-2 tracking-tighter uppercase">
            The Cozy <span className="text-[#b08968]">Bean</span>
          </h1>
          <p className="text-[#ede0d4] mt-4 text-lg italic font-serif">Brewing moments, one cup at a time.</p>
        </div>
      </section>

      {/* --- CATEGORY FILTER --- */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => filterMenu(cat)}
              className={`px-8 py-2 rounded-full font-bold border-2 transition-all ${
                activeCategory === cat 
                ? "bg-[#5d4037] border-[#5d4037] text-white" 
                : "border-[#ede0d4] text-[#a1887f] hover:border-[#b08968]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* --- PRODUCT GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProducts.map((item) => (
            <div 
              key={item.id} 
              className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-[#ede0d4] cursor-pointer"
              onClick={() => navigate(`/product-detail/${item.id}`)} // Poore card par click karne se detail page khulega
            >
              <div className="h-72 overflow-hidden relative">
                <img 
                  src={item.p_image} 
                  alt={item.p_name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-black shadow-sm">
                  ₹{item.p_price}
                </div>
              </div>
              
              <div className="p-8">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-black tracking-tight text-[#5d4037] uppercase">{item.p_name}</h3>
                  <span className="text-[10px] font-black bg-[#f5ebe0] text-[#b08968] px-2 py-1 rounded tracking-widest">{item.p_category}</span>
                </div>
                <p className="text-[#a1887f] text-sm leading-relaxed line-clamp-2 italic mb-6">
                  {item.p_description}
                </p>
                
                <div className="flex gap-3">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation(); // Card click event ko rokne ke liye
                      navigate(`/edit-product/${item.id}`);
                    }} 
                    className="flex-1 py-3 border-2 border-[#ede0d4] rounded-xl text-sm font-bold hover:bg-[#fdfbf7] transition-all"
                  >
                    Edit Item
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      // Order logic yahan aayegi
                    }}
                    className="flex-1 bg-[#5d4037] text-white py-3 rounded-xl text-sm font-bold hover:bg-[#4a3728] transition-all shadow-lg shadow-[#5d4037]/20"
                  >
                    Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[#a1887f] italic text-xl">Menu is being prepared...</p>
          </div>
        )}
      </div>

      <footer className="bg-[#5d4037] text-white py-12 mt-20 text-center">
        <h2 className="text-2xl font-black tracking-widest uppercase">The Cozy Bean</h2>
        <p className="text-[#d6ccc2] mt-2 text-sm">Experience the art of coffee</p>
      </footer>
    </div>
  );
};

export default HomePage;