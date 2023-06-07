import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, googleProvider } from "../config/firebase.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
      toast.success("SignedIn successfully!");
    } catch (error) {
      toast.error("Error signing in");
      console.log(error);
    }
  };
  const SignInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
      toast.success("SignedIn successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Error signing in");
    }
  };
  const signingOut = async () => {
    try {
      await signOut(auth);
      navigate("/signup");
      toast.success("You are now Logged Out");
    } catch (err) {
      toast.error("Error signing in");
    }
  };
  return (
    <div className="container">
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
                        <input
                          className="cred"
                          type="text"
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
                        </button>
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
