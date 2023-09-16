import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import SignUp from "./pages/signUp";
import HomePage from "./pages/homePage";
import SignIn from "./pages/SignIn";
import OnBoardingForm from "./components/OnBoardingForm";
import { Navbar } from "./components/Navbar";
import Protected from "./components/services/Protected";
import Footer from "./components/Footer";
import ScrollToTop from "react-scroll-to-top";
import ProfileList from "./pages/ProfileList";

function App() {
  return (
    <>
      {" "}
      <ScrollToTop
        className=""
        smooth
        style={{ paddingRight: "45px", borderRadius: "20px" }}
      />
      <div className="App">
        <React.Fragment>
          <ToastContainer />

          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route
                path="/On_boarding_form"
                element={<Protected Component={OnBoardingForm} />}
              />
              <Route path="/homebanner" element={<OnBoardingForm />} />
              <Route path="/profilelist" element={<ProfileList />} />
              {/* Add other routes for your pages */}
            </Routes>
            <Footer />
          </Router>
        </React.Fragment>
      </div>
    </>
  );
}

export default App;
