import { StarIcon } from '@heroicons/react/24/solid';
import PropTypes from 'prop-types';
import React from 'react';

function RatingStars({ rating }) {
  return (
    <div className="flex text-primary">
      {Array.from({ length: rating }, () => (
        <StarIcon key={crypto.randomUUID()} className="w-5" />
      ))}
      {Array.from({ length: 5 - Math.floor(rating) }, () => (
        <StarIcon key={crypto.randomUUID()} className="w-5 text-gray-100" />
      ))}
    </div>
  );
}

RatingStars.propTypes = {
  rating: PropTypes.number.isRequired,
};

export default RatingStars;
