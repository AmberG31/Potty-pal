import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

import { ArrowSmallLeftIcon } from '@heroicons/react/24/outline';
import ReviewList from '../components/reviewList/ReviewList';
import AddReviewModal from '../components/addReview/AddReviewModal';
import ToiletInfo from '../components/toiletInfo/ToiletInfo';
import { AuthContext } from '../context/AuthContext';
import { ApiUrlContext } from '../context/ApiUrlContext';

function ToiletPage() {
  const initialRatings = {
    cleanliness: 0,
    availability: 0,
    comfort: 0,
    aesthetics: 0,
  };

  const [toiletData, setToiletData] = useState();
  const [ratings, setRatings] = useState(initialRatings);
  const [isLoading, setIsLoading] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const { token } = useContext(AuthContext);
  const { url } = useContext(ApiUrlContext);
  const { id } = useParams();

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      // fetch data from API
      const response = await axios.get(`${url}/toilets/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // assign state
      setToiletData(response.data.toilet);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [refresh, fetchData]);

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
      {isLoading && (
        <div className="mx-auto my-6 flex min-h-[50vh] max-w-6xl flex-col items-center justify-center">
          <div className="custom-loader" />
          <p className="mt-4 animate-pulse text-center text-lg font-light text-gray-500">
            Loading...
          </p>
        </div>
      )}
      {!isLoading && (
        <div>
          {/* Back Button */}
          <div className="border-b py-4">
            <Link
              to="/"
              className="mx-auto flex max-w-7xl items-center px-2 font-semibold hover:text-gray-700"
            >
              <ArrowSmallLeftIcon className="mr-6 w-8" />
              <p className="text-xl">Back</p>
            </Link>
          </div>
          <div className="mx-auto mb-20 max-w-7xl px-2">
            {toiletData && (
              <ToiletInfo toiletData={toiletData} ratings={ratings} />
            )}

            <ReviewList
              reviews={toiletData?.reviews || []}
              setIsModal={setIsModal}
              setRatings={setRatings}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default ToiletPage;
