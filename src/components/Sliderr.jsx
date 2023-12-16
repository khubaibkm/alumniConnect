// SliderComponent.jsx
import "./Sliderr.css";
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { db } from "../config/firebase.js";
import { collection, onSnapshot } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";

const SliderComponent = () => {
  const [profiles, setProfiles] = useState([]);

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

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 1000,
    dots: true,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };

  return (
    <div className="sliderr">
      <div id="category">
        <h2 style={{ color: "black" }}>Alumni Highlights</h2>
        <h6 style={{ color: "grey", letterSpacing: "2px" }}>Take a glance</h6>
      </div>
      <div className="slider-container">
        <Slider {...settings} className="autoplay-slider">
          {profiles.map((profile) => (
            <div key={profile.id} className="slider-card center">
              {profile.profileImageUrl && (
                <img
                  src={profile.profileImageUrl}
                  alt={`Profile of ${profile.name}`}
                  className="slider-image"
                />
              )}
              <p className="slider-name">{profile.name}</p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default SliderComponent;
