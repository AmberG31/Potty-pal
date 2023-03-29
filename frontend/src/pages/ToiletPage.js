import React from "react";
import { Link } from "react-router-dom";

import ReviewList from "../components/ReviewList.js";

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

const ToiletPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold my-6">Toilet Page</h1>
      <Link to="/">
        <div className="border p-2 text-center my-3">Home page</div>
      </Link>
      <hr />
      <ReviewList reviews={fakeReviews} />
    </div>
  );
};

export default ToiletPage;
