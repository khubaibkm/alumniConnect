import React, { useState, useEffect } from "react";
import { db, auth } from "../config/firebase";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useNavigate } from "react-router";

const AdminDashboard = () => {
  const [unverifiedUsers, setUnverifiedUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Admin UID
  const adminUID = "AqQRH8DareOsa7FefRRw71oOqx03";

  const fetchUnverifiedUsers = async () => {
    const alumniCollection = collection(db, "alumni");
    const querySnapshot = await getDocs(alumniCollection);

    const unverifiedUsersData = [];
    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      if (!userData.isVerified) {
        unverifiedUsersData.push({ id: doc.id, ...userData });
      }
    });

    setUnverifiedUsers(unverifiedUsersData);
  };

  const handleSignIn = async () => {
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      navigate("/error");
      handleSignOut();
    }
  };

  const handleSignOut = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleApprove = async (userId) => {
    try {
      // Add logic to update user data and set isVerified to true
      const userDocRef = doc(db, "alumni", userId);
      await updateDoc(userDocRef, { isVerified: true });

      // Fetch updated unverified users
      fetchUnverifiedUsers();
    } catch (error) {
      console.error("Error approving user:", error);
    }
  };

  const handleDisapprove = async (userId) => {
    try {
      // Add logic to delete user data
      const userDocRef = doc(db, "alumni", userId);
      await deleteDoc(userDocRef);

      // Fetch updated unverified users
      fetchUnverifiedUsers();
    } catch (error) {
      console.error("Error disapproving user:", error);
    }
  };

  useEffect(() => {
    const authListener = auth.onAuthStateChanged((user) => {
      setUser(user);

      // Check if the user is an admin based on UID
      if (user && user.uid !== adminUID) {
        // Redirect to an error page or display an error message
        // Automatically sign out on component mount
        navigate("/error");
        handleSignOut();
      }
    });

    // Automatically sign out on component mount
    handleSignOut();

    fetchUnverifiedUsers();

    return () => {
      authListener(); // Unsubscribe from the auth listener when the component unmounts
    };
  }, []); // Empty dependency array to run the effect only once when the component mounts

  if (!user) {
    return (
      <div className="container p-5">
        <div className="card w-50 mx-auto sm-p-4 m-5">
          <h2 className="mb-4">Sign In</h2>
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" onClick={handleSignIn}>
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Admin Dashboard</h2>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Graduation Year</th>
            <th>Major</th>
            <th>Current Company</th>
            <th>LinkedIn ID</th>
            <th>PFP</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {unverifiedUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.graduationYear}</td>
              <td>{user.major}</td>
              <td>{user.currentCompany}</td>
              <td>{user.linkedin}</td>
              <td>
                <img src={user.profileImageUrl} />
              </td>
              <td>
                <button
                  className="btn btn-success me-2"
                  onClick={() => handleApprove(user.id)}
                >
                  Approve
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDisapprove(user.id)}
                >
                  Disapprove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
