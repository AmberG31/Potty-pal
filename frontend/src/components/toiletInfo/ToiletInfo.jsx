import React from 'react';
import PropTypes from 'prop-types';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import RatingStars from '../ratingStars/RatingStars';

function ToiletInfo({ toiletData }) {
  const rating = 4.23;
  const { address, city, postcode } = toiletData.address;
  const { babyChanging, accessible } = toiletData;
  return (
    <div>
      <div className="my-10">
        <h1 className="text-3xl font-bold">{toiletData.name}</h1>
        <p className="mt-2 text-lg text-gray-400">{`${address}, ${city}, ${postcode}`}</p>
        <div className="mt-2 flex items-center gap-3 text-lg font-semibold text-primary">
          {rating}
          <RatingStars rating={rating} />
          <p className="text-base font-light text-gray-400">
            based on 21 reviews
          </p>
        </div>
      </div>
      <div className="flex gap-8">
        {/* Photos */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold">Photos</h2>
          <div className="mt-2">
            <img src={toiletData.photos[1]} alt="" />
          </div>
        </div>
        <div className="flex w-[40%] flex-col gap-8">
          {/* Map */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold">Map</h2>
            <div className="mt-2">123</div>
          </div>
          {/* Overall Ratings */}
          <div>
            <h2 className="text-2xl font-bold">Overall Ratings</h2>
            <div className="mt-4 flex flex-col gap-3 rounded-lg border p-6">
              <Rating name="Cleanliness" rating={3.21} />
              <Rating name="Cleanliness" rating={4.13} />
              <Rating name="Cleanliness" rating={1.21} />
              <Rating name="Cleanliness" rating={2.21} />
            </div>
          </div>
        </div>
      </div>
      {/* Facilities */}
      <div className="my-10">
        <h2 className="text-2xl font-bold">Facilities</h2>
        <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-6">
          <FacilityIcon name="Baby Changing" isChecked={babyChanging} />
          <FacilityIcon name="Accessible" isChecked={accessible} />
          <FacilityIcon name="Accessible" isChecked={accessible} />
          <FacilityIcon name="Accessible" isChecked={accessible} />
          <FacilityIcon name="Accessible" isChecked={accessible} />
          <FacilityIcon name="Accessible" isChecked={accessible} />
          <FacilityIcon name="Accessible" isChecked={accessible} />
          <FacilityIcon name="Accessible" isChecked={accessible} />
          <FacilityIcon name="Accessible" isChecked={accessible} />
          <FacilityIcon name="Accessible" isChecked={accessible} />
        </div>
      </div>
    </div>
  );
}

function Rating({ name, rating }) {
  return (
    <div className="flex justify-between">
      {name}
      <div className="flex gap-3">
        <p className="text-primary">{rating}</p>
        <RatingStars rating={rating} />
      </div>
    </div>
  );
}

function FacilityIcon({ name, isChecked }) {
  return (
    <p className="flex items-center gap-4">
      <CheckCircleIcon
        className={`h-8 w-8 ${isChecked ? 'text-green-500' : 'text-gray-200'}`}
      />
      {name}
    </p>
  );
}

Rating.propTypes = {
  name: PropTypes.string.isRequired,
  rating: PropTypes.bool.isRequired,
};

FacilityIcon.propTypes = {
  name: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
};

ToiletInfo.propTypes = {
  toiletData: PropTypes.shape({
    name: PropTypes.string,
    babyChanging: PropTypes.bool,
    accessible: PropTypes.bool,
    price: PropTypes.shape({
      $numberDecimal: PropTypes.string,
    }),
    address: PropTypes.shape({
      address: PropTypes.string,
      city: PropTypes.string,
      postcode: PropTypes.string,
      __v: PropTypes.number,
      _id: PropTypes.string,
    }),
    city: PropTypes.string,
    postcode: PropTypes.string,
    photos: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default ToiletInfo;
