import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import SignUp from "./pages/SignUp";
import HomePage from "./pages/HomePage";
import SignIn from "./pages/SignIn";
import OnBoardingForm from "./components/OnBoardingForm";
import { Navbar } from "./components/Navbar";
import Protected from "./components/services/Protected";
import Footer from "./components/Footer";
import ScrollToTop from "react-scroll-to-top";
import ProfileList from "./pages/ProfileList";
import MyProfile from "./pages/MyProfile";
import UnderReview from "./pages/UnderReview";
import AdminDashboard from "./pages/AdminDashboard";
import UnauthorizedError from "./pages/UnauthorizedError";
import Error from "./pages/Error"; // Import the Error component
import Team from "./pages/Team";

function App() {
  return (
    <>
      <ScrollToTop
        className="scrollToTop"
        smooth
        style={{ borderRadius: "50%", padding: "20px 42px 40px 16px" }}
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
              <Route
                path="/profile"
                element={<Protected Component={MyProfile} />}
              />
              <Route path="/undereview" element={<UnderReview />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/error" element={<UnauthorizedError />} />
              <Route path="/team" element={<Team />} />

              {/* Add other routes for your pages */}

              {/* Fallback route for any other paths */}
              <Route path="*" element={<Error />} />
            </Routes>
            <Footer />
          </Router>
        </React.Fragment>
      </div>
    </>
  );
}

export default App;
