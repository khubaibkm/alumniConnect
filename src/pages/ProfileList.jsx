import React, { useState, useEffect } from "react";
import { db } from "../config/firebase.js";
import { collection, onSnapshot } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebase.js";
import PlaceHolder from "../components/PlaceHolder.jsx";

const ProfileList = () => {
  const [profiles, setProfiles] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");
  const [graduationYearFilter, setGraduationYearFilter] = useState("");
  const [majorFilter, setMajorFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [profilesPerPage] = useState(6);
  const [loading, setLoading] = useState(true); // Define loading state

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

  useEffect(() => {
    const fetchImages = async () => {
      const updatedProfiles = await Promise.all(
        profiles.map(async (profile) => {
          if (profile.profileImageUrl) {
            try {
              // Use the storage instance
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
    };

    fetchImages();
  }, [profiles]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastProfile = currentPage * profilesPerPage;
  const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
  const currentProfiles = profiles.slice(
    indexOfFirstProfile,
    indexOfLastProfile
  );

  const filteredProfiles = currentProfiles.filter((profile) => {
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
      <div className="row mt-5 mb-2">{/* Your search and filter inputs */}</div>
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
          : filteredProfiles.map((profile) => (
              <div key={profile.id} className="col mb-3">
                <Card className="h-100">
                  {profile.profileImageUrl && (
                    <Card.Img
                      variant="top"
                      src={profile.profileImageUrl}
                      alt={`Profile of ${profile.name}`}
                      style={{ height: "350px" }}
                    />
                  )}
                  <Card.Body>
                    <Card.Title>
                      <span
                        className="badge badge bg-primary m-1 text-light position-absolute left-0 top-0"
                        style={{ fontSize: "1.2rem" }}
                      >
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
                      <p className="card-text">
                        Major:{" "}
                        <span className="text-success">{profile.major}</span>
                      </p>
                      <p className="card-text">
                        Current Company:{" "}
                        <span className="text-warning">
                          {profile.currentCompany}
                        </span>
                      </p>
                      <p className="card-text">
                        Bio: <span className="text-muted">{profile.bio}</span>
                      </p>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            ))}
      </div>
      <div className="d-flex justify-content-center">
        <ul className="pagination" onClick={() => window.scrollTo(0, 0)}>
          {Array.from(
            { length: Math.ceil(profiles.length / profilesPerPage) },
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
