import React, { useState, useEffect } from "react";
import { db, auth, storage } from "../config/firebase.js";
import {
  collection,
  getDocs,
  where,
  query,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { FaPencilAlt } from "react-icons/fa";

const MyProfile = () => {
  const [userData, setUserData] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [updatedFormData, setUpdatedFormData] = useState({
    name: "",
    graduationYear: "",
    major: "",
    linkedin: "",
    currentCompany: "",
    bio: "",
    profileImageUrl: "", // New field for the updated image URL
  });
  const [image, setImage] = useState(null); // State for the selected image

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
          console.error("User not authenticated");
          return;
        }

        const alumniCollection = collection(db, "alumni");
        const q = query(
          alumniCollection,
          where("firebaseUID", "==", currentUser.uid)
        );
        const querySnapshot = await getDocs(q);

        if (querySnapshot.docs.length > 0) {
          const userData = querySnapshot.docs[0].data();
          userData.id = querySnapshot.docs[0].id;
          setUserData(userData);

          setUpdatedFormData({
            name: userData.name,
            graduationYear: userData.graduationYear,
            major: userData.major,
            linkedin: userData.linkedin,
            currentCompany: userData.currentCompany,
            bio: userData.bio,
            profileImageUrl: userData.profileImageUrl,
          });
        } else {
          console.log("User data not found");
        }
      } catch (error) {
        console.error("Error fetching user profile: ", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleEditClick = (field) => {
    setEditingField(field);
  };

  const handleCancelEdit = () => {
    setEditingField(null);
    setUpdatedFormData({
      name: userData.name,
      graduationYear: userData.graduationYear,
      major: userData.major,
      linkedin: userData.linkedin,
      currentCompany: userData.currentCompany,
      bio: userData.bio,
      profileImageUrl: userData.profileImageUrl,
    });
    setImage(null);
  };

  const handleUpdate = async () => {
    try {
      if (image) {
        const storageRef = ref(storage, `profile_images/${userData.email}`);
        const snapshot = await uploadBytes(storageRef, image);
        const imageUrl = await getDownloadURL(snapshot.ref);
        setUpdatedFormData((prevData) => ({
          ...prevData,
          profileImageUrl: imageUrl,
        }));
      }

      const alumniDocRef = doc(db, "alumni", userData.id);
      await updateDoc(alumniDocRef, {
        ...updatedFormData,
        updatedAt: serverTimestamp(),
      });

      setUserData((prevUserData) => ({
        ...prevUserData,
        ...updatedFormData,
      }));

      setEditingField(null);
      setImage(null);
    } catch (error) {
      console.error("Error updating user profile: ", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <div class="container mt-5 p-5">
      <div class="card p-4">
        <h2 class="mb-4 text-center">My Profile</h2>

        {userData ? (
          <div class="row">
            <div class="col-md-4 mb-3">
              <p class="mb-2">
                <strong>
                  Profile Picture:{" "}
                  <FaPencilAlt
                    onClick={() => handleEditClick("profileImageUrl")}
                  />
                </strong>{" "}
                {editingField === "profileImageUrl" ? (
                  <div>
                    <input
                      type="file"
                      onChange={handleImageChange}
                      class="form-control"
                    />
                    {image && (
                      <img
                        src={URL.createObjectURL(image)}
                        alt="Preview"
                        class="mt-2 img-fluid"
                      />
                    )}
                  </div>
                ) : (
                  <span>
                    {userData.profileImageUrl && (
                      <img
                        src={userData.profileImageUrl}
                        alt="Profile"
                        class="mt-2 img-fluid"
                      />
                    )}
                  </span>
                )}
              </p>
            </div>

            <div class="col-md-8 ">
              <p class="mb-3 mt-4">
                <strong>Name:</strong>{" "}
                {editingField === "name" ? (
                  <input
                    type="text"
                    name="name"
                    value={updatedFormData.name}
                    onChange={handleChange}
                    class="form-control"
                  />
                ) : (
                  <span>
                    {userData.name}{" "}
                    <FaPencilAlt onClick={() => handleEditClick("name")} />
                  </span>
                )}
              </p>

              <p class="mb-3">
                <strong>Graduation Year:</strong>{" "}
                {editingField === "graduationYear" ? (
                  <input
                    type="text"
                    name="graduationYear"
                    value={updatedFormData.graduationYear}
                    onChange={handleChange}
                    class="form-control"
                  />
                ) : (
                  <span>
                    {userData.graduationYear}{" "}
                    <FaPencilAlt
                      onClick={() => handleEditClick("graduationYear")}
                    />
                  </span>
                )}
              </p>

              <p class="mb-3">
                <strong>Major:</strong>{" "}
                {editingField === "major" ? (
                  <input
                    type="text"
                    name="major"
                    value={updatedFormData.major}
                    onChange={handleChange}
                    class="form-control"
                  />
                ) : (
                  <span>
                    {userData.major}{" "}
                    <FaPencilAlt onClick={() => handleEditClick("major")} />
                  </span>
                )}
              </p>

              <p class="mb-3">
                <strong>Email:</strong> {userData.email}
              </p>

              <p class="mb-3">
                <strong>LinkedIn:</strong>{" "}
                {editingField === "linkedin" ? (
                  <input
                    type="text"
                    name="linkedin"
                    value={updatedFormData.linkedin}
                    onChange={handleChange}
                    class="form-control"
                  />
                ) : (
                  <span>
                    {userData.linkedin}{" "}
                    <FaPencilAlt onClick={() => handleEditClick("linkedin")} />
                  </span>
                )}
              </p>

              <p class="mb-3">
                <strong>Current Company:</strong>{" "}
                {editingField === "currentCompany" ? (
                  <input
                    type="text"
                    name="currentCompany"
                    value={updatedFormData.currentCompany}
                    onChange={handleChange}
                    class="form-control"
                  />
                ) : (
                  <span>
                    {userData.currentCompany}{" "}
                    <FaPencilAlt
                      onClick={() => handleEditClick("currentCompany")}
                    />
                  </span>
                )}
              </p>

              <p class="mb-3">
                <strong>Bio:</strong>{" "}
                {editingField === "bio" ? (
                  <textarea
                    name="bio"
                    value={updatedFormData.bio}
                    onChange={handleChange}
                    class="form-control"
                  />
                ) : (
                  <span>
                    {userData.bio}{" "}
                    <FaPencilAlt onClick={() => handleEditClick("bio")} />
                  </span>
                )}
              </p>

              <button class="btn btn-primary mt-2" onClick={handleUpdate}>
                Save Changes
              </button>
              <button
                class="btn btn-secondary mt-2 mx-2"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
