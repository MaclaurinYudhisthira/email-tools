

import "../css/bootstrap.min.css";
import "../css/style.css";
import "../css/responsive.css";
import "../css/jquery.mCustomScrollbar.min.css";
import "../css/owl.carousel.min.css";
import Header from "../components/Header";
import Footer from "../components/Footer";



export default function Landing({isAuthenticated}) {
    return (
      <div>
        {/* Header Section */}
       <Header isAuthenticated={isAuthenticated} />
  
        {/* Banner Section */}
        <div className="banner_section layout_padding">
          <div className="container">
            <h1 className="banner_taital">Verify Emails Instantly </h1>
            <h2 className="free_text"> Fast, secure, and 99% accurate verification.</h2>
            <div className="read_bt">
              <div className="read_text">
                <a href="/login">Verify Now</a>
              </div>
            </div>
          </div>
        </div>
  
        {/* Background Section */}
        <div className="container">
          <div className="bg_main">
            <img src="images/bg-main.png" alt="Background" />
          </div>
        </div>
  
        {/* About Section */}
        <div className="about_section">
          <div className="container">
            <h1 className="about_text">About Web Elements</h1>
            <p className="lorem_text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
            </p>
            <div className="about_bg">
              <img src="images/about-bg.png" alt="About" />
            </div>
            <p className="lorem_text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </p>
            <div className="read_bt_main">
              <div className="read_text_2">
                <a href="#">Read More</a>
              </div>
            </div>
          </div>
        </div>
  
        {/* Services Section */}
        <div className="service_section layout_padding">
          <div className="container">
            <h1 className="about_text">Services</h1>
            <p className="ipsum_text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
            </p>
            <div className="service_section_2">
              <div className="row">
                <div className="col-sm-12 col-lg-4">
                  <div className="icon_1">
                    <img src="images/icon-1.png" alt="Icon 1" />
                  </div>
                  <h1 className="website_text">Website Element</h1>
                  <p class="dolor_text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliq</p>
                </div>
                <div className="col-sm-12 col-lg-4">
                  <div className="icon_1">
                    <img src="images/icon-2.png" alt="Icon 2" />
                  </div>
                  <h1 className="website_text">Applications Element</h1>
                  <p class="dolor_text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliq</p>
                </div>
                <div className="col-sm-12 col-lg-4">
                  <div className="icon_1">
                    <img src="images/icon-3.png" alt="Icon 3" />
                  </div>
                  <h1 className="website_text">Design Element</h1>
                  <p class="dolor_text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliq</p>
                </div>
              </div>
            </div>
          </div>
        </div>
  

      {/* Contact Section */}
      <div className="contact_section layout_padding">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1 className="contact_text">Request a Call Back</h1>
              <div className="contact_main">
                <form className="mail_section" >
                  <input
                    type="text"
                    className="mail_text"
                    placeholder="Name"
                    name="name"
                  />
                  <input
                    type="email"
                    className="mail_text"
                    placeholder="Email"
                    name="email"
                  />
                  <input
                    type="text"
                    className="mail_text"
                    placeholder="Phone"
                    name="phone"
                  />
                  <select name="selectValue">
                    <option value="">Select elements</option>
                    <option value="one">One</option>
                    <option value="two">Two</option>
                    <option value="three">Three</option>
                  </select>
                  <textarea
                    className="massage_text"
                    placeholder="Message"
                    rows="5"
                    name="message"
                  ></textarea>
                  <div className="send_bt">
                    <button type="submit" className="send_text">SEND</button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-6">
              <div className="contact_bg">
                <img src="images/contact-bg.png" alt="Contact Background" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Client Section */}
      <div className="client_section layout_padding">
        <div className="container">
          <h1 className="about_text">What Our Clients Say</h1>
          <p className="ipsum_text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="client_section_2 layout_padding">
            <h1 className="client_text">Consectetur Adipiscing</h1>
            <p className="ipsum_text_2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="icon_4">
              <img src="images/icon-4.png" alt="Client Icon" />
            </div>
          </div>
        </div>
      </div>

      <Footer/>
      </div>
    );
  }
  