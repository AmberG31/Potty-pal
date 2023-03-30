import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ReviewList from "../components/ReviewList.js";
import AddReviewModal from "../components/AddReviewModal";

const ToiletPage = () => {
  const [reviews, setReviews] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetchData();
  }, [refresh]);

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
    <>
      {isModal && (
        <AddReviewModal
          setIsModal={setIsModal}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      )}
      <div>
        <h1 className="my-6 text-3xl font-bold">Toilet Page</h1>
        <Link to="/">
          <div className="my-3 border p-2 text-center">Home page</div>
        </Link>
        <hr />
        <ReviewList reviews={reviews} setIsModal={setIsModal} />
      </div>
    </>
  );
};

export default ToiletPage;
