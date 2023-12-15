import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  fetchSignInMethodsForEmail,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, googleProvider } from "../config/firebase.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    if (email === "" || password === "") {
      toast.error("Please fill all the fields");
      return;
    }

    try {
      // Check if the email is already registered
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);

      if (signInMethods.length > 0) {
        // Email is already registered, show an error message
        toast.error("Email is already registered. Please sign in.");
        return;
      }

      // If not registered, proceed with user creation
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/On_boarding_form");
      toast.success("User registered successfully!");
    } catch (error) {
      toast.error("Error signing up");
      console.error(error);
    }
  };

  useEffect(() => {
    const checkGoogleSignIn = async () => {
      try {
        const user = await new Promise((resolve, reject) => {
          const unsubscribe = onAuthStateChanged(auth, (user) => {
            resolve(user);
            unsubscribe();
          });
        });

        if (user) {
          if (user.email) {
            const userSignInMethods = await fetchSignInMethodsForEmail(
              auth,
              user.email
            );
            if (userSignInMethods.length > 0) {
              // Email is already registered, show an error message
              toast.error("Email is already registered. Please sign in.");
            } else {
              // User is not registered, you can enable the button here if needed
            }
          } else {
            toast.error("User email is not available.");
          }
        }
      } catch (error) {
        console.error(error);
        toast.error("Error checking email registration");
      }
    };

    checkGoogleSignIn();
  }, []); // Empty dependency array ensures that this runs only once when the component mounts

  const SignUpWithGoogle = async () => {
    try {
      // Proceed with Google sign-in using popup
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Check if the email associated with Google account is already registered
      const userSignInMethods = await fetchSignInMethodsForEmail(
        auth,
        user.email
      );

      if (userSignInMethods.length > 0) {
        // Email is already registered, show an error message
        toast.error("Email is already registered. Please sign in.");
        navigate("/signin");
      } else {
        // If email is not registered, proceed with your logic
        navigate("/On_boarding_form");
        toast.success("User signed in successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error signing up");
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
                      <h1 className="mb-2 h2">Welcome to Alumni Connect</h1>
                      <a className="h3">Get Started</a>
                      <div className="mt-3">
                        <input
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
                        <button className="signup" onClick={handleSignUp}>
                          SignUp
                        </button>
                        <br /> <br />
                        <button
                          className="signup google"
                          onClick={SignUpWithGoogle}
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

export default SignUp;
