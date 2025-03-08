



export default function Header({isAuthenticated}) {
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <div className="header_section" style={{ width: "100%" }}>
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="logo">
            <a href="/">
              <img src="/images/Verify_cropped.png" alt="Logo" style={{ height: "3rem" }} />
            </a>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link" href="/">
                  HOME
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="about.html">
                  ABOUT
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="services.html">
                  SERVICES
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  WEB
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  ELEMENTS
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="contact.html">
                  CONTACT
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <img src="/images/search-icon.png" alt="Search" />
                </a>
              </li>
              {
                isAuthenticated?(
                  <li className="nav-item">
                    <button onClick={handleLogout} className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded">Logout</button>
              </li>
                ):(
                    <>
                  <li className="nav-item">
              <a className="nav-link" href="/login">
                  Login
                </a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="/signup">
                    SignUp
                  </a>
                </li>
                    </>
                )
              }
              
              
                
              {/* {isAuthenticated && <li className="nav-item">
                <a className="nav-link" href="#">
                  Kishan
                </a>
              </li>} */}
              {/* <li className="nav-item">
                <a className="nav-link" href="#">
                  {isAuthenticated && (
                    <button onClick={handleLogout} className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded">Logout</button>)}
                </a>
              </li> */}
            </ul>
          </div>
        </nav>
      </div>
    </div>

  );
}
