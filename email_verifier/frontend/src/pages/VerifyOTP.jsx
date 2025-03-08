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
      <div className="coolinput mail_section" style={{ width: "100%", textAlign: "center", padding: "200px" }}>
        <h1 className="text-xl font-bold" style={{ color: "white", fontSize: "30px" }}>Login</h1>
        <form onSubmit={handleVerify} className="flex flex-col space-y-4" style={{ color: "#000" }}>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="p-2 border rounded input"
            required
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded" >
            Submit
          </button>
        </form>
      </div>
      <Footer />
    </>
  );

}


// return (
//   <div className="flex flex-col items-center justify-center min-h-screen coolinput">
//     <h2 className="text-xl font-bold">Verify OTP</h2>
//     <form onSubmit={handleVerify} className="flex flex-col gap-4">
//       <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required className="border p-2 input" />
//       <button type="submit" className="bg-blue-500 text-white p-2">Verify</button>
//     </form>
//   </div>
// );