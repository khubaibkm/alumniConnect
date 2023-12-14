import React, { useState } from "react";
import { db, storage } from "../config/firebase.js"; // Import the storage reference
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage"; // Import storage-related functions
import { getDownloadURL } from "firebase/storage";

const OnBoardingForm = () => {
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
      // Reference to the Firestore collection
      const alumniCollection = collection(db, "alumni");

      // Upload the image to Firebase Storage
      let imageUrl = "";
      if (image) {
        const storageRef = ref(storage, `profile_images/${formData.email}`);
        const snapshot = await uploadBytes(storageRef, image);
        imageUrl = await getDownloadURL(snapshot.ref); // Retrieve the download URL
      }

      // Add a new document with the form data and image URL
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
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Alumni Onboarding Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="graduationYear" className="form-label">
            Graduation Year
          </label>
          <input
            type="text"
            id="graduationYear"
            name="graduationYear"
            value={formData.graduationYear}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="major" className="form-label">
            Major
          </label>
          <input
            type="text"
            id="major"
            name="major"
            value={formData.major}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="linkedin" className="form-label">
            LinkedIn Profile
          </label>
          <input
            type="text"
            id="linkedin"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="currentCompany" className="form-label">
            Current Company
          </label>
          <input
            type="text"
            id="currentCompany"
            name="currentCompany"
            value={formData.currentCompany}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="bio" className="form-label">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="form-control"
            required
          ></textarea>
        </div>

        {/* Image upload field */}
        <div className="mb-3">
          <label htmlFor="profileImage" className="form-label">
            Profile Picture
          </label>
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            onChange={handleImageChange}
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default OnBoardingForm;
