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
      <div className="coolinput mail_section a_section" >
        <div></div>
        <div className="formdiv invisible-bg">
          <h1 className="text-xl font-bold">SignUp</h1>
          <form onSubmit={handleSignup}>
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 border rounded input"
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 border rounded input"
                required
              />
            </div>
            <div>
              <button type="submit" className="bg-blue-500 text-white p-2 rounded" >
                SignUp
              </button>
            </div>
            <div>
              <p>
                Already have an account? <a href="/login">Login</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}