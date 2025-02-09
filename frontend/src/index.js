// Import necessary dependencies from React
import React from 'react';
import ReactDOM from 'react-dom/client';

// Import styles and components
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Create a root element for React to render into
// This is the main entry point for the React application
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component wrapped in StrictMode
// StrictMode helps identify potential problems in the application
// It enables additional development-only checks and warnings
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Performance monitoring setup
// This is optional but useful for measuring and tracking app performance
// You can pass different callback functions to handle the performance data:
// - reportWebVitals(console.log) : Logs to console
// - reportWebVitals((metrics) => sendToAnalytics(metrics)) : Sends to analytics service
reportWebVitals();
