import React from "react";

const UnderReview = () => {
  return (
    <div className="container mt-5 p-5">
      <div className="row justify-content-center m-5">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header bg-warning text-white">
              Profile Under Review
            </div>
            <div className="card-body">
              <p>
                Your profile is currently under review. We appreciate your
                patience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnderReview;
