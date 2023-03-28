import React from "react";
import { timeCalculator } from "../utils/timeCalculator";

const Review = ({ _id, clean, content, author, createdAt, updatedAt }) => {
  return (
    <div className="flex items-center justify-between gap-6 p-4 px-8 border rounded-md">
      <div className="flex gap-6 items-center">
        {/* Fake user image */}
        <div className="rounded-full border w-20 overflow-hidden">
          <img
            src={`https://robohash.org/${_id}`}
            alt=""
            className="object-cover"
          />
        </div>
        {/* Contents */}
        <div>
          <div className="flex gap-3">
            <span className="font-bold capitalize">{author.username}</span>
            <span className="opacity-50">{timeCalculator(createdAt)}</span>
          </div>
          <div className="text-lg mt-2">{content}</div>
        </div>
      </div>
      {/* Rating */}
      <div>
        <p>cleanliness: {clean}</p>
      </div>
    </div>
  );
};

export default Review;
