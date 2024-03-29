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

  const hasFilledOutForm = isSignedIn && isVerified;

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
  window.scrollTo(0, 0);
  return (
    <nav
      className={`navbar navbar-expand-lg  fixed-top shadow-sm ${
        isNavbarOpen ? "navbar-open" : ""
      }`}
    >
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <img
            className="logoo"
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
                className="nav-link mt-1"
                aria-current="page"
                onClick={() => {
                  () => window.scrollTo(0, 0);
                }}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/profilelist"
                className="nav-link mt-1"
                onClick={() => closeNavbar()}
              >
                View Profiles
              </Link>
            </li>
            <li className="nav-item">
              {isMyProfileVisible && (
                <Link
                  to="/profile"
                  className="nav-link mt-1"
                  onClick={() => closeNavbar()}
                >
                  My Profile
                </Link>
              )}
            </li>
            <li signn className="nav-item">
              {isSignedIn ? (
                <a
                  className="signt nav-link bg-secondary rounded text-white px-3 py-2 mx-2  "
                  style={{
                    display: "inline-block",
                    padding: "0.5rem",
                    marginLeft: "0", // Adjust margin as needed
                    borderRadius: "5px",
                    backgroundColor: "#6c757d",
                    textDecoration: "none",
                    color: "white",
                  }}
                  href="#"
                  onClick={handleSignOut}
                >
                  Logout
                </a>
              ) : (
                <Link
                  to="/signin"
                  className={`signn nav-link bg-primary rounded text-white px-3 py-2 mx-2  d-lg-inline-block mt-1`}
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
                  className="signn1  nav-link bg-primary rounded text-white px-3 py-2 mx-2 button-animated mt-1"
                  onClick={() => closeNavbar()}
                >
                  Alumni Registration
                </Link>
              )}
            </li>
            <li className="nav-item">
              {isSignedIn && !hasFilledOutForm && (
                <Link
                  to="/on_boarding_form"
                  className="signn2 nav-link bg-primary rounded text-white px-3 py-2 mx-2 button-animated"
                  onClick={() => closeNavbar()}
                >
                  onboarding form
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
