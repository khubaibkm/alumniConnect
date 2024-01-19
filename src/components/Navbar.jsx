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
          // Reference to the Firestore collection
          const alumniCollection = collection(db, "alumni");

          // Get the user document from Firestore
          const querySnapshot = await getDocs(
            query(alumniCollection, where("firebaseUID", "==", user.uid))
          );

          // Check if the user document exists
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
      // Redirect to the SignIn page after sign-out
      navigate("/signin");
    } catch (err) {
      console.log(err);
    } finally {
      // Update the state only after the operation is complete
      setIsSignedIn(false);
      setIsVerified(false);
      setIsMyProfileVisible(false);
    }
  };

  // Function to close the navbar menu on mobile screens
  const closeNavbar = () => {
    const navbarToggler = document.getElementById("navbarToggler");
    if (navbarToggler.classList.contains("show")) {
      navbarToggler.click();
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow"
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
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          id="navbarToggler"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
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
            {/* Add similar onClick handlers for other navigation links */}
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
          </ul>
        </div>
      </div>
    </nav>
  );
};
