import React from 'react';
import PropTypes from 'prop-types';
import timeCalculator from '../utils/timeCalculator';

function Review({
  clean, content, author, createdAt,
}) {
  return (
    <div
      className="flex items-center justify-between gap-6 rounded-md border p-4 px-8"
      data-cy="review"
    >
      <div className="flex items-center gap-6">
        {/* Fake user image */}
        <div className="w-20 overflow-hidden rounded-full border">
          <img
            data-cy="profilepic"
            src={`https://robohash.org/${author.id}`}
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
      <div>
        <p data-cy="cleanliness">
          cleanliness:
          {clean}
        </p>
      </div>
    </div>
  );
}

Review.propTypes = {
  clean: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  author: PropTypes.objectOf({
    id: PropTypes.string,
    username: PropTypes.string,
  }).isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default Review;
