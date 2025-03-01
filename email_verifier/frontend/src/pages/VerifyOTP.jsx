import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const email = localStorage.getItem("email");

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/verify-otp/", { email, otp });
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.detail || "OTP verification failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-xl font-bold">Verify OTP</h2>
      <form onSubmit={handleVerify} className="flex flex-col gap-4">
        <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required className="border p-2" />
        <button type="submit" className="bg-blue-500 text-white p-2">Verify</button>
      </form>
    </div>
  );
}
