import React, { useEffect } from "react";
import "./HomeBanner.css";
import { Link } from "react-router-dom";
import { gsap } from "gsap";

export const HomeBanner = () => {
  useEffect(() => {
    const ease = "power3.out";

    const startAnimation = () => {
      const tl = gsap.timeline({ defaults: { ease } });

      tl.from(".banner", { opacity: 0, x: 0, y: 200, duration: 1 })
        .from(".display-4", { opacity: 0, y: 100, duration: 1 })
        .from(".lead", { opacity: 0, y: 100, duration: 1 })
        .from(".btn", { opacity: 0, x: -100, duration: 1 })
        .to(".banner, .display-4, .lead, .btn", {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 1,
        });
    };

    const hoverEffect = () => {
      gsap.to(".btn", { scale: 1.2, duration: 0.4 });
    };

    const unhoverEffect = () => {
      gsap.to(".btn", { scale: 1, duration: 0.4 });
    };

    window.addEventListener("load", startAnimation);
    document.querySelector(".btn").addEventListener("mouseenter", hoverEffect);
    document
      .querySelector(".btn")
      .addEventListener("mouseleave", unhoverEffect);

    return () => {
      window.removeEventListener("load", startAnimation);
      document
        .querySelector(".btn")
        .removeEventListener("mouseenter", hoverEffect);
      document
        .querySelector(".btn")
        .removeEventListener("mouseleave", unhoverEffect);
    };
  }, []);

  return (
    <section className="mt-5 p-5">
      <div className="banner">
        <div className="container">
          <div className="row ">
            <div
              className="col-md-12"
              style={{ textAlign: "left", marginBottom: "15rem" }}
            >
              <h1 className="display-4">
                Welcome to <span className="textstyle">AlumniConnect</span>
              </h1>
              <p className="lead">Where connections shape your future.</p>
              <Link to="./signup" className="btn btn-primary btn-lg">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
