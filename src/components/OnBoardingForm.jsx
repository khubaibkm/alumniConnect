import React, { useState } from "react";
import { db, storage, auth } from "../config/firebase.js";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import "./OnBoardingForm.css";
import { toast } from "react-toastify";

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
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const checkUserSubmission = async (uid) => {
    const alumniCollection = collection(db, "alumni");
    const querySnapshot = await getDocs(
      query(alumniCollection, where("firebaseUID", "==", uid))
    );
    return !querySnapshot.empty;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        console.error("User not authenticated");
        return;
      }

      const userSubmitted = await checkUserSubmission(currentUser.uid);

      if (userSubmitted) {
        toast.error(
          "You have already submitted your profile! Wait for approval"
        );
        return;
      }

      const alumniCollection = collection(db, "alumni");

      // Validation checks
      if (formData.bio.length > 200) {
        toast.error("Bio should not exceed 200 words");
        return;
      }

      if (image) {
        const fileSizeInMB = image.size / (1024 * 1024);
        const allowedImageTypes = ["image/jpeg", "image/png", "image/gif"];

        if (fileSizeInMB > 1) {
          toast.error("File size should not exceed 1MB");
          return;
        }

        if (!allowedImageTypes.includes(image.type)) {
          toast.error("Invalid image format. Please use JPEG, PNG, or GIF");
          return;
        }
      }

      let imageUrl = "";
      if (image) {
        const storageRef = ref(storage, `profile_images/${formData.email}`);
        const snapshot = await uploadBytes(storageRef, image);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

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
        firebaseUID: currentUser.uid,
      });

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
                  <label
                    htmlFor="name"
                    className="form-label form-label-onboard text-left"
                  >
                    Name<span style={{ color: "red" }}>*</span>
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
                  <label
                    htmlFor="graduationYear"
                    className="form-label form-label-onboard text-left"
                  >
                    Graduation Year<span style={{ color: "red" }}>*</span>
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
                  <label
                    htmlFor="major"
                    className="form-label form-label-onboard text-left"
                  >
                    Major<span style={{ color: "red" }}>*</span>
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
                  <label
                    htmlFor="email"
                    className="form-label form-label-onboard text-left"
                  >
                    Email<span style={{ color: "red" }}>*</span>
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
                  <label
                    htmlFor="linkedin"
                    className="form-label form-label-onboard text-left"
                  >
                    LinkedIn Profile<span style={{ color: "red" }}>*</span>
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
                  <label
                    htmlFor="currentCompany"
                    className="form-label form-label-onboard text-left"
                  >
                    Current Company<span style={{ color: "red" }}>*</span>
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
                  <label
                    htmlFor="bio"
                    className="form-label form-label-onboard text-left"
                  >
                    Bio<span style={{ color: "red" }}>*</span>
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
                  <label
                    htmlFor="profileImage"
                    className="form-label form-label-onboard text-left"
                  >
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
                <button
                  type="submit"
                  className="btn btn-primary btn-onboard btn-block"
                >
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
