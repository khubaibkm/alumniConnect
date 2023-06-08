import React from "react";
import { HomeBanner } from "../components/HomeBanner";
import "../pages/HomePage.css";

const HomePage = () => {
  return (
    <div>
      <HomeBanner />
      <section className="content-inner bg-light position-relative overflow-hidden p-2">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <img src="/job_01.png" alt="Job" className="img-fluid" />
            </div>
            <div className="col-lg-6">
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
      <section className="content-inner overflow-hidden position-relative" style={{ minHeight: "100vh" }}>
        <div className="container">
          <div className="section-head text-center">
            <h6
              className="text wow fadeInUp"
              data-wow-delay="0.6s"
              style={{
                visibility: "visible",
                animationDelay: "0.6s",
                animationName: "fadeInUp",
              }}
            >
              Working Process
            </h6>
            <h2
              className="title wow fadeInUp"
              data-wow-delay="0.8s"
              style={{
                visibility: "visible",
                animationDelay: "0.8s",
                animationName: "fadeInUp",
              }}
            >
              How It Work
            </h2>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6 m-b30">
              <div
                className="icon-bx-wraper style-1 bg-clr-sky wow bounceInLeft"
                data-wow-delay="1.2s"
                style={{
                  visibility: "visible",
                  animationDelay: "1.2s",
                  animationName: "bounceInLeft",
                }}
              >
                <div className="icon-media">
                  <img src="/vite.svg" alt="image" className="rounded" />
                </div>
                <div className="icon-content">
                  <h4 className="title">Regiter Your Account</h4>
                  <p className="text">
                    Get tailored job recommendations based on your preferences
                    and skills by signing up today
                  </p>
                </div>
                <h3 className="count">01</h3>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 m-b30">
              <div
                className="icon-bx-wraper style-1 bg-clr-green wow bounceInRight"
                data-wow-delay="1.2s"
                style={{
                  visibility: "visible",
                  animationDelay: "1.2s",
                  animationName: "bounceInRight",
                }}
              >
                <div className="icon-media">
                  <img src="/vite.svg" alt="image" className="rounded" />
                </div>
                <div className="icon-content">
                  <h4 className="title">Upload Your Resume</h4>
                  <p className="text">
                    Showcase your qualifications and expertise by uploading your
                    resume.
                  </p>
                </div>
                <h3 className="count">02</h3>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 m-b30">
              <div
                className="icon-bx-wraper style-1 bg-clr-pink wow bounceInUp"
                data-wow-delay="1.0s"
                style={{
                  visibility: "visible",
                  animationDelay: "1s",
                  animationName: "bounceInUp",
                }}
              >
                <div className="icon-media">
                  <img src="/vite.svg" alt="image" className="rounded" />
                </div>
                <div className="icon-content">
                  <h4 className="title">Apply Your Dream Job</h4>
                  <p className="text">
                    Take the first step towards pursuing your passion by
                    applying for your dream job today.
                  </p>
                </div>
                <h3 className="count">03</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
