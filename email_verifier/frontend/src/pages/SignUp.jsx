import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Signup(isAuthenticated) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/signup/", { email, password });
      localStorage.setItem("email", email); // Store email for OTP verification
      navigate("/verify-otp");
    } catch (error) {
      alert(error.response?.data?.detail || "Signup failed");
    }
  };

  return (
    <>
      <Header />
      <div className="coolinput mail_section" style={{ width: "100%", textAlign: "center", padding: "200px" }}>
        <h1 className="text-xl font-bold" style={{ color: "white", fontSize: "30px" }}>Login</h1>
        <form onSubmit={handleSignup} className="flex flex-col space-y-4" style={{ color: "#000" }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border rounded input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border rounded input"
            required
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded" >
            SignUp
          </button>
          <p className="mt-4 text-gray-600" style={{ fontSize: "20px" }}>
            Already have an account? <a href="/login" className="text-blue-500 hover:underline" style={{}}>Login</a>
          </p>
        </form>
      </div>
      <Footer />
    </>
  );
}

// (
//   <>
//     <Header isAuthenticated={isAuthenticated} />
//     <div className="flex flex-col items-center justify-center min-h-screen coolinput">
//       <h2 className="text-xl font-bold">Sign Up</h2>
//       <form onSubmit={handleSignup} className="flex flex-col gap-4">
//         <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="border p-2  input" />
//         <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="border p-2 input" />
//         <button type="submit" className="bg-blue-500 text-white p-2 input">Sign Up</button>
//       </form>
//     </div>
//     <Footer />
//   </>

// );