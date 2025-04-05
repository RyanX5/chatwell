import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx'; // Import the main App component
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App /> {/* Just render the App component */}
  </StrictMode>
);
