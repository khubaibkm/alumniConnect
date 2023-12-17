import React from "react";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

const Team = () => {
  return (
    <section className="container p-5 ">
      <h2 className="text-4xl xl:text-5xl text-center text-primary font-bold mt-5">
        Minds behind AlumniConnect
      </h2>
      <hr className="mx-auto w-12 h-1 bg-success my-4" />
      <p className="text-center text-lg text-gray-800">
        hope you like our work !
      </p>

      <div className="row mt-4">
        {/* Team member 1 */}
        <div className="col-lg-6">
          <div className="card mb-4">
            <img
              src="/arish.jpg"
              alt="Hanna Lubin"
              className="card-img-top rounded-3xl"
            />
            <div className="card-body bg-light">
              <h3 className="text-2xl capitalize font-semibold">
                Mohammad Arish Siddiqui
              </h3>
              <span className="d-block capitalize text-lg text-primary font-light mb-3">
                Web Developer / Designer / DevOps
              </span>
              <div className="mt-3">
                <a
                  href="https://twitter.com/arish_siddiqui"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mr-4 text-2xl text-primary"
                >
                  <FaTwitter />
                </a>
                <a
                  href="https://www.linkedin.com/in/arish-siddiqui/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mr-3 text-2xl text-primary"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="https://github.com/arish-shah"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl text-primary"
                >
                  <FaGithub />
                </a>
              </div>
              <p className=" ">
                Greetings! <br />
                If you have found your way to this page, we extend our sincere
                congratulations. I am Arish Siddiqui, the visionary behind the
                inception of AlumniConnect—a platform born out of the idea to
                unite alumni and provide a stage for their experiences to
                resonate with the eager applause of fresh minds.
                <br />
                <br /> As an individual, my ardor lies in problem-solving
                through computer programming. I derive immense satisfaction in
                crafting solutions that simplify life and automate repetitive
                tasks. If you share a similar passion, I welcome you to connect
                with me. I am open to embracing more shared enthusiasm and
                creativity into my journey. Or am I just kidding? You decide! (:
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card mb-4">
            <img
              src="/vite.svg"
              alt="Hanna Lubin"
              className="card-img-top rounded-3xl"
            />
            <div className="card-body bg-light">
              <h3 className="text-2xl capitalize font-semibold">
                Khubaib Ahmad
              </h3>
              <span className="d-block capitalize text-lg text-primary font-light mb-3"></span>
              <div className="mt-3">
                <a
                  href="https://twitter.com/arish_siddiqui"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mr-4 text-2xl text-primary"
                >
                  <FaTwitter />
                </a>
                <a
                  href="https://www.linkedin.com/in/arish-siddiqui/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mr-3 text-2xl text-primary"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="https://github.com/arish-shah"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl text-primary"
                >
                  <FaGithub />
                </a>
              </div>
              <p className=" ">
                Greetings! <br />
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
