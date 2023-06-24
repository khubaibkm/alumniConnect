import React from "react";
import "./HomeBanner.css";
import { Link } from "react-router-dom";

export const HomeBanner = () => {
  return (
    <>
      <section className="mt-5 p-5">
        <div className="banner">
          <div className="container">
            <div className="row ">
              <div
                className="col-md-12"
                style={{ textAlign: "left", marginBottom: "15rem" }}
              >
                <h1 className="display-4">Welcome to AlumniConnect</h1>
                <p className="lead">Where connections shape your future.</p>
                <Link to="./signup" className="btn btn-primary btn-lg">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeBanner;
