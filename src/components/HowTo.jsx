import React from "react";

const HowTo = () => {
  return (
    <div>
      <section className="content-inner overflow-hidden position-relative mb-5 py-5">
        <div className="container">
          <div className="section-head text-center mb-4">
            <h2 className="text wow fadeInUp" data-wow-delay="0.6s">
              Registration Process - (for Alumni)
            </h2>
            <h4
              className="title wow fadeInUp text-primary"
              data-wow-delay="0.8s"
            >
              How It Works
            </h4>
          </div>
          <div className="row justify-content-center">
            {[
              {
                title: "Register Your Account !!",
                step: "01",
                bgColor: "bg-clr-sky",
              },
              {
                title: "Fill up the Onboarding Form",
                step: "02",
                bgColor: "bg-clr-green",
              },
              {
                title: "Wait for your profile to get verified",
                step: "03",
                bgColor: "bg-clr-pink",
              },
              {
                title: "Your profile is verified, and you're listed",
                step: "04",
                bgColor: "bg-clr-sky",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`col-lg-3 col-md-6 mb-3 wow bounceIn${
                  index % 2 === 0 ? "Left" : "Right"
                }`}
                data-wow-delay={`1.${index}s`}
              >
                <div className={`icon-bx-wraper style-1 ${item.bgColor}`}>
                  <div className="icon-media">
                    <img
                      src="/favicon-removebg-preview.png"
                      width={"60px"}
                      alt="image"
                      className="rounded"
                    />
                  </div>
                  <div
                    className="icon-content mt-5"
                    style={{ height: "100px" }}
                  >
                    <h4
                      className="title"
                      style={{ textAlign: "left", fontSize: "20px" }}
                    >
                      {item.title}
                    </h4>
                    <p className="text"></p>
                  </div>
                  <h3 className="count">{item.step}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowTo;
