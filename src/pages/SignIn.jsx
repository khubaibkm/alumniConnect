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
      const result = await signInWithPopup(auth, githubProvider);

      const user = result.user;
      const signInMethods = await fetchSignInMethodsForEmail(auth, user.email);

      if (signInMethods.length === 0) {
        await auth.signOut();
        toast.error("You don't have an account yet. Please sign up first.");
        return;
      }

      const alumniCollection = collection(db, "alumni");
      const querySnapshot = await getDocs(alumniCollection);

      let userFound = false;

      for (const doc of querySnapshot.docs) {
        if (doc.data().firebaseUID === user.uid) {
          userFound = true;

          const isVerified = doc.data().isVerified;
          const onboardingData = doc.data().onboardingData;

          if (!isVerified) {
            navigate("/undereview");
            return;
          }
          if (isVerified) {
            toast.success("Signed in successfully!");
            navigate("/");

            return;
          } else {
            navigate("/On_boarding_form");
          }
          break;
        }
      }

      if (!userFound) {
        navigate("/On_boarding_form");
      }

      toast.success("Signed in successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Error signing in");
    }
  };

  const SignInWithGoogle = async () => {
    try {
      const auth = getAuth();
      const result = await signInWithPopup(auth, googleProvider);

      const user = result.user;
      const signInMethods = await fetchSignInMethodsForEmail(auth, user.email);

      if (signInMethods.length === 0) {
        await auth.signOut();
        toast.error("You don't have an account yet. Please sign up first.");
        return;
      }

      const alumniCollection = collection(db, "alumni");
      const querySnapshot = await getDocs(alumniCollection);

      let userFound = false;

      for (const doc of querySnapshot.docs) {
        if (doc.data().firebaseUID === user.uid) {
          userFound = true;

          const isVerified = doc.data().isVerified;
          const onboardingData = doc.data().onboardingData;

          if (!isVerified) {
            navigate("/undereview");
            return;
          }
          if (isVerified) {
            navigate("/");
            return;
          } else {
            navigate("/On_boarding_form");
          }

          break; // Exit the loop once the user document is found
        }
      }

      if (!userFound) {
        console.log(userFound);
        // User document not found, navigate to onboarding form
        navigate("/On_boarding_form");
      }

      toast.success("Signed in successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Error signing in");
    }
  };

  return (
    <div className="container mt-5 py-5">
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
                      <div className="row mb-5">
                        <a></a>
                      </div>
                      {/* <!-- Title --> */}
                      <h2 className="mb-2 text-center">Welcome back</h2>
                      <h4 className="text-center">Sign In</h4>
                      <div className="mt-3 text-center">
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
                          className="signin bg-white google"
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
                          className="signin bg-white"
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
