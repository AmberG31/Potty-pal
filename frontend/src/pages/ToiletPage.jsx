import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import ReviewList from '../components/ReviewList';
import AddReviewModal from '../components/AddReviewModal';
import { AuthContext } from '../context/AuthContext';

function ToiletPage() {
  const [reviews, setReviews] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const { token } = useContext(AuthContext);

  const fetchData = async () => {
    try {
      // fetch data from API
      const response = await axios.get(
        'http://localhost:8080/toilets/64244d5a0a270cf092bc2890/review',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      // assign state
      setReviews(response.data.reviews);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);

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
}

export default ToiletPage;
