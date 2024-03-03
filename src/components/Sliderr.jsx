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
      const profileData = snapshot.docs
        .filter((doc) => doc.data().isVerified)
        .map((doc) => ({ id: doc.id, ...doc.data() }));

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
    draggable: true,
    swipeToSlide: true,
    focusOnSelect: true,

    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
          centerPadding: "5%",
        },
      },
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 3,
          centerPadding: "0%",
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          centerPadding: "10%",
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          centerPadding: "0",
        },
      },
      {
        breakpoint: 580,
        settings: {
          slidesToShow: 1,
          centerPadding: "0",
        },
      },
    ],
  };

  return (
    <div className="sliderr">
      <div className="category">
        <h2 className="text-center">Alumni Highlights</h2>
        <h6 className="text-center">Take a glance</h6>
      </div>
      <div
        className="slider-container"
        style={{margin: "40px 0px" }}
      >
        <Slider {...settings} className="autoplay-slider">
          {profiles.slice(0, 9).map((profile) => (
            <div key={profile.id} className="slider-card center">
              <img
                src={profile.profileImageUrl || defaultImage}
                alt={`Profile of ${profile.name}`}
                className="slider-image"
              />
              <p className="slider-name">
                {profile.name?.length > 20
                  ? `${profile.name.slice(0, 14)}...`
                  : profile.name}
              </p>
            </div>
          ))}
        </Slider>
      </div>
    </div> 
  );
};

export default SliderComponent;
