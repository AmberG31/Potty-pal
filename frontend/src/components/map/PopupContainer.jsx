/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import PropTypes from 'prop-types';
import RatingStars from '../ratingStars/RatingStars';
import { toiletPropTypes } from '../toilet/Toilet';

function PopupContainer({ toilet }) {
  const { address, city, postcode } = toilet.address;
  const { photos, babyChanging, accessible, unisex, reviews, price } = toilet;

  const [ratings, setRatings] = useState({
    cleanliness: 0,
    availability: 0,
    aesthetics: 0,
    comfort: 0,
  });

  const imageUrl = photos.length === 0 ? '/no-image-uploaded.jpg' : photos[0];

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
    <>
      <h2 className="text-xl font-bold">{toilet.name}</h2>
      <div className="mt-1 text-gray-500">
        {address}, {city}, {postcode}
      </div>

      <div className="my-2 mb-4 flex items-center">
        {reviews.length === 0 ? (
          <div className="font-bold">No reviews</div>
        ) : (
          <>
            <span
              className="mr-2 font-bold text-primary"
              style={{ display: 'inline-block' }}
            >
              {calculateOverallRating().toFixed(1)}
            </span>
            <RatingStars rating={calculateOverallRating()} />
            <div className="text-xs text-gray-500">
              {' '}
              based on {reviews.length} reviews
            </div>
          </>
        )}
      </div>

      <img
        src={imageUrl}
        alt=""
        className="h-50 w-50 hidden object-cover lg:block"
      />
      <div className="my-4 grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-bold"> Features </h3>
          <div className="mt-2 flex flex-col gap-1">
            <FeatureIcon name="unisex" value={unisex} />
            <FeatureIcon name="accesible" value={accessible} />
            <FeatureIcon name="baby changing" value={babyChanging} />
          </div>
        </div>
        <div>
          <h3 className="font-bold"> Price </h3>
          <div className="mt-2">
            {price ? `£ ${price.$numberDecimal}` : 'Free'}
          </div>
        </div>
      </div>
      <button type="button" className="btn mt-2 w-full">
        Reviews
      </button>
    </>
  );
}

function FeatureIcon({ name, value }) {
  return (
    <div className="flex items-center">
      <CheckCircleIcon
        className={`mr-2 w-5 ${value ? 'text-green-400' : 'text-gray-300'}`}
      />
      <span className="break-all capitalize">{name}</span>
    </div>
  );
}

FeatureIcon.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
};

PopupContainer.propTypes = {
  toilet: toiletPropTypes.isRequired,
};

export default PopupContainer;
