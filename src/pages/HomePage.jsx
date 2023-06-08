import React from "react";
import { HomeBanner } from "../components/HomeBanner";
import "../pages/HomePage.css";
const HomePage = () => {
  return (
    <div>
      <HomeBanner />
      <section className="content-inner bg-light position-relative overflow-hidden  p-2">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 m-b30 ">
              <div className="dz-media style-1">
                <div className="row">
                  <img src="/job_01.png"></img>
                </div>
                <span
                  className="text wow bounceInLeft animated"
                  data-wow-delay="0.8s"
                  style={{
                    visibility: "visible",
                    animationDelay: "0.8s",
                    animationName: "dZwobble2",
                  }}
                ></span>
              </div>
            </div>
            <div className="col-lg-6 m-b30 ">
              <div className="dz-contant style-1">
                <div className="section-head">
                  <h6
                    className="text wow fadeInUp text-start"
                    data-wow-delay="1.0s"
                    style={{
                      visibility: "visible",
                      animationDelay: "1s",
                      animationName: "fadeInUp",
                    }}
                  >
                    About Us
                  </h6>

                  <h2
                    className="title wow fadeInUp text-center"
                    data-wow-delay="1.2s"
                    style={{
                      visibility: "visible",
                      animationDelay: "1.2s",
                      animationName: "fadeInUp",
                    }}
                  >
                    Welcome to Alumni Connect! -Where connections shape your
                    future.
                  </h2>
                </div>

                <p>
                  At Alumni Connect, we understand the power of connections. We
                  know that finding and connecting with alumni can open doors to
                  new opportunities, guidance, and inspiration. That's why we've
                  created a platform that makes it easy for you to connect with
                  the alumni of Integral University, Lucknow.
                  <br /> <br />
                  Say goodbye to the struggle of searching for alumni on
                  different platforms. With Alumni Connect, you can effortlessly
                  find and engage with alumni working in various companies and
                  industries, right here in one place.
                  <br /> <br />
                  Join us today and embark on a journey of endless
                  possibilities. Connect, learn, and thrive with Integral
                  University Alumni Connect. Let's shape your future together.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
