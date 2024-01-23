import React, { useState, useEffect } from "react";
import { auth } from "../config/firebase.js";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../config/firebase.js";
import "./Navbar.css";

export const Navbar = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isMyProfileVisible, setIsMyProfileVisible] = useState(false);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setIsSignedIn(!!user);

      if (user) {
        try {
          const alumniCollection = collection(db, "alumni");
          const querySnapshot = await getDocs(
            query(alumniCollection, where("firebaseUID", "==", user.uid))
          );

          if (querySnapshot.size > 0) {
            const userData = querySnapshot.docs[0].data();
            setIsVerified(userData.isVerified || false);
            setIsMyProfileVisible(true);
          } else {
            setIsVerified(false);
            setIsMyProfileVisible(false);
          }
        } catch (error) {
          console.error("Error fetching user document:", error);
        }
      } else {
        setIsVerified(false);
        setIsMyProfileVisible(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/signin");
    } catch (err) {
      console.log(err);
    } finally {
      setIsSignedIn(false);
      setIsVerified(false);
      setIsMyProfileVisible(false);
      setIsNavbarOpen(false); // Close the navbar after sign-out
    }
  };

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const closeNavbar = () => {
    setIsNavbarOpen(false);
  };

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-light bg-light fixed-top shadow ${
        isNavbarOpen ? "navbar-open" : ""
      }`}
      onClick={() => window.scrollTo(0, 0)}
    >
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <img
            style={{ marginLeft: "0.1rem" }}
            width={"225px"}
            src="/logo.svg"
            alt="logo-alumniConnect"
          />
        </Link>
        <button
          className={`navbar-toggler ${isNavbarOpen ? "collapsed" : ""}`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          id="navbarToggler"
          onClick={toggleNavbar}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse justify-content-end ${
            isNavbarOpen ? "show" : ""
          }`}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                to="/"
                className="nav-link"
                aria-current="page"
                onClick={() => {
                  window.scrollTo(0, 0);
                  closeNavbar();
                }}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/profilelist"
                className="nav-link"
                onClick={() => closeNavbar()}
              >
                View Profiles
              </Link>
            </li>
            <li className="nav-item">
              {isMyProfileVisible && (
                <Link
                  to="/profile"
                  className="nav-link"
                  onClick={() => closeNavbar()}
                >
                  My Profile
                </Link>
              )}
            </li>
            <li className="nav-item">
              {isSignedIn ? (
                <a
                  className="nav-link bg-primary rounded text-white px-3 py-2 mx-2 button-animated"
                  href="#"
                  onClick={handleSignOut}
                >
                  Logout
                </a>
              ) : (
                <Link
                  to="/signin"
                  className="nav-link bg-primary rounded text-white px-3 py-2 mx-2 button-animated"
                  onClick={() => closeNavbar()}
                >
                  Alumni Login
                </Link>
              )}
            </li>
            <li className="nav-item">
              {isSignedIn ? null : (
                <Link
                  to="/signup"
                  className="nav-link bg-primary rounded text-white px-3 py-2 mx-2 button-animated"
                  onClick={() => closeNavbar()}
                >
                  Alumni Registration
                </Link>
              )}
            </li>
            <li className="nav-item">
              {isSignedIn ? (
                <Link
                  to="/on_boarding_form"
                  className="nav-link bg-primary rounded text-white px-3 py-2 mx-2 button-animated"
                  onClick={() => closeNavbar()}
                >
                  onboarding form
                </Link>
              ) : null}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
