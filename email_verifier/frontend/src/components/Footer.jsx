



export default function Footer() {
    return (
      <div>
        {/* Footer Section */}
        <div className="footer_section layout_padding">
          <div className="container">
            <div className="footer_main">
              {/* <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Enter your email" aria-label="Email" />
                <div className="input-group-append">
                  <span className="input-group-text">Subscribe Now</span>
                </div>
              </div>
              <h1 className="year_text">2020</h1> */}
              <h1 className="landing_text">Free Multipurpose Responsive Landing Page</h1>
            </div>
            <div className="social_icon">
              <ul>
                <li>
                  <a href="#">
                    <img src="images/fb-icon.png" alt="Facebook" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src="images/twitter-icon.png" alt="Twitter" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src="images/linkedin-icon.png" alt="LinkedIn" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src="images/instagram-icon.png" alt="Instagram" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src="images/youtube-icon.png" alt="YouTube" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
  
        {/* Copyright Section */}
        <div className="copyright_section">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <p className="copyright_text">
                  2020 All Rights Reserved. Design by{" "}
                  <a href="https://html.design/">Free HTML Templates</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  