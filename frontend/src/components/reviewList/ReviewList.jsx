import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Review, { reviewPropTypes } from '../review/Review';
import { AuthContext } from '../../context/AuthContext';

function ReviewList({ reviews, setIsModal, setRatings }) {
  const { token } = useContext(AuthContext);

  const calculateRating = () => {
    if (reviews.length === 0) {
      return;
    }
    let cleanlinessTotal = 0;
    reviews.forEach((review) => {
      cleanlinessTotal += review.clean;
    });
    setRatings((prev) => ({
      ...prev,
      cleanliness: cleanlinessTotal / reviews.length,
    }));
  };

  useEffect(() => {
    calculateRating();
  }, [reviews]);

  return (
    <>
      <div className="my-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Reviews</h2>
        {token && (
          <button
            type="button"
            className="btn px-10"
            onClick={() => setIsModal(true)}
          >
            Add review
          </button>
        )}
      </div>
      <div className="flex flex-col gap-4">
        {!reviews.length && <p>No reviews for this toilet</p>}
        {reviews.length !== 0 &&
          reviews.map((review) => <Review key={review._id} {...review} />)}
      </div>
    </>
  );
}

ReviewList.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.shape(reviewPropTypes)).isRequired,
  setIsModal: PropTypes.func.isRequired,
  setRatings: PropTypes.func.isRequired,
};

export default ReviewList;
