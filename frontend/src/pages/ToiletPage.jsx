import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

import { ArrowLeftCircleIcon } from '@heroicons/react/24/outline';
import ReviewList from '../components/reviewList/ReviewList';
import AddReviewModal from '../components/addReview/AddReviewModal';
import ToiletInfo from '../components/toiletInfo/ToiletInfo';
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
        <Link
          to="/"
          className="flex items-center font-semibold hover:text-gray-700"
        >
          <ArrowLeftCircleIcon className="h-14 w-14 text-blue-500 hover:text-blue-700" />
          <p className="text-xl">Back</p>
        </Link>
        <ToiletInfo toiletData={toiletData} />
        <ReviewList
          reviews={toiletData?.reviews || []}
          setIsModal={setIsModal}
        />
      </div>
    </>
  );
}

export default ToiletPage;
