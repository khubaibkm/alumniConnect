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
    const profilesCollection = collection(db, "alumni");

    const unsubscribe = onSnapshot(profilesCollection, (snapshot) => {
      const profileData = [];
      snapshot.forEach((doc) => {
        profileData.push({ id: doc.id, ...doc.data() });
      });
      setProfiles(profileData);
    });

    return () => unsubscribe();
  }, []);

  const fetchProfileImageUrls = async () => {
    const updatedProfiles = await Promise.all(
      profiles.map(async (profile) => {
        if (profile.profileImageUrl) {
          try {
            const storageRef = ref(db.storage, profile.profileImageUrl);
            const downloadURL = await getDownloadURL(storageRef);

            return {
              ...profile,
              profileImageUrl: downloadURL,
            };
          } catch (error) {
            console.error("Error fetching image URL:", error);
            return profile;
          }
        } else {
          return profile;
        }
      })
    );

    setProfiles(updatedProfiles);
  };

  const filteredProfiles = profiles.filter((profile) => {
    console.log("Profile:", profile); // Log the profile object to inspect its contents
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
    const isVerified = profile.isVerified;

    return (
      nameMatches &&
      companyMatches &&
      graduationYearMatches &&
      majorMatches &&
      isVerified
    );
  });

  const companies = Array.from(
    new Set(profiles.map((profile) => profile.currentCompany))
  );
  const graduationYears = Array.from(
    new Set(profiles.map((profile) => profile.graduationYear))
  );
  const majors = Array.from(new Set(profiles.map((profile) => profile.major)));

  return (
    <div className="container mt-4 mb-5">
      <h1 className="text-center">Profile List</h1>
      <div className="row mt-5 mb-2">
        <div className="col-md-4 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <div className="col-md-2 mb-2">
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
        <div className="col-md-2 mb-2">
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
        <div className="col-md-4 mb-2">
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
      <div
        style={{ marginBottom: "4rem" }}
        className="row row-cols-1 row-cols-md-2 row-cols-xl-3"
      >
        {filteredProfiles.map((profile) => (
          <div key={profile.id} className="col mb-3">
            <div className="card h-100">
              {profile.profileImageUrl && (
                <img
                  src={profile.profileImageUrl}
                  alt={`Profile of ${profile.name}`}
                  className="card-img-top img-fluid"
                  style={{ height: "350px" }}
                />
              )}
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileList;
