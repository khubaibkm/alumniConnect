import React from "react";

const UnderReview = () => {
  return (
    <div className="container mt-5 py-4">
      <div className="row justify-content-center mx-2 my-5">
        <div className="col-md-8">
          <div className="card ">
            <div className="card-header bg-primary ">
              <h2 className="text-white">Profile Under Review</h2>
            </div>
            <div className="card-body">
              <p>
                Your profile is currently under review. We appreciate your
                patience. You will be notified once your profile is approved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnderReview;
