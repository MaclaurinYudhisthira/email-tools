import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Signup from "./pages/SignUp";
import VerifyOTP from "./pages/VerifyOTP";
import Login from "./pages/Login";
import Upload from "./pages/Upload";
import Landing from "./pages/Landing";
// import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/upload" /> : (<Landing isAuthenticated={isAuthenticated}/>)} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/upload" /> : (<Login isAuthenticated={isAuthenticated} onLoginSuccess={() => setIsAuthenticated(true)} />)} />
        <Route path="/signup" element={isAuthenticated ? <Navigate to="/upload" /> : (<Signup isAuthenticated={isAuthenticated}/>)} />
        <Route path="/upload" element={isAuthenticated ? <Upload isAuthenticated={isAuthenticated} handleLogout={handleLogout}/> : <Navigate to="/login" />} />
        <Route path="/verify-otp" element={isAuthenticated ? <Upload isAuthenticated={isAuthenticated} handleLogout={handleLogout}/> : <VerifyOTP isAuthenticated={false}/>} />
      </Routes>
    </Router>

  );
}

export default App;