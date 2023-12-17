import React from "react";
import "./Error.css"; // Make sure to include your CSS file

const Error = () => {
  return (
    <section className="page_404 text-center">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="col-sm-12 col-sm-offset-1">
              <div className="four_zero_four_bg">
                <h1>404</h1>
              </div>

              <div className="contant_box_404">
                <h3 className="h2">Looks like you're lost</h3>
                <p>The page you are looking for is not available!</p>
                <a href="/" className="link_404 btn btn-primary">
                  Go to Home
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Error;
