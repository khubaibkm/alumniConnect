import React, { useState, useEffect } from "react";
import { auth } from "../config/firebase.js";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../config/firebase.js";
import "./Navbar.css";

export const Navbar = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();

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
          } else {
            setIsVerified(false);
          }
        } catch (error) {
          console.error("Error fetching user document:", error);
        }
      } else {
        setIsVerified(false);
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
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <img style={{marginLeft:"0.1rem"}} width={"225px"} src="/logo.svg" alt="logo-alumniConnect" />
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
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link" aria-current="page">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/profilelist" className="nav-link">
                View Profiles
              </Link>
            </li>


            <li className="nav-item">
              {isVerified && (
                <Link to="/profile" className="nav-link">
                  My Profile
                </Link>
              )}
            </li>
            <li className="nav-item">
              {isSignedIn && (
                <Link to="/On_boarding_form" className="nav-link">
                  Onboard Form
                </Link>
              )}
            </li>
            <li className="nav-item">
              {isSignedIn ? (
                <a
                  className="nav-link bg-primary rounded text-white px-3 py-2 mx-2 "
                  href="#"
                  onClick={handleSignOut}
                >
                  Logout
                </a>
              ) : (
                <Link to="/signin" className="nav-link button-animated mx-2 ">
                  Alumni Login
                </Link>
              )}
            </li>
            <li className="nav-item">
              {isSignedIn ? null : (
                <Link to="/signup" className="nav-link button-animated">
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
