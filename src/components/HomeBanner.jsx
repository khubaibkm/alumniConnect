import React from "react";
import "./HomeBanner.css";
import { Link } from "react-router-dom";


export const HomeBanner = () => {
  return(
    <div className="banner">
    <div className="container">
      <div className="row">
        <div className="col-md-12" style={{ textAlign: "left" }}>
          <h1 className="display-4">Welcome to AlumniConnect</h1>
          <p className="lead">Connect with your fellow alumni and stay connected.</p>
          <Link to="./signup" className="btn btn-primary btn-lg">
          Get Started
        </Link>
        </div>
      </div>
    </div>
  </div>
  )     
};

export default HomeBanner;

