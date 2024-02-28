import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { db } from "../config/firebase.js";
import { collection, onSnapshot } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import "./Sliderr.css";
import defaultImage from "/profile.png";

const SliderComponent = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const profilesCollection = collection(db, "alumni");

    const unsubscribe = onSnapshot(profilesCollection, (snapshot) => {
      const profileData = [];
      snapshot.forEach((doc) => {
        const profile = { id: doc.id, ...doc.data() };

        // Only include profiles where isVerified is true
        if (profile.isVerified) {
          profileData.push(profile);
        }
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
    centerMode: false,
    infinite: true,
    centerPadding: "10%",
    slidesToShow: 4.2,
    speed: 2000,
    dots: true,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    draggable: true, // Allow mouse dragging
    swipeToSlide: true, // Allow swiping to slide
    focusOnSelect: true, // Focus on a slide when selected
    prevArrow: (
      <button
        type="button"
        className="slick-prev"
        style={{
          color: "red",
          fontSize: "100px",
        }}
      >
        Previous
      </button>
    ),
    nextArrow: (
      <button
        type="button"
        className="slick-next"
        style={{
          color: "blue",
          fontSize: "24px",
        }}
      >
        Next
      </button>
    ),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          centerPadding: "5%",
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerPadding: "0",
        },
      },
    ],
  };
  return (
    <div className="sliderr">
      <div class="category ">
        <h2 className="text-center">Alumni Highlights</h2>
        <h6 className="text-center">Take a glance</h6>
      </div>
      <div className="slider-container" style={{ margin: "0 0px" }}>
        <Slider {...settings} className="autoplay-slider">
          {profiles.map((profile) => (
            <div key={profile.id} className="slider-card center">
              {profile.profileImageUrl ? (
                <img
                  src={profile.profileImageUrl}
                  alt={`Profile of ${profile.name}`}
                  className="slider-image"
                />
              ) : (
                <img
                  src={defaultImage}
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
