import React from "react";
import { HomeBanner } from "../components/HomeBanner";
import "../pages/HomePage.css";
import Sliderr from "../components/Sliderr";
import HowTo from "../components/HowTo";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <HomeBanner />
      <section className="content-inner bg-light position-relative overflow-hidden p-4">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <img
                src="/alumni.jpg"
                alt="Job"
                className="img-fluid"
                style={{ backgroundBlendMode: "cover" }}
              />
            </div>
            <div className="col-lg-6 py-4">
              <div className="section-head text-start">
                <h2 className="text-primary">About Us</h2>
                <h4 className="title">
                  Welcome to Alumni Connect! - Your central hub for connecting
                  with Integral University alumni.
                </h4>
              </div>
              <p className="text-start">
                Alumni Connect is dedicated to solving the challenge of
                connecting with alumni and establishing a centralized network
                exclusively for Integral University. We recognize the importance
                of alumni connections in shaping your future by providing
                valuable opportunities, guidance, and inspiration.
                <br /> <br />
                Say farewell to the hassle of searching for alumni across
                multiple platforms. With Alumni Connect, you can effortlessly
                discover and engage with alumni employed in various companies
                and industries, all within one unified platform.
              </p>
              <Link to="/team">
                <button className="btn btn-primary rounded text-white px-4 py-2 mt-3 button-animated">
                  Meet The Team Behind This!
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <HowTo />
      <Sliderr />
    </div>
  );
};

export default HomePage;
