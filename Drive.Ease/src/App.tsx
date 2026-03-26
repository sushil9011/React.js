import React from 'react';
import './App.css';
import Header from './components/Header';
import HeroSlider from './components/HeroSlider';
import WorkGrid from './components/WorkGrid';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app-main">
      <Header />
      <HeroSlider />
      <WorkGrid />
      <Contact />
      <Footer />
    </div>
  );
}
export default App;