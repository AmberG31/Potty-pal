import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ReviewList from "../components/ReviewList.js";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDI0NGE4MmRmZDA3YmVhMTZmYWFjYTAiLCJpYXQiOjE2ODAxMDA2OTgsImV4cCI6MTY4MDEwNDI5OH0.us6-Y5KvQGWi_NfAEhLVj3cSZ3NOeHA901AJGj6Hg8c";

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
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // fetch data from API
      const response = await fetch(
        `http://localhost:8080/toilets/64244d5a0a270cf092bc2890/review`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      // assign state
      setReviews(data.reviews);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold my-6">Toilet Page</h1>
      <Link to="/">
        <div className="border p-2 text-center my-3">Home page</div>
      </Link>
      <hr />
      <ReviewList reviews={reviews} />
    </div>
  );
};

export default ToiletPage;
