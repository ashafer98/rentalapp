import React from 'react';
import Hero from './components/Hero';
import Features from './components/Features';
import Listings from './components/Listings';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import NavBar from './Navbar';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Hero />
      <Features />
      <Listings />
      <HowItWorks />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default App;
