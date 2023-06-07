import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import SignUp from "./pages/signUp";
import HomePage from "./pages/homePage";
import SignIn from "./pages/SignIn";

function App() {
  return (
    <div className="App">
      <ToastContainer />

      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          {/* Add other routes for your pages */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
