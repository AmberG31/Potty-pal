import React, { useState } from "react";
import Review from "./Review";
import AddReviewModal from "./AddReviewModal";

const ReviewList = ({ reviews }) => {
  const [isModal, setIsModal] = useState(false);
  return (
    <>
      {isModal && <AddReviewModal setIsModal={setIsModal} />}
      <div className="flex justify-between my-6">
        <h2 className="font-bold text-3xl">Reviews</h2>
        <button
          className="border border-slate-500 p-2"
          onClick={() => setIsModal(true)}
        >
          Add review
        </button>
      </div>
      <div className="flex flex-col gap-4">
        {reviews.map((review) => (
          <Review key={review._id} {...review} />
        ))}
      </div>
    </>
  );
};

export default ReviewList;
