/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RatingStars from '../ratingStars/RatingStars';
import { reviewPropTypes } from '../review/Review';

function Toilet({ toilet }) {
  const [ratings, setRatings] = useState({
    cleanliness: 0,
    availability: 0,
    aesthetics: 0,
    comfort: 0,
  });

  const imageUrl =
    toilet.photos.length === 0 ? '/no-image-uploaded.jpg' : toilet.photos[0];

  const { reviews } = toilet;

  const calculateOverallRating = () =>
    (ratings.cleanliness +
      ratings.availability +
      ratings.aesthetics +
      ratings.comfort) /
    4;

  const calculateRating = () => {
    if (reviews.length === 0) {
      return;
    }
    let cleanlinessTotal = 0;
    let availabilitylinessTotal = 0;
    let aestheticsTotal = 0;
    let comfortTotal = 0;
    reviews.forEach((review) => {
      cleanlinessTotal += review.clean;
      availabilitylinessTotal += review.availability;
      aestheticsTotal += review.aesthetics;
      comfortTotal += review.comfort;
    });
    setRatings({
      cleanliness: cleanlinessTotal / reviews.length,
      availability: availabilitylinessTotal / reviews.length,
      aesthetics: aestheticsTotal / reviews.length,
      comfort: comfortTotal / reviews.length,
    });
  };

  useEffect(() => {
    calculateRating();
  }, []);

  return (
    <Link to={`/toilets/${toilet._id}`} className="cursor-pointer">
      <div data-cy="toilet">
        <div className="mt-4 flex flex-col gap-4">
          <div
            className="flex max-h-32 cursor-pointer overflow-hidden rounded-lg border hover:border-primary hover:bg-[#FFF8F0]"
            key={toilet._id}
          >
            <div id="toilet-photo" className="flex-0 relative w-32">
              <img
                src={imageUrl}
                alt="toilet"
                className="h-full w-full object-cover"
              />
            </div>
            <div
              id="toilet-info"
              className="flex flex-1 flex-col justify-center gap-1 p-8 py-6"
            >
              <div>
                <h4 className="text-xl font-bold">{toilet.name}</h4>
                <div className="mt-1 flex items-center gap-2 text-lg font-bold">
                  {reviews.length === 0 ? (
                    <div className="mt-2 text-lg font-medium text-gray-400">
                      No reviews
                    </div>
                  ) : (
                    <div className="mt-2 flex items-center gap-3 text-lg font-semibold text-primary">
                      {calculateOverallRating().toFixed(1)}
                      <RatingStars rating={calculateOverallRating()} />
                      <p className="text-sm font-light text-gray-400">
                        {toilet.reviews.length} reviews
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export const toiletPropTypes = PropTypes.shape({
  _id: PropTypes.string,
  name: PropTypes.string,
  accessible: PropTypes.bool,
  babyChanging: PropTypes.bool,
  price: PropTypes.shape({
    $numberDecimal: PropTypes.string,
  }),
  addedBy: PropTypes.shape({
    _id: PropTypes.string,
    username: PropTypes.string,
  }),
  reviews: PropTypes.arrayOf(PropTypes.shape(reviewPropTypes)),
  createdAt: PropTypes.string,
  updatedAt: PropTypes.string,
  __v: PropTypes.number,
  photos: PropTypes.arrayOf(PropTypes.string),
});

Toilet.propTypes = { toilet: toiletPropTypes.isRequired };

export default Toilet;
