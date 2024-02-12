import React from "react";

const Test = () => {
  return (
    <div className="container mt-5 py-5 w-100">
      <div className="row justify-content-center">
        <div className="col-md-6 m-5">
          <div className="card testimonial-card shadow-sm">
            <div className="card-up indigo lighten-1"></div>

            <div className="avatar mx-auto my-2 white">
              <img
                src="https://mdbootstrap.com/img/Photos/Avatars/img%20%2810%29.webp"
                className="rounded-circle img-fluid"
                alt="woman avatar"
              />
            </div>

            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <h3 className="card-title">Anna Doe</h3>

                <div className="d-flex">
                  <span
                    className="badge bg-primary m-1 text-light"
                    style={{ fontSize: "0.8rem", whiteSpace: "nowrap" }}
                  >
                    2024
                  </span>
                  <span
                    className="badge bg-primary m-1 text-light"
                    style={{ fontSize: "0.8rem", whiteSpace: "nowrap" }}
                  >
                    CSE
                  </span>
                </div>
              </div>

              <h6 className="my-0">[jobrole]</h6>
              <span className="text-muted">[company name]</span>

              <hr />

              <p>
                <i className="fa fa-quote-left"></i> [bio]
              </p>

              <div className="d-flex justify-content-center p-2 text-xl">
                <a href="#" className="btn-floating btn-small btn-fb me-2">
                  <i className="fa fa-linkedin"></i>
                </a>
                <a href="#" className="btn-floating btn-small">
                  <i className="fa fa-envelope"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
