import React from "react";
import { Link } from "react-router-dom";

// import ToiletList from "../toiletList/ToiletList";

const Home = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold my-6">Home</h1>
      <Link to="/toilet/1">
        <div className="border p-2 text-center my-3">Toilet page</div>
      </Link>
      <hr />
      {/* <ToiletList /> */}
    </div>
  );
};

export default Home;