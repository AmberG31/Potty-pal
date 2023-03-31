import React from 'react';
import PropTypes from 'prop-types';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

function ToiletInfo({ toiletData }) {
  return (
    <div className="my-2 flex flex-col md:flex-row">
      <div className="flex-shrink-0 md:mr-4 md:flex-row">
        <img
          src="https://picsum.photos/500/500"
          alt="toilet"
          className="mx-auto h-auto rounded-md object-cover"
        />
      </div>
      <div className="mx-auto my-3 items-center justify-center p-2">
        <h2 className="text-2xl font-bold ">Toilet Info</h2>
        <div className="my-2 flex items-center gap-x-2 text-xl">
          <span className="font-semibold">Name:</span>
          <span className="capitalize">{toiletData?.name}</span>
        </div>
        <div className="my-2 flex items-center gap-x-2 text-xl">
          <span className="font-semibold">Accessible:</span>
          <span className="flex justify-center">
            {toiletData?.accessible ? (
              <CheckCircleIcon className="h-8 w-8 text-green-500" />
            ) : (
              <XCircleIcon className="h-8 w-8 text-red-500" />
            )}
          </span>
        </div>
        <div className="my-2 flex items-center gap-x-2 text-xl">
          <span className="font-semibold">Baby Changing: </span>
          <span className="flex justify-center">
            {toiletData?.babyChanging ? (
              <CheckCircleIcon className="h-8 w-8 text-green-500" />
            ) : (
              <XCircleIcon className="h-8 w-8 text-red-500" />
            )}
          </span>
        </div>
        <div className="my-2 flex items-center gap-x-2 text-xl">
          <span className="font-semibold">Price: </span>
          <span>
            <span>£</span>
            {toiletData?.price?.$numberDecimal ?? 'Free'}
          </span>
        </div>
      </div>
    </div>
  );
}

ToiletInfo.propTypes = {
  toiletData: PropTypes.shape({
    name: PropTypes.string,
    babyChanging: PropTypes.bool,
    accessible: PropTypes.bool,
    price: PropTypes.number,
    address: PropTypes.string,
    city: PropTypes.string,
    postcode: PropTypes.string,
  }).isRequired,
};

export default ToiletInfo;
