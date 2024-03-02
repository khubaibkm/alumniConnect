import React, { useEffect, useState } from "react";
import { db, storage, auth } from "../config/firebase.js";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import "./OnBoardingForm.css";
import { toast } from "react-toastify";
import major from "../data/major.json";

const OnBoardingForm = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]); // State to store the list of companies

  const fetchCompanies = async () => {
    try {
      const alumniCollection = collection(db, "alumni");
      const querySnapshot = await getDocs(alumniCollection);
      const companyList = [];

      querySnapshot.forEach((doc) => {
        const currentCompany = doc.data().currentCompany;
        if (currentCompany && !companyList.includes(currentCompany)) {
          companyList.push(currentCompany);
        }
      });

      setCompanies(companyList);
    } catch (error) {
      console.error("Error fetching companies: ", error);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []); // Run only once when the component mounts

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
  const [loading, setLoading] = useState(false); // New state for loading

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
      setLoading(true); // Set loading to true when submitting

      const currentUser = auth.currentUser;
      if (!currentUser) {
        console.error("User not authenticated");
        setLoading(false); // Set loading to false in case of an error
        return;
      }

      const userSubmitted = await checkUserSubmission(currentUser.uid);

      if (userSubmitted) {
        toast.error(
          "You have already submitted your profile! Wait for approval"
        );
        setLoading(false); // Set loading to false in case of an error
        return;
      }

      const alumniCollection = collection(db, "alumni");

      // Validation checks
      if (formData.bio.length > 200) {
        toast.error("Bio should not exceed 200 words");
        setLoading(false); // Set loading to false in case of an error
        return;
      }

      if (image) {
        const fileSizeInMB = image.size / (1024 * 1024);
        const allowedImageTypes = ["image/jpeg", "image/png", "image/gif"];

        if (fileSizeInMB > 1) {
          toast.error("File size should not exceed 1MB");
          setLoading(false); // Set loading to false in case of an error
          return;
        }

        if (!allowedImageTypes.includes(image.type)) {
          toast.error("Invalid image format. Please use JPEG, PNG, or GIF");
          setLoading(false); // Set loading to false in case of an error
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
      setLoading(false); // Set loading to false in case of an error
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
                  <select
                    id="major"
                    name="major"
                    value={formData.major}
                    onChange={handleChange}
                    className="form-control form-control-onboard"
                    required
                  >
                    <option value="" disabled>
                      Select a major
                    </option>
                    {major.programs.map((program, index) => (
                      <option key={index} value={program}>
                        {program}
                      </option>
                    ))}
                  </select>
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
                    LinkedIn Username<span style={{ color: "red" }}>*</span>
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      https://linkedin.com/in/
                    </span>
                    <input
                      type="text"
                      id="linkedin"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleChange}
                      className="form-control form-control-onboard"
                      placeholder="Enter your LinkedIn username"
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="currentCompany"
                    className="form-label form-label-onboard text-left"
                  >
                    Current Company<span style={{ color: "red" }}>*</span>
                  </label>
                  <span className="text-muted small">'NA' if unemployed</span>
                  {/* Use a searchable/selectable input for the company field */}
                  <input
                    type="text"
                    id="currentCompany"
                    name="currentCompany"
                    value={formData.currentCompany}
                    onChange={handleChange}
                    className="form-control form-control-onboard"
                    required
                    list="companyList" // Connect the input to the datalist
                  />
                  <datalist id="companyList">
                    {/* Display the list of companies as options */}
                    {companies.map((company, index) => (
                      <option key={index} value={company} />
                    ))}
                  </datalist>
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
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit"}
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
