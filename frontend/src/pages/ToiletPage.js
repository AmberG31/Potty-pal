import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ReviewList from "../components/ReviewList.js";

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
            Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
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
