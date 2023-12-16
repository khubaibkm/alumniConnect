import React, { useState } from "react";
import { db, storage, auth } from "../config/firebase.js"; // Import the storage reference
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage"; // Import storage-related functions
import { getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import "./OnBoardingForm.css";

const OnBoardingForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    graduationYear: "",
    major: "",
    email: "",
    linkedin: "",
    bio: "",
    currentCompany: "",
    isVerified: false,
  });
  const [image, setImage] = useState(null); // State for the selected image

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    // Handle the selected image file
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Retrieve the current authenticated user
      const currentUser = auth.currentUser;

      // If the user is not authenticated, handle accordingly
      if (!currentUser) {
        console.error("User not authenticated");
        return;
      }

      // Reference to the Firestore collection
      const alumniCollection = collection(db, "alumni");

      // Upload the image to Firebase Storage
      let imageUrl = "";
      if (image) {
        const storageRef = ref(storage, `profile_images/${formData.email}`);
        const snapshot = await uploadBytes(storageRef, image);
        imageUrl = await getDownloadURL(snapshot.ref); // Retrieve the download URL
      }

      // Add a new document with the form data, image URL, and Firebase UID
      await addDoc(alumniCollection, {
        name: formData.name,
        graduationYear: formData.graduationYear,
        major: formData.major,
        email: formData.email,
        linkedin: formData.linkedin,
        bio: formData.bio,
        currentCompany: formData.currentCompany,
        profileImageUrl: imageUrl,
        isVerified: formData.isVerified,
        firebaseUID: currentUser.uid, // Add the Firebase UID to the document
      });

      // Reset form after successful submission
      setFormData({
        name: "",
        graduationYear: "",
        major: "",
        email: "",
        linkedin: "",
        bio: "",
        currentCompany: "",
      });
      setImage(null);

      // Display a success message or redirect to another page
      console.log("Form submitted successfully!");
      navigate("/undereview");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  return (
    <div className="container onboarding-container">
      <div className="row align-items-center">
        <div className="col-xl-8 col-md-10 mx-auto">
          <h2 className="mb-4 text-center">Alumni Onboarding Form</h2>
          <div className="card shadow">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label form-label-onboard text-left">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control form-control-onboard"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="graduationYear" className="form-label form-label-onboard text-left">
                    Graduation Year
                  </label>
                  <input
                    type="text"
                    id="graduationYear"
                    name="graduationYear"
                    value={formData.graduationYear}
                    onChange={handleChange}
                    className="form-control form-control-onboard"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="major" className="form-label form-label-onboard text-left">
                    Major
                  </label>
                  <input
                    type="text"
                    id="major"
                    name="major"
                    value={formData.major}
                    onChange={handleChange}
                    className="form-control form-control-onboard"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label form-label-onboard text-left">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control form-control-onboard"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="linkedin" className="form-label form-label-onboard text-left">
                    LinkedIn Profile
                  </label>
                  <input
                    type="text"
                    id="linkedin"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    className="form-control form-control-onboard"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="currentCompany" className="form-label form-label-onboard text-left">
                    Current Company
                  </label>
                  <input
                    type="text"
                    id="currentCompany"
                    name="currentCompany"
                    value={formData.currentCompany}
                    onChange={handleChange}
                    className="form-control form-control-onboard"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="bio" className="form-label form-label-onboard text-left">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    className="form-control form-control-onboard"
                    required
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="profileImage" className="form-label form-label-onboard text-left">
                    Profile Picture
                  </label>
                  <input
                    type="file"
                    id="profileImage"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="form-control form-control-onboard"
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-onboard btn-block">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OnBoardingForm;
