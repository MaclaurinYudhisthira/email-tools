import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function VerifyOTP({ isAuthenticated }) {
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
    <>

      <Header />
      <div className="coolinput mail_section a_section">
        <div className="formdiv invisible-bg">
          <h1 className="text-xl font-bold">Verify OTP</h1>
          <form onSubmit={handleVerify} className="flex flex-col space-y-4" style={{ color: "#000" }}>
            <div>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="p-2 border rounded input"
                required
              />
            </div>
            <div>
              <button type="submit" className="bg-blue-500 text-white p-2 rounded" >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}