import React from "react";

const Test = () => {
  return (
    <div className="mt-5 p-5 ">
      <div class="col-md-6 m-5">
        <div
          class="card testimonial-card shadow-sm"
          style={{ maxWidth: "22rem" }}
        >
          <div class="card-up indigo lighten-1"></div>

          <div class="avatar mx-auto my-2 white">
            <img
              src="https://mdbootstrap.com/img/Photos/Avatars/img%20%2810%29.webp"
              class="rounded-circle"
              alt="woman avatar"
            />
          </div>

          <div class="card-body">
            <div className="d-flex">
              <h3 class="card-title me-5">Anna Doe</h3>

              <span
                className="badge badge bg-primary m-1 text-light"
                style={{
                  fontSize: "0.8rem",
                  padding: "1.8%",
                  height: "fit-content",
                }}
              >
                2024
              </span>
              <span
                className="badge badge bg-primary m-1 text-light"
                style={{
                  fontSize: "0.8rem",
                  padding: "1.8%",
                  height: "fit-content",
                }}
              >
                CSE
              </span>
            </div>

            <h6 className="my-0">[jobrole]</h6>
            <span className="text-muted">[company name]</span>

            <hr />

            <p>
              <i class="fa fa-quote-left"></i> [bio]
            </p>
            <div className="d-flex mx-auto p-2 text-xl">
              <a type="button" class="btn-floating btn-small btn-fb me-2">
                <i class="fa fa-linkedin"></i>
              </a>

              <a type="button" class="btn-floating btn-small">
                <i class="fa fa-envelope"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
