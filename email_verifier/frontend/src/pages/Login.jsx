import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../css/bootstrap.min.css";
import "../css/style.css";
import "../css/responsive.css";
import "../css/jquery.mCustomScrollbar.min.css";
import "../css/owl.carousel.min.css";
import "../css/login.css";

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Example API call for login
    const response = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      onLoginSuccess(); // Update authentication state
      navigate("/upload"); // Redirect to upload page
    } else {
      alert("Login failed!");
    }
  };

  return (
    <>

      <Header />
      <div className="coolinput mail_section" style={{ width: "100%", textAlign: "center", padding: "200px" }}>
        <h1 className="text-xl font-bold" style={{ color: "white", fontSize: "30px" }}>Login</h1>
        <form onSubmit={handleLogin} className="flex flex-col space-y-4" style={{ color: "#000" }}>
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
            Login
          </button>

          <p className="mt-4 text-gray-600" style={{ fontSize: "20px" }}>
            Don't have an account? <a href="/signup" className="text-blue-500 hover:underline" style={{}}>Sign Up</a>
          </p>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Login;
