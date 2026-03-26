import React, { useState } from 'react';

const HeroSlider = () => {
  const [index, setIndex] = useState(0);

  const cars = [
    { 
      brand: "MERCEDES", 
      name: "S-Class Maybach", 
      img: "https://pngimg.com/uploads/mercedes/mercedes_PNG80135.png" 
    },
  { brand: "TOYOTA",
     name: "Supra MK5",
     img: "https://www.pngplay.com/wp-content/uploads/13/Toyota-Supra-Transparent-PNG.png"
   },
  { brand: "DODGE",
     name: "Challenger Hellcat", 
     img: "https://pngimg.com/uploads/dodge/dodge_PNG13.png" 
    },
  ];


  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % cars.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + cars.length) % cars.length);
  };

  return (
    <section id='home' className="hero-container">
      {/* Background Brand Name */}
      <div className="slide-bg">
        <div className="bg-text">{cars[index].brand}</div>
      </div>

      {/* Main Content */}
      <div className="content-overlay">
        <span className="badge bg-dark rounded-pill mb-3 px-3 py-2">PREMIUM 2026</span>
        <h1 className="display-mega">{cars[index].name}</h1>
        <p className="fs-4 text-muted">Experience the peak of performance.</p>
        
        {/* Navigation Buttons */}
        <div className="d-flex gap-3 mt-4">
          <button onClick={prevSlide} className="btn btn-outline-dark rounded-circle" style={{width: '50px', height: '50px'}}>←</button>
          <button onClick={nextSlide} className="btn btn-outline-dark rounded-circle" style={{width: '50px', height: '50px'}}>→</button>
        </div>
      </div>

      {/* Car Image */}
      <div className="car-display-wrapper">
        <img 
          src={cars[index].img} 
          alt={cars[index].name} 
          className="car-img" 
          key={index} 
        />
      </div>
    </section>
  );
};

export default HeroSlider;