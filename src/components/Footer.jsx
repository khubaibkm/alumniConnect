import React from "react";
import "./Footer.css";

const Footer = () => {
  const getYear = () => {
    return new Date().getFullYear();
  };
  return (
    <div className="px-5  footerr">
      <footer className="py-5">
        <div className="row">
          <div className="col-12 col-md-6 mb-3 d-flex flex-column align-items-start">
            <img width={"250px"} src="/logo.svg" alt="alumni connect" />
            <p style={{ textAlign: "left", marginTop: "15px" }}>
              Welcome to the vibrant community of Integral University Alumni
              Connect – where meaningful connections shape your future! At
              Alumni Connect, we have crafted a platform designed to streamline
              the process of discovering and connecting with the esteemed alumni
              of Integral University, Lucknow. Join us today, and together,
              let's shape your future through the power of alumni connections at
              Integral University Alumni Connect!
            </p>
          </div>

          <div className="col-md-5 offset-md-1 mb-3 ">
            <form>
              <h5>Subscribe to our newsletter</h5>
              <p>Monthly digest of what's new and exciting from us.</p>
              <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                <label for="newsletter1" className="visually-hidden">
                  Email address
                </label>
                <input
                  id="newsletter1"
                  type="text"
                  className="form-control"
                  placeholder="Email address"
                />
                <br></br>
                <button className="subs btn btn-primary" type="button">
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
          <p>© {getYear()} Alumni Connect | All rights reserved.</p>
          <ul className="list-unstyled d-flex">
            <li className="ms-3">
              <a
                className="link-dark"
                href="mailto:khubaibahmadkm@gmail.com, iualumniconnect@gmail.com"
              >
                <i className="fa fa-envelope" aria-hidden="true"></i>
              </a>
            </li>
            <li className="ms-3">
              <a
                className="link-dark"
                href="https://www.linkedin.com/in/arish00/"
              >
                <i className="fa fa-linkedin" aria-hidden="true"></i>
              </a>
            </li>
            <li className="ms-3">
              <a
                className="link-dark"
                href="https://www.instagram.com/r_ish.py/"
              >
                <i className="fa fa-instagram" aria-hidden="true"></i>
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
