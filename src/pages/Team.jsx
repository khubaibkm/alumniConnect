import React from "react";
import "./Team.css"
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

const Team = () => {
  return (
    <section className="container p-5 ">
      <h2 className="text-4xl xl:text-5xl text-center text-primary font-bold mt-5">
        Minds behind Alumni Connect
      </h2>
      <hr className="mx-auto w-12 h-1 bg-success my-4" />
      <p className="text-center text-lg text-gray-800">
        We hope you like our work !
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
                  href="https://twitter.com/11Arish11"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mr-4 text-2xl text-primary"
                  style={{ marginRight: "2rem" }}
                >
                  <FaTwitter size={30} />
                </a>
                <a
                  href="https://www.linkedin.com/in/arish00/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mr-3 text-2xl text-primary"
                  style={{ marginRight: "2rem" }}
                >
                  <FaLinkedin size={30} />
                </a>
                <a
                  href="https://github.com/11WALTER11"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon text-2xl text-primary"
                  style={{ marginRight: "2rem" }}
                >
                  <FaGithub size={30} />
                </a>
              </div>
              <br />
              <p className=" ">
                Greetings! <br />
                <br />
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
              src="/khubaib.jpeg"
              alt="Hanna Lubin"
              className="card-img-top rounded-3xl"
            />
            <div className="card-body bg-light">
              <h3 className="text-2xl capitalize font-semibold">
                Khubaib Ahmad
              </h3>
              <span className="d-block capitalize text-lg text-primary font-light mb-3">
                Front-end Developer / UI/UX Designer / Coder{" "}
              </span>
              <div className="mt-3">
                <a
                  href="https://twitter.com/Khubaib56058732"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mr-4 text-2xl text-primary"
                  style={{ marginRight: "2rem" }}
                >
                  <FaTwitter size={30} />
                </a>
                <a
                  href="https://www.linkedin.com/in/khubaibahmad122/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mr-3 text-2xl text-primary"
                  style={{ marginRight: "2rem" }}
                >
                  <FaLinkedin size={30} />
                </a>
                <a
                  href="https://github.com/khubaibkm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl text-primary"
                  style={{ marginRight: "2rem" }}
                >
                  <FaGithub size={30} />
                </a>
              </div>
              <br />
              <p className=" ">
                Greetings! <br />
                <br />
                Hello! I am Khubaib Ahmad, the passionate mind behind Alumni
                Connect, a platform dedicated to fostering connections between
                alumni and students of Integral University. As the architect of
                this initiative, my vision is to create a vibrant network that
                provide a bridge for collaborative opportunities. <br />
                <br />I specialize in crafting visually striking, responsive
                interfaces that offer delightful user experiences. From
                wireframes to robust coding, I leverage my skills to turn
                concepts into reality. Always open to new opportunities and
                collaborations, I invite alumni, students, and fellow tech
                enthusiasts to connect. Let's build a future where knowledge
                knows no bounds.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
