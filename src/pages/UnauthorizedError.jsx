import React from "react";

const UnauthorizedError = () => {
  return (
    <div className="container mt-5">
      <div className="row mt-5 p-5">
        <div className="col-md-6 offset-md-3">
          <div className="card border-danger">
            <div className="card-body">
              <h5 className="card-title text-danger">Unauthorized Access</h5>
              <p className="card-text">
                You do not have permission to access this page.
              </p>
              <a href="/" className="btn btn-primary">
                Go to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedError;
