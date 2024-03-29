import React, { useState } from "react";
import { getAuth, signInWithPopup } from "firebase/auth";
import {
  auth,
  googleProvider,
  db,
  githubProvider,
} from "../config/firebase.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import "./SignIn.css";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const signInWithGitHub = async () => {
    try {
      const auth = getAuth();
      const result = await signInWithPopup(auth, githubProvider);

      const user = result.user;
      const userExists = await checkUserExistence(user.email);

      if (!userExists) {
        await auth.signOut();
        toast.info("You don't have an account yet. Please sign up first.");
        navigate("/signup");
        return;
      }

      const alumniCollection = collection(db, "alumni");
      const querySnapshot = await getDocs(alumniCollection);

      let userFound = false;

      for (const doc of querySnapshot.docs) {
        if (doc.data().email === user.email) {
          userFound = true;

          const isVerified = doc.data().isVerified;

          if (!isVerified) {
            navigate("/undereview");
            return;
          }

          navigate("/");
          toast.success("Signed in successfully!");
          return;
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
      const userExists = await checkUserExistence(user.email);

      if (!userExists) {
        await auth.signOut();
        toast.info("You don't have an account yet. Please sign up first.");
        navigate("/signup");
        return;
      }

      const alumniCollection = collection(db, "alumni");
      const querySnapshot = await getDocs(alumniCollection);

      let userFound = false;

      for (const doc of querySnapshot.docs) {
        if (doc.data().email === user.email) {
          userFound = true;

          const isVerified = doc.data().isVerified;

          if (!isVerified) {
            navigate("/undereview");
            return;
          }

          navigate("/");
          toast.success("Signed in successfully!");
          return;
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

  return (
    <div className="container mt-5 py-5">
      <section className="vh-xxl-100 pt-5">
        <div className="container h-100 d-flex px-0 px-sm-4">
          <div className="row justify-content-center align-items-center m-auto">
            <div className="col-12">
              <div className="bg-mode shadow rounded-3 overflow-hidden">
                <div className="row g-0">
                  {/* Vector Image */}
                  <div className="col-lg-6 d-flex align-items-center order-2 order-lg-1">
                    <div className="p-3 p-lg-5">
                      <img className="img-fluid" src="/signin.svg" alt="" />
                    </div>
                    {/* Divider */}
                    <div className="vr opacity-1 d-none d-lg-block"></div>
                  </div>

                  {/* Information */}
                  <div className="col-lg-6 order-1">
                    <div className="p-4 p-sm-7">
                      {/* Logo */}
                      <div className="row mb-5">
                        <a></a>
                      </div>
                      {/* Title */}
                      <h2 className="mb-2 text-center">Welcome back</h2>
                      <h4 className="text-center">Sign In</h4>
                      <div className="mt-3 text-center">
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
