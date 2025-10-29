import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import Home from "./Home";
import HealthAwarenessPortal from "./HealthAwarenessPortal";
import "./App.css";

function App() {
  return (
    <Router>
      {/* ✅ Navigation Bar */}
      <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="font-bold text-xl tracking-wide">
          🩺 Health Awareness Portal
        </h1>

        <div className="space-x-6">
          <Link to="/" className="hover:underline text-white">
            Home
          </Link>
          <Link to="/survey" className="hover:underline text-white">
            Health Survey
          </Link>
        </div>
      </nav>

      {/* ✅ Routes Section */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/survey" element={<HealthAwarenessPortal />} />
          {/* Redirect invalid routes back to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* ✅ Footer */}
      <footer className="bg-blue-600 text-center py-4 text-sm mt-10 text-white">
        © {new Date().getFullYear()} Health Awareness Portal | Designed for CSP Project 💙
      </footer>
    </Router>
  );
}

export default App;
