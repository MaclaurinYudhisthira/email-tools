import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
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
    <div className="flex flex-col items-center justify-center min-h-screen coolinput">
      <h2 className="text-xl font-bold">Sign Up</h2>
      <form onSubmit={handleSignup} className="flex flex-col gap-4">
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="border p-2  input" />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="border p-2 input" />
        <button type="submit" className="bg-blue-500 text-white p-2 input">Sign Up</button>
      </form>
    </div>
  );
}
