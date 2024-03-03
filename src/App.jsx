import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { LineWave } from "react-loader-spinner";
import "react-toastify/dist/ReactToastify.css";
import { Navbar } from "./components/Navbar";
import Protected from "./components/services/Protected";
import Footer from "./components/Footer";
import Error from "./pages/Error";
import { Placeholder } from "react-bootstrap";

import "./App.css";
import ScrollToTop from "react-scroll-to-top";

// Lazy load other components
const SignUp = lazy(() => import("./pages/SignUp"));
const HomePage = lazy(() => import("./pages/HomePage"));
const SignIn = lazy(() => import("./pages/SignIn"));
const OnBoardingForm = lazy(() => import("./components/OnBoardingForm"));
const ProfileList = lazy(() => import("./pages/ProfileList"));
const MyProfile = lazy(() => import("./pages/MyProfile"));
const UnderReview = lazy(() => import("./pages/UnderReview"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const UnauthorizedError = lazy(() => import("./pages/UnauthorizedError"));
const Team = lazy(() => import("./pages/Team"));
const Test = lazy(() => import("./pages/Test"));

const App = () => {
  return (
    <>
    <ScrollToTop
        className="scrollToTop"
        smooth
        style={{ borderRadius: "50%", padding: "20px 42px 40px 16px" }}
      />
    <div className="App">
      <ToastContainer />

      <Router>
        <Suspense
          fallback={
            <LineWave
              height={300}
              width={300}
              radius={5}
              color="#006aff"
              ariaLabel="ball-triangle-loading"
              wrapperStyle={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                position: "fixed",
                top: 0,
                left: 0,
                right: -120,
                bottom: 0,
                background: "rgba(255, 255, 255)",
              }}
              wrapperClass=""
              visible={true}
            />
          }
        >
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route
              path="/On_boarding_form"
              element={<Protected Component={OnBoardingForm} />}
            />
            <Route path="/profilelist" element={<ProfileList />} />
            <Route
              path="/profile"
              element={<Protected Component={MyProfile} />}
            />
            <Route
              path="/undereview"
              element={<Protected Component={UnderReview} />}
            />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/error" element={<UnauthorizedError />} />
            <Route path="/team" element={<Team />} />
            <Route path="/test" element={<Test />} />
            {/* Add other routes for your pages */}
            {/* Fallback route for any other paths */}
            <Route path="*" element={<Error />} />
          </Routes>
        </Suspense>
        <Footer />
      </Router>
    </div>
    </>
  );
};

export default App;
