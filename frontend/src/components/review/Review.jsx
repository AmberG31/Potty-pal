/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import timeCalculator from '../../utils/timeCalculator';
import RatingStars from '../ratingStars/RatingStars';

function Review({
  clean,
  content,
  author,
  createdAt,
  aesthetics,
  comfort,
  availability,
}) {
  return (
    <div
      className="flex flex-col justify-between gap-2 rounded-md border lg:flex-row lg:items-center lg:gap-6"
      data-cy="review"
    >
      <div className="flex flex-1 items-center gap-6 p-6 lg:p-8">
        {/* Fake user image */}
        <div className="w-20 overflow-hidden rounded-full border">
          <img
            data-cy="profilepic"
            src={`https://robohash.org/${author._id}`}
            alt=""
            className="object-cover"
          />
        </div>
        {/* Contents */}
        <div>
          <div className="flex gap-3">
            <span className="font-bold capitalize" data-cy="username">
              {author.username}
            </span>
            <span className="-z-10 opacity-50" data-cy="createdAt">
              {timeCalculator(createdAt)}
            </span>
          </div>
          <div className="mt-2 text-lg" data-cy="content">
            {content}
          </div>
        </div>
      </div>
      {/* Rating */}
      <div className="flex flex-col items-center gap-1 border-t p-6 lg:w-[35%] lg:border-0 lg:border-l lg:p-8">
        <div
          data-cy="cleanliness"
          className="grid w-full grid-cols-2 place-items-center"
        >
          <p>Cleanliness: </p>
          <RatingStars rating={clean} />
        </div>
        <div
          data-cy="availability"
          className="grid w-full grid-cols-2 place-items-center"
        >
          <p>Availability:</p>
          <RatingStars rating={availability} />
        </div>
        <div
          data-cy="aesthetics"
          className="grid w-full grid-cols-2 place-items-center"
        >
          <p>Aesthetics:</p>
          <RatingStars rating={aesthetics} />
        </div>
        <div
          data-cy="comfort"
          className="grid w-full grid-cols-2 place-items-center"
        >
          <p>Comfort:</p>
          <RatingStars rating={comfort} />
        </div>
      </div>
    </div>
  );
}

export const reviewPropTypes = {
  _id: PropTypes.string.isRequired,
  clean: PropTypes.number.isRequired,
  comfort: PropTypes.number.isRequired,
  availability: PropTypes.number.isRequired,
  aesthetics: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  author: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
  createdAt: PropTypes.string.isRequired,
};

Review.propTypes = reviewPropTypes;

export default Review;
