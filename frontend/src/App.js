// Import React Router components for navigation
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import page components
import Register from "./pages/Register";
import Login from "./pages/Login";
import EventDashboard from "./pages/eventDashboard";

/**
 * App Component
 * Main component that handles routing configuration for the application
 * Sets up routes for registration, login, and the main event dashboard
 */
function App() {
  return (
    <Router>
      <Routes>
        {/* Authentication routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        {/* Main application route */}
        <Route path="/" element={<EventDashboard />} />
      </Routes>
    </Router>
  );
}

// Export App component as the default export
export default App;