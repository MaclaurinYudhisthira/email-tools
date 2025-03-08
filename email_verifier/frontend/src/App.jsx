import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Signup from "./pages/SignUp";
import VerifyOTP from "./pages/VerifyOTP";
import Login from "./pages/Login";
import Upload from "./pages/Upload";
import Download from "./pages/Download";
import Landing from "./pages/Landing";
import Header from "./components/Header";
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
// 
// {/* <div className="min-h-screen flex items-center justify-center bg-gray-100 app-container">
// <div className="w-4/5 max-w-4xl p-6 bg-white shadow-lg rounded-xl mx-auto">
// {isAuthenticated && (
//     <button onClick={handleLogout} className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded">Logout</button>
//   )}
//   <Routes>
//     <Route path="/signup" element={
      
//       <div className="flex flex-col items-center">
//           <Signup />
//           <p className="mt-4 text-gray-600">
//             Already have an account? <a href="/login" className="text-blue-500 hover:underline">Log in</a>
//           </p>
//         </div>
//       } />
//     
//     <Route path="/login" element={
//       isAuthenticated ? <Navigate to="/upload" /> : (
//         <div className="flex flex-col items-center">
//           <Login onLoginSuccess={() => setIsAuthenticated(true)} />
//           <p className="mt-4 text-gray-600">
//             Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign Up</a>
//           </p>
//         </div>
//       )
//     } />
//     <Route path="/upload" element={isAuthenticated ? <Upload /> : <Navigate to="/login" />} />
//     {/* <Route path="/download" element={isAuthenticated ? <Download /> : <Navigate to="/login" />} /> */}
//     <Route path="*" element={<Navigate to="/login" />} />
//   </Routes>
// </div>
// </div> */}