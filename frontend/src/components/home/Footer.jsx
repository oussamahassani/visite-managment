import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w3l-footer-66">
      <section className="footer-inner-main">
        <div className="footer-hny-grids py-5">
          <div className="container py-lg-4">
            <div className="text-txt">
             
              <div className="right-side">
                <div className="row sub-columns">
                  <div className="col-lg-4 col-md-6 sub-one-left pr-lg-4">
                    <h2>
                      <a className="navbar-brand" href="index.html">
                        <span>N</span>
                      </a>
                    </h2>
                    <p className="pr-lg-4">Your trusted partner for all your vehicle maintenance needs. Expert  service, and quality care for your car. Experience reliability and excellence with us. </p>
                  
                  </div>
           
                  <div className="col-lg-4 col-md-6 sub-one-left">
                    <h6>Contact Info</h6>
                    <div className="sub-contact-info">
                      <p>Address:  Jasmine 8436, Hamam sousse, CP 4700, tunisia.</p>
                      <p className="my-3">Phone: <strong><a href="tel:+24160033999">+216 20-133-999</a></strong></p>
                      <p>E-mail:<strong> <a href="mailto:info@example.com">info@example.com</a></strong></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
