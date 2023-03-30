import React from "react";
import {
  ArrowRightCircleIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const Toilet = ({ toilet }) => {
  return (
    <>
      {/* All of the toilet information should be rendered here */}
      <div className="flex gap-x-4 rounded-md bg-gray-50 p-6 shadow-md">
        <div id="toilet-photo" className="flex items-center">
          <img
            src="https://picsum.photos/500/500"
            alt="toilet"
            className="h-20 w-20 rounded-md"
          />
        </div>
        <div id="toilet-info">
          <p className="gap-y-2 text-2xl font-bold capitalize">{toilet.name}</p>
          <div className="flex gap-x-2">
            <p className=" font-semibold">Accessible</p>
            <p className="">
              {toilet.accessible ? (
                <CheckCircleIcon className="h-6 w-6 text-green-500" />
              ) : (
                <XCircleIcon className="h-6 w-6 text-red-500" />
              )}
            </p>
          </div>
          <div className="flex gap-x-2">
            <p className="font-semibold">Baby Changing</p>
            <p className="">
              {toilet.babyChanging ? (
                <CheckCircleIcon className="h-6 w-6 text-green-500" />
              ) : (
                <XCircleIcon className="h-6 w-6 text-red-500" />
              )}
            </p>
          </div>
          <div className="flex gap-x-2">
            <p className="font-semibold">Price: </p>
            <p className="">£ {toilet.price.$numberDecimal}</p>
          </div>
        </div>
        <div className="ml-auto flex items-center" id="more-info-button">
          <Link to={`/toilets/${toilet._id}`} className="cursor-pointer">
            <ArrowRightCircleIcon className="h-14 w-14 justify-center text-blue-500 hover:text-blue-600" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Toilet;
