import React, { useState } from "react";
import Review from "./Review";
import AddReviewModal from "./AddReviewModal";

const fakeReviews = [
  {
    _id: "1",
    clean: 3,
    content: "This is the 1st test review.",
    author: {
      _id: "1",
      username: "terryhycheng",
      email: "terryhycheng@gmail.com",
    },
    createdAt: "2023-03-28T13:35:02.576Z",
    updatedAt: "2023-03-28T13:35:02.576Z",
  },
  {
    _id: "2",
    clean: 2,
    content: "This is the 2nd test review.",
    author: {
      _id: "1",
      username: "terryhycheng",
      email: "terryhycheng@gmail.com",
    },
    createdAt: "2023-03-28T13:35:02.576Z",
    updatedAt: "2023-03-28T13:35:02.576Z",
  },
];

const ReviewList = () => {
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
        {fakeReviews.map((review) => (
          <Review key={review._id} {...review} />
        ))}
      </div>
    </>
  );
};

export default ReviewList;
