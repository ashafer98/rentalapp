import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { MyContextProvider } from './context/MyContext';
import 'bootstrap/dist/css/bootstrap.min.css';


const container = document.getElementById('root');
const root = createRoot(container); // React 18 uses createRoot
root.render(
  <React.StrictMode>
    <MyContextProvider>
        <App />
    </MyContextProvider>
  </React.StrictMode>
);