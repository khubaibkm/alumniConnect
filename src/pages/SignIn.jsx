import React, { useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  signInWithPopup,
} from "firebase/auth";
import {
  auth,
  googleProvider,
  db,
  githubProvider,
} from "../config/firebase.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, doc } from "firebase/firestore";
import "./SignIn.css";
// Declare the variables here
let email, password;

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const handleSignIn = async () => {
  //   if (email === "" || password === "") {
  //     toast.error("Please fill in all the fields");
  //     return;
  //   }

  //   const auth = getAuth();

  //   try {
  //     // Sign in the user with email and password
  //     await signInWithEmailAndPassword(auth, email, password);

  //     // Get the user's UID
  //     const user = auth.currentUser;

  //     // Reference to the Firestore collection
  //     const alumniCollection = collection(db, "alumni");

  //     // Get all documents in the "alumni" collection
  //     const querySnapshot = await getDocs(alumniCollection);

  //     // Loop through each document
  //     querySnapshot.forEach(async (doc) => {
  //       // Check if the firebaseUID matches the current user's UID
  //       if (doc.data().firebaseUID === user.uid) {
  //         // If the user document is found, check the isVerified field
  //         const isVerified = doc.data().isVerified;

  //         if (!isVerified) {
  //           // User is not verified, navigate to under review page
  //           navigate("/undereview");
  //         } else {
  //           // User is verified, proceed with navigation
  //           navigate("/");
  //         }

  //         // Exit the loop once the user document is found
  //         return;
  //       }
  //     });

  //     toast.success("Signed in successfully!");
  //   } catch (error) {
  //     toast.error("Error signing in");
  //     console.error(error);
  //   }
  // };
  const signInWithGitHub = async () => {
    try {
      const auth = getAuth();

      // Sign in with GitHub
      const result = await signInWithPopup(auth, githubProvider);

      // Check if the user's email already exists
      const user = result.user;
      const signInMethods = await fetchSignInMethodsForEmail(auth, user.email);

      if (signInMethods.length === 0) {
        // Email does not exist, sign out the user and prompt to sign up
        await auth.signOut();
        toast.error("You don't have an account yet. Please sign up first.");
        return;
      }

      // Email exists, check Firestore collection for user document
      const alumniCollection = collection(db, "alumni");
      const querySnapshot = await getDocs(alumniCollection);

      // Loop through each document
      querySnapshot.forEach(async (doc) => {
        // Check if the firebaseUID matches the current user's UID
        if (doc.data().firebaseUID === user.uid) {
          // If the user document is found, check the isVerified field
          const isVerified = doc.data().isVerified;

          if (!isVerified) {
            // User is not verified, navigate to under review page
            navigate("/undereview");
          } else {
            // User is verified, proceed with navigation
            navigate("/");
          }

          // Exit the loop once the user document is found
          return;
        }
      });

      toast.success("Signed in successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Error signing in");
    }
  };

  const SignInWithGoogle = async () => {
    try {
      const auth = getAuth();

      // Sign in with Google
      const result = await signInWithPopup(auth, googleProvider);

      // Check if the user's email already exists
      const user = result.user;
      const signInMethods = await fetchSignInMethodsForEmail(auth, user.email);

      if (signInMethods.length === 0) {
        // Email does not exist, sign out the user and prompt to sign up
        await auth.signOut();
        toast.error("You don't have an account yet. Please sign up first.");
        return;
      }

      // Email exists, check Firestore collection for user document
      const alumniCollection = collection(db, "alumni");
      const querySnapshot = await getDocs(alumniCollection);

      // Loop through each document
      querySnapshot.forEach(async (doc) => {
        // Check if the firebaseUID matches the current user's UID
        if (doc.data().firebaseUID === user.uid) {
          // If the user document is found, check the isVerified field
          const isVerified = doc.data().isVerified;

          if (!isVerified) {
            // User is not verified, navigate to under review page
            navigate("/undereview");
          } else {
            // User is verified, proceed with navigation
            navigate("/");
          }

          // Exit the loop once the user document is found
          return;
        }
      });

      toast.success("Signed in successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Error signing in");
    }
  };

  return (
    <div className="container mt-5 p-5">
      <section className="vh-xxl-100 pt-5">
        <div className="container h-100 d-flex px-0 px-sm-4">
          <div className="row justify-content-center align-items-center m-auto">
            <div className="col-12">
              <div className="bg-mode shadow rounded-3 overflow-hidden">
                <div className="row g-0">
                  {/* <!-- Vector Image --> */}
                  <div className="col-lg-6 d-flex align-items-center order-2 order-lg-1">
                    <div className="p-3 p-lg-5">
                      <img className="img-fluid" src="/signin.svg" alt="" />
                    </div>
                    {/* <!-- Divider --> */}
                    <div className="vr opacity-1 d-none d-lg-block"></div>
                  </div>

                  {/* <!-- Information --> */}
                  <div className="col-lg-6 order-1">
                    <div className="p-4 p-sm-7">
                      {/* <!-- Logo --> */}
                      <div className="row">
                        <a>
                          <img
                            className="h-50px mb-4 d-flex p-2"
                            src="/vite.svg"
                            alt="logo"
                          />
                        </a>
                      </div>
                      {/* <!-- Title --> */}
                      <h1 className="mb-2 h2">Welcome back</h1>
                      <a className="h3">SignIn</a>
                      <div className="mt-3">
                        {/* <input
                          className="cred"
                          type="email"
                          placeholder="email"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                          className="cred"
                          type="password"
                          placeholder="password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <br />
                        <button className="signin" onClick={handleSignIn}>
                          SignIn
                        </button> */}
                        <br /> <br />
                        <button
                          className="signin google"
                          onClick={SignInWithGoogle}
                        >
                          <img
                            src="/google.svg"
                            width={30}
                            style={{ marginRight: "5px" }}
                          ></img>
                          Continue with Google
                        </button>
                        <br /> <br />
                        <button
                          className="signin bg-secondary"
                          onClick={signInWithGitHub}
                        >
                          <img
                            src="/github.svg"
                            width={30}
                            style={{ marginRight: "5px" }}
                          ></img>
                          Continue with GitHub
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

export default SignIn;
