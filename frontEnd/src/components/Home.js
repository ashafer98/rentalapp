import React from 'react';
import Hero from './Hero';
import Features from './Features';
import Listings from './Listings';
import HowItWorks from './HowItWorks';
import Testimonials from './Testimonials';
import '../App.css';

function Home() {
  return (
    <div className="Home">
      <Hero />
      <Features />
      <Listings />
      <HowItWorks />
      <Testimonials />
    </div>
  );
}

export default Home;