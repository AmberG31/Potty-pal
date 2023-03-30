import React from "react";
import Review from "./Review";

const ReviewList = ({ reviews, setIsModal }) => {
  return (
    <>
      <div className="my-6 flex justify-between">
        <h2 className="text-3xl font-bold">Reviews</h2>
        <button
          className="border border-slate-500 p-2"
          onClick={() => setIsModal(true)}
        >
          Add review
        </button>
      </div>
      <div className="flex flex-col gap-4">
        {!reviews.length && <p>No reviews for this toilet</p>}
        {reviews.length !== 0 &&
          reviews.map((review) => <Review key={review.id} {...review} />)}
      </div>
    </>
  );
};

export default ReviewList;
