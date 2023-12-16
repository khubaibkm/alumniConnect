import React from "react";
import { HomeBanner } from "../components/HomeBanner";
import "../pages/HomePage.css";
import Sliderr from "../components/Sliderr";
import HowTo from "../components/HowTo";

const HomePage = () => {
  return (
    <div>
      <HomeBanner />
      <section className="content-inner bg-light position-relative overflow-hidden p-2">
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
                <h3>About Us</h3>
                <h2 className="title">
                  Welcome to Alumni Connect! - Where connections shape your
                  future.
                </h2>
              </div>
              <p className="text-start">
                At Alumni Connect, we understand the power of connections. We
                know that finding and connecting with alumni can open doors to
                new opportunities, guidance, and inspiration. That's why we've
                created a platform that makes it easy for you to connect with
                the alumni of Integral University, Lucknow.
                <br /> <br />
                Say goodbye to the struggle of searching for alumni on different
                platforms. With Alumni Connect, you can effortlessly find and
                engage with alumni working in various companies and industries,
                right here in one place.
                <br /> <br />
                Join us today and embark on a journey of endless possibilities.
                Connect, learn, and thrive with Integral University Alumni
                Connect. Let's shape your future together.
              </p>
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
