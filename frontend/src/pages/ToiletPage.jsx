import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

import ReviewList from '../components/reviewList/ReviewList';
import AddReviewModal from '../components/addReview/AddReviewModal';
import { AuthContext } from '../context/AuthContext';

function ToiletPage() {
  const [toiletData, setToiletData] = useState();
  const [isModal, setIsModal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const { token } = useContext(AuthContext);
  const { id } = useParams();

  const fetchData = async () => {
    try {
      // fetch data from API
      const response = await axios.get(`/toilets/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // assign state
      setToiletData(response.data.toilet);
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
          toiletId={id}
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
        <ReviewList
          reviews={toiletData?.reviews || []}
          setIsModal={setIsModal}
        />
      </div>
    </>
  );
}

export default ToiletPage;
