import "./Navbar.css";
import React, { useState, useEffect } from "react";
import { auth } from "../config/firebase.js";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

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
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container-fluid">
        <a style={{ color: "#5143d9" }} className="navbar-brand" href="/">
          Alumni Connect
        </a>
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
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              {isSignedIn ? (
                <a className="nav-link" href="#" onClick={handleSignOut}>
                  Logout
                </a>
              ) : (
                <a className="nav-link" href="/signin">
                  SignIn
                </a>
              )}
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/signup">
                SignUp
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/On_boarding_form">
                Onboard Form
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
