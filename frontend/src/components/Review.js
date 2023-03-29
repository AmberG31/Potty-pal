import React from "react";
import { timeCalculator } from "../utils/timeCalculator";

const Review = ({ clean, content, author, createdAt }) => {
  return (
    <div
      className="flex items-center justify-between gap-6 p-4 px-8 border rounded-md"
      data-cy="review"
    >
      <div className="flex gap-6 items-center">
        {/* Fake user image */}
        <div className="rounded-full border w-20 overflow-hidden">
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
            <span className="opacity-50" data-cy="createdAt">
              {timeCalculator(createdAt)}
            </span>
          </div>
          <div className="text-lg mt-2" data-cy="content">
            {content}
          </div>
        </div>
      </div>
      {/* Rating */}
      <div>
        <p data-cy="cleanliness">cleanliness: {clean}</p>
      </div>
    </div>
  );
};

export default Review;
