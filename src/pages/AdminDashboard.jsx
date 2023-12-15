import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

const AdminDashboard = () => {
  const [unverifiedUsers, setUnverifiedUsers] = useState([]);

  useEffect(() => {
    // Fetch unverified users from Firestore
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

    fetchUnverifiedUsers();
  }, []); // Empty dependency array to run the effect only once when the component mounts

  const handleApprove = async (userId) => {
    // Update the isVerified field to true in Firestore
    const alumniDocRef = doc(db, "alumni", userId);
    await updateDoc(alumniDocRef, {
      isVerified: true,
    });

    // Update the local state to reflect the change
    setUnverifiedUsers((prevUsers) =>
      prevUsers.filter((user) => user.id !== userId)
    );
  };

  const handleDisapprove = async (userId) => {
    // Delete the document from Firestore
    const alumniDocRef = doc(db, "alumni", userId);
    await deleteDoc(alumniDocRef);

    // Update the local state to reflect the change
    setUnverifiedUsers((prevUsers) =>
      prevUsers.filter((user) => user.id !== userId)
    );
  };

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
