import "./Navbar.css";
import React, { useState, useEffect } from "react";
import { auth } from "../config/firebase.js";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsSignedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      window.location.href = "/signin"; // Redirect to the SignIn page
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top ">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand" style={{ color: "#4885ed" }}>
          Alumni Connect
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ">
            <li className="nav-item">
              <Link to="/" className="nav-link" aria-current="page">
                Home
              </Link>
            </li>
            <li className="nav-item">
              {isSignedIn ? (
                <a className="nav-link" href="#" onClick={handleSignOut}>
                  Logout
                </a>
              ) : (
                <Link to="/signin" className="nav-link">
                  SignIn
                </Link>
              )}
            </li>
            <li className="nav-item">
              <Link to="/signup" className="nav-link">
                SignUp
              </Link>
            </li>

            {/* //uncomment this after completing the onboarding form */}

            {/* <li className="nav-item">
              {isSignedIn && (
                <Link to="/On_boarding_form" className="nav-link">
                  Onboard Form
                </Link>
              )}
            </li> */}

            <li className="nav-item">
              <Link to="/On_boarding_form" className="nav-link">
                Onboard Form
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
