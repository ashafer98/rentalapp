import React, { useState } from 'react';
import NavBar from './Navbar';
import Footer from './components/Footer';
import Applicant from './components/Applicant';
import Home from './components/Home';
import './App.css';

function App() {
  const [showApplicant, setShowApplicant] = useState(false);

  return (
    <div className="App">
      <NavBar onNavigate={(section) => setShowApplicant(section === 'applicant')} />
      
      {showApplicant ? <Applicant /> : <Home />}

      <Footer />
    </div>
  );
}

export default App;
