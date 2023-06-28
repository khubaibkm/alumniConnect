import React, { useState } from "react";

const OnBoardingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    graduationYear: "",
    major: "",
    email: "",
    linkedin: "",
    bio: "",
    currentCompany: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic here
    console.log(formData);
    // Reset form after submission
    setFormData({
      name: "",
      graduationYear: "",
      major: "",
      email: "",
      linkedin: "",
      bio: "",
      currentCompany: "",
    });
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
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default OnBoardingForm;
