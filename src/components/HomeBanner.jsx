import React, { useEffect, useState } from "react";
import "./HomeBanner.css";
import { Link, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { auth } from "../config/firebase.js";

export const HomeBanner = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkAuthStatus = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  };

  const redirect = () => {
    if (isLoggedIn) {
      navigate("/profilelist");
    } else {
      navigate("/signin");
    }
  };

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

    checkAuthStatus(); // Call checkAuthStatus to set initial authentication status

    return () => {
      window.removeEventListener("load", startAnimation);
      document
        .querySelector(".btn")
        .removeEventListener("mouseenter", hoverEffect);
      document
        .querySelector(".btn")
        .removeEventListener("mouseleave", unhoverEffect);
    };
  }, [isLoggedIn, navigate]);

  return (
    <section className="mt-2">
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
              <button className="btn btn-primary btn-lg" onClick={redirect}>
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
