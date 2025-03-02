import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Signup from "./pages/SignUp";
import VerifyOTP from "./pages/VerifyOTP";
import Login from "./pages/Login";
import Upload from "./pages/Upload";
import Download from "./pages/Download";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <Router>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 app-container">
        <div className="w-4/5 max-w-4xl p-6 bg-white shadow-lg rounded-xl mx-auto">
        {isAuthenticated && (
            <button onClick={handleLogout} className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded">Logout</button>
          )}
          <Routes>
            <Route path="/signup" element={
              
              <div className="flex flex-col items-center">
                  <Signup />
                  <p className="mt-4 text-gray-600">
                    Already have an account? <a href="/login" className="text-blue-500 hover:underline">Log in</a>
                  </p>
                </div>
              } />
            <Route path="/verify-otp" element={<VerifyOTP />} />
            <Route path="/login" element={
              isAuthenticated ? <Navigate to="/upload" /> : (
                <div className="flex flex-col items-center">
                  <Login onLoginSuccess={() => setIsAuthenticated(true)} />
                  <p className="mt-4 text-gray-600">
                    Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign Up</a>
                  </p>
                </div>
              )
            } />
            <Route path="/upload" element={isAuthenticated ? <Upload /> : <Navigate to="/login" />} />
            {/* <Route path="/download" element={isAuthenticated ? <Download /> : <Navigate to="/login" />} /> */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
