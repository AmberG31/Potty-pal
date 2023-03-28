import React from "react";
import { Link } from "react-router-dom";

import ReviewList from "../components/ReviewList.js";

const ToiletPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold my-6">Toilet Page</h1>
      <Link to="/">
        <div className="border p-2 text-center my-3">Home page</div>
      </Link>
      <hr />
      <ReviewList />
    </div>
  );
};

export default ToiletPage;
