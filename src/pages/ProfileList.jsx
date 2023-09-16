import React, { useState, useEffect } from "react";
import { db } from "../config/firebase.js";
import { collection, onSnapshot } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";

const ProfileList = () => {
  const [profiles, setProfiles] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");
  const [graduationYearFilter, setGraduationYearFilter] = useState("");
  const [majorFilter, setMajorFilter] = useState("");

  useEffect(() => {
    // Reference to the Firestore collection
    const profilesCollection = collection(db, "alumni");

    // Real-time listener for Firestore data
    const unsubscribe = onSnapshot(profilesCollection, (snapshot) => {
      const profileData = [];
      snapshot.forEach((doc) => {
        profileData.push({ id: doc.id, ...doc.data() });
      });
      setProfiles(profileData);
    });

    // Clean up the listener when component unmounts
    return () => unsubscribe();
  }, []);

  const fetchProfileImageUrls = async () => {
    const updatedProfiles = await Promise.all(
      profiles.map(async (profile) => {
        if (profile.profileImageUrl) {
          try {
            const storageRef = ref(db.storage, profile.profileImageUrl);
            const downloadURL = await getDownloadURL(storageRef);

            // Log the profile image URL to the console
            console.log("Profile Image URL:", downloadURL);

            // Update the profile object with the image URL
            return {
              ...profile,
              profileImageUrl: downloadURL,
            };
          } catch (error) {
            console.error("Error fetching image URL:", error);
            return profile; // Return the original profile if there's an error
          }
        } else {
          return profile; // Return the profile as-is if there's no image URL
        }
      })
    );

    // Update the state with the modified profiles
    setProfiles(updatedProfiles);
  };

  const filteredProfiles = profiles.filter((profile) => {
    const nameMatches = profile.name
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const companyMatches =
      companyFilter === "" ||
      profile.currentCompany.toLowerCase() === companyFilter.toLowerCase();
    const graduationYearMatches =
      graduationYearFilter === "" ||
      profile.graduationYear === graduationYearFilter;
    const majorMatches =
      majorFilter === "" ||
      profile.major.toLowerCase() === majorFilter.toLowerCase();

    return (
      nameMatches && companyMatches && graduationYearMatches && majorMatches
    );
  });

  // Get unique values for company, graduation year, and major
  const companies = Array.from(
    new Set(profiles.map((profile) => profile.currentCompany))
  );
  const graduationYears = Array.from(
    new Set(profiles.map((profile) => profile.graduationYear))
  );
  const majors = Array.from(new Set(profiles.map((profile) => profile.major)));

  return (
    <div className="container mt-4">
      <h1 className="text-center">Profile List</h1>
      <div className="row mb-3">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <select
            className="form-select"
            value={companyFilter}
            onChange={(e) => setCompanyFilter(e.target.value)}
          >
            <option key="all" value="">
              Filter by Company
            </option>
            {companies.map((company) => (
              <option key={company} value={company}>
                {company}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-2">
          <select
            className="form-select"
            value={graduationYearFilter}
            onChange={(e) => setGraduationYearFilter(e.target.value)}
          >
            <option key="all" value="">
              Filter by Graduation Year
            </option>
            {graduationYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            value={majorFilter}
            onChange={(e) => setMajorFilter(e.target.value)}
          >
            <option key="all" value="">
              Filter by Major
            </option>
            {majors.map((major) => (
              <option key={major} value={major}>
                {major}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="row">
        {filteredProfiles.map((profile) => (
          <div key={profile.id} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">{profile.name}</h2>
                <p className="card-text">
                  Graduation Year: {profile.graduationYear}
                </p>
                <p className="card-text">Major: {profile.major}</p>
                <p className="card-text">Email: {profile.email}</p>
                <p className="card-text">LinkedIn: {profile.linkedin}</p>
                <p className="card-text">Bio: {profile.bio}</p>
                <p className="card-text">
                  Current Company: {profile.currentCompany}
                </p>
                {/* Display profile image if available */}
                {profile.profileImageUrl && (
                  <img
                    src={profile.profileImageUrl}
                    alt={`Profile of ${profile.name}`}
                    className="img-fluid"
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileList;
