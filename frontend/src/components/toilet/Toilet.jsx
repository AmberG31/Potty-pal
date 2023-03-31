import React from 'react';
import PropTypes from 'prop-types';
import {
  ArrowRightCircleIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

function Toilet({ toilet }) {
  return (
    <div data-cy="toilet">
      {/* All of the toilet information should be rendered here */}
      <div className="flex gap-x-4 rounded-md bg-gray-50 shadow-md">
        <div id="toilet-photo" className="flex items-center">
          <img
            src="https://picsum.photos/500/500"
            alt="toilet"
            className="h-full max-h-32 w-auto rounded-md rounded-r-none object-cover object-center"
          />
        </div>
        <div id="toilet-info" className="p-2">
          <p className="gap-y-2 text-2xl font-bold capitalize">{toilet.name}</p>
          <div className="flex gap-x-2">
            <p className=" font-semibold">Accessible</p>
            <p id="accessible-info">
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
            <p className="">
              {toilet.price?.$numberDecimal
                ? `£ ${toilet.price.$numberDecimal}`
                : 'Free'}
            </p>
          </div>
        </div>
        <div className="ml-auto flex items-center" id="more-info-button">
          <Link to={`/toilets/${toilet._id}`} className="cursor-pointer">
            <ArrowRightCircleIcon className="h-14 w-14 justify-center text-blue-500 hover:text-blue-600" />
          </Link>
        </div>
      </div>
    </div>
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
  reviews: PropTypes.arrayOf(PropTypes.string),
  createdAt: PropTypes.string,
  updatedAt: PropTypes.string,
  __v: PropTypes.number,
});

Toilet.propTypes = { toilet: toiletPropTypes.isRequired };

export default Toilet;
