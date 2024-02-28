import React, { useState, useEffect } from "react";
import { db } from "../config/firebase.js";
import { collection, onSnapshot } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { Card } from "react-bootstrap";
import { storage } from "../config/firebase.js";
import PlaceHolder from "../components/PlaceHolder.jsx";
import defaultImage from "/profile.png";
import "./ProfileList.css";

const ProfileList = () => {
  const [profiles, setProfiles] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");
  const [graduationYearFilter, setGraduationYearFilter] = useState("");
  const [majorFilter, setMajorFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [profilesPerPage] = useState(6);
  const [loading, setLoading] = useState(true);

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

  const fetchImages = async () => {
    try {
      const updatedProfiles = await Promise.all(
        profiles.map(async (profile) => {
          if (profile.profileImageUrl) {
            try {
              const storageRef = ref(storage, profile.profileImageUrl);
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
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchImages();
    };

    loadData();
  }, []);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
    const isVerified = profile.isVerified;

    return (
      nameMatches &&
      companyMatches &&
      graduationYearMatches &&
      majorMatches &&
      isVerified
    );
  });

  const indexOfLastProfile = currentPage * profilesPerPage;
  const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
  const currentProfiles = filteredProfiles.slice(
    indexOfFirstProfile,
    indexOfLastProfile
  );

  const companies = Array.from(
    new Set(profiles.map((profile) => profile.currentCompany))
  );
  const graduationYears = Array.from(
    new Set(profiles.map((profile) => profile.graduationYear))
  );
  const majors = Array.from(new Set(profiles.map((profile) => profile.major)));

  return (
    <div className="container mt-4 mb-5">
      <div className="row mb-2 " style={{ marginTop: "5rem" }}>
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
        {loading
          ? Array.from({ length: profilesPerPage }).map((_, index) => (
              <div key={index} className="col mb-3">
                <PlaceHolder />
              </div>
            ))
          : currentProfiles?.map((profile) => (
              <div key={profile.id} className="col mb-3">
                <Card className="h-100  border-primary">
                  <div className="profile-image-container  ">
                    <img
                      className="profile-image"
                      src={profile.profileImageUrl || defaultImage}
                      alt={`Profile of ${profile.name}`}
                    />
                  </div>
                  <Card.Body className="bg-light">
                    <Card.Title>
                      <span className="badge badge bg-primary m-1 text-light position-absolute left-0 top-0">
                        {profile.graduationYear}
                      </span>
                    </Card.Title>
                    <div className="card-body">
                      <h2 className="card-title text-center">{profile.name}</h2>
                      <div className="d-flex justify-content-center">
                        <a
                          href={profile.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary "
                        >
                          <i className="fa fa-linkedin fa-lg me-3"></i>
                        </a>
                        <a href={`mailto:${profile.email}`}>
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                      <div className="mt-3">
                        <p className="card-text">
                          Major:{" "}
                          <span className="text-primary">{profile.major}</span>
                        </p>
                        <p className="card-text ">
                          Current Company:{" "}
                          <span className="text-primary">
                            {profile.currentCompany?.length > 15
                              ? profile.currentCompany.slice(0, 15) + "..."
                              : profile.currentCompany}
                          </span>
                        </p>
                        <p className="card-text">
                          Bio:{" "}
                          <span className="text-primary ">
                            {profile.bio?.length > 200
                              ? profile.bio.slice(0, 200) + "..."
                              : profile.bio}
                          </span>
                        </p>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            ))}
      </div>
      <div className="d-flex justify-content-center">
        <ul className="pagination" onClick={() => window.scrollTo(0, 0)}>
          {Array.from(
            { length: Math.ceil(filteredProfiles.length / profilesPerPage) },
            (_, index) => (
              <li
                key={index}
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default ProfileList;
