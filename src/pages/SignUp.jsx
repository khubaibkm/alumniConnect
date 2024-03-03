import React, { useState } from "react";
import {
  signInWithPopup,
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import {
  auth,
  db,
  googleProvider,
  githubProvider,
} from "../config/firebase.js";
import "./SignUp.css";
const SignUp = () => {
  const navigate = useNavigate();

  const checkUserExistence = async (email) => {
    try {
      const userEmailDocRef = doc(collection(db, "userEmails"), email);
      const userEmailDoc = await getDoc(userEmailDocRef);

      return userEmailDoc.exists();
    } catch (error) {
      console.error("Error checking user existence:", error);
      return true; // Assume existence to prevent unintentional sign-up
    }
  };

  const handleSocialSignUp = async (provider) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if the user's email exists
      const userExists = await checkUserExistence(user.email);

      if (!userExists) {
        // Add the email to "userEmails" collection
        await setDoc(doc(collection(db, "userEmails"), user.email), {
          exists: true,
        });

        // Proceed with sign up
        toast.success("User signed in successfully! Fill up the form");
        navigate("/On_boarding_form");
      } else {
        // User already exists, display a message and sign out
        toast.info(
          "User with this email already exists. You may want to sign in."
        );

        // Sign out the user
        await auth.signOut();
      }
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error("Error signing up");
    }
  };

  const SignUpWithGoogle = async () => {
    handleSocialSignUp(googleProvider);
  };

  const SignUpWithGitHub = async () => {
    handleSocialSignUp(githubProvider);
  };

  return (
    <div className="container mt-5 py-5">
      <section className="vh-xxl-100 pt-5">
        <div className="container h-100 d-flex px-0 px-sm-4">
          <div className="row justify-content-center align-items-center m-auto">
            <div className="col-12">
              <div className="bg-mode shadow rounded-3 overflow-hidden">
                <div className="row g-0">
                  <div className="col-lg-6 d-flex align-items-center order-2 order-lg-1">
                    <div className="p-3 p-lg-5">
                      <img className="img-fluid" src="/signin.svg" alt="" />
                    </div>
                    <div className="vr opacity-1 d-none d-lg-block"></div>
                  </div>
                  <div className="col-lg-6 order-1">
                    <div className="p-4 p-sm-7">
                      <div className="row mb-5">
                        <a></a>
                      </div>
                      <h2 className="mb-2 text-center">
                        Welcome to Alumni Connect
                      </h2>
                      <h4 className="text-center">Get Started</h4>
                      <div className="mt-3 text-center">
                        <br /> <br />
                        <button
                          className="signup bg-white google"
                          onClick={SignUpWithGoogle}
                        >
                          <img
                            src="/google.svg"
                            width={30}
                            style={{ marginRight: "5px" }}
                          ></img>
                          Sign Up with Google
                        </button>
                        <br /> <br />
                        <button
                          className="signup bg-white"
                          onClick={SignUpWithGitHub}
                        >
                          <img
                            src="/github.svg"
                            width={30}
                            style={{ marginRight: "5px" }}
                          ></img>
                          Sign Up with GitHub
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
