import React from "react";

const HowTo = () => {
  return (
    <div>
      <section
        className="content-inner overflow-hidden position-relative mb-5 py-5"
        // style={{ minHeight: "100vh" }}
      >
        <div className="container">
          <div className="section-head text-center mb-4">
            <h2
              className="text wow fadeInUp"
              data-wow-delay="0.6s"
              style={{
                visibility: "visible",
                animationDelay: "0.6s",
                animationName: "fadeInUp",
              }}
            >
              Registration Process - (for Alumni)
            </h2>
            <h4
              className="title wow fadeInUp"
              data-wow-delay="0.8s"
              style={{
                visibility: "visible",
                animationDelay: "0.8s",
                animationName: "fadeInUp",
              }}
            >
              How It Works
            </h4>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-3 col-md-6 mb-3">
              {/* Card 1 */}
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
                <div className="icon-content mt-5" style={{ height: "100px" }}>
                  {/* Set a fixed height for the content */}
                  <h4
                    className="title"
                    style={{ textAlign: "left", fontSize: "20px" }}
                  >
                    Register Your Account !!{" "}
                  </h4>
                  <p className="text"></p>
                </div>
                <h3 className="count">01</h3>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 mb-3">
              {/* Card 2 */}
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
                <div className="icon-content mt-5" style={{ height: "100px" }}>
                  <h4
                    className="title"
                    style={{ textAlign: "left", fontSize: "20px" }}
                  >
                    Fill up the Onboarding Form
                  </h4>
                  <p className="text"></p>
                </div>
                <h3 className="count">02</h3>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 mb-3">
              {/* Card 3 */}
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
                <div className="icon-content mt-5" style={{ height: "100px" }}>
                  <h4
                    className="title"
                    style={{ textAlign: "left", fontSize: "20px" }}
                  >
                    Wait for your profile to get verified
                  </h4>
                  <p className="text"></p>
                </div>
                <h3 className="count ">03</h3>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 mb-3">
              <div
                className="icon-bx-wraper style-1 bg-clr-sky wow  bounceInRight"
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
                <div className="icon-content mt-5" style={{ height: "100px" }}>
                  <h4
                    className="title"
                    style={{ textAlign: "left", fontSize: "20px" }}
                  >
                    One's your profile is verified by admin you will be listed
                    on the website
                  </h4>
                  <p className="text"></p>
                </div>
                <h3 className="count ">04</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowTo;
