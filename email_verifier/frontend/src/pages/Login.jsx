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

function Login({ onLoginSuccess, isAuthenticated }) {
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

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("email", email);
      onLoginSuccess(); // Update authentication state
      navigate("/upload"); // Redirect to upload page
    } else {
      alert("Login failed!");
    }
  };

  return (
    <>
      <Header isAuthenticated={isAuthenticated} />
      <div className="coolinput mail_section a_section">
        <div></div>
        <div className="formdiv invisible-bg">
          <h1 className="text-xl font-bold">Login</h1>
          <form onSubmit={handleLogin} >
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
                Login
              </button>
            </div>
            <div>
              <p >
                Don't have an account? <a href="/signup">Sign Up</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
