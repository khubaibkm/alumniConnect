import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  fetchSignInMethodsForEmail,
  signOut,
} from "firebase/auth";
import { auth, googleProvider, githubProvider } from "../config/firebase.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailSignUp = async () => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = result.user;
      toast.success("User signed up successfully! Fill up the form");
      navigate("/On_boarding_form");
    } catch (error) {
      console.error(error);
      toast.error("Error signing up");
    }
  };

  const handleSocialSignUp = async (provider) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      toast.success("User signed in successfully! Fill up the form");
      navigate("/On_boarding_form");
    } catch (error) {
      console.error(error);
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
