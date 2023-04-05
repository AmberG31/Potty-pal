/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { Icon } from 'leaflet';
import RatingStars from '../ratingStars/RatingStars';

function ToiletInfo({ toiletData, ratings }) {
  const [photoCount, setPhotoCount] = useState(0);
  const { address, city, postcode } = toiletData.address;
  const { babyChanging, accessible, reviews, unisex } = toiletData;
  const { cleanliness, availability, aesthetics, comfort } = ratings;

  const [center] = useState([51.505, -0.09]);
  const toilet = new Icon({
    iconUrl: '/toilet.svg',
    iconSize: [60, 60],
  });

  const calculateOverallRating = () =>
    (cleanliness + availability + aesthetics + comfort) / 4;

  const imageUrl =
    toiletData.photos.length === 0
      ? '/no-image-uploaded.jpg'
      : toiletData.photos[photoCount];

  const prevHandler = () => {
    if (photoCount === 0) {
      return;
    }
    setPhotoCount((prev) => prev - 1);
  };

  const nextHandler = () => {
    if (photoCount === toiletData.photos.length - 1) {
      setPhotoCount(0);
    } else {
      setPhotoCount((prev) => prev + 1);
    }
  };

  return (
    <>
      <div className="my-10">
        <h1 className="text-3xl font-bold">{toiletData.name}</h1>
        <p className="mt-2 text-lg text-gray-400">{`${address}, ${city}, ${postcode}`}</p>
        {reviews.length === 0 ? (
          <div className="mt-2 flex items-center gap-3 text-lg font-semibold">
            No reviews
          </div>
        ) : (
          <div className="mt-2 flex items-center gap-3 text-lg font-semibold text-primary">
            {calculateOverallRating().toFixed(1)}
            <RatingStars rating={calculateOverallRating()} />
            <p className="text-base font-light text-gray-400">
              based on {toiletData.reviews.length} reviews
            </p>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Photos */}
        <div className="flex flex-1 flex-col">
          <h2 className="text-2xl font-bold">Photos</h2>
          <div className="relative mt-2 h-full max-h-[40vh] w-full overflow-hidden">
            <img src={imageUrl} alt="" className="object-cover" />
          </div>
          {toiletData.photos.length !== 0 && (
            <div className="flex justify-between bg-black p-3 px-6 text-white">
              <button type="button" onClick={prevHandler}>
                {'<'} Prev
              </button>
              <p>
                {photoCount + 1} of {toiletData.photos.length}
              </p>
              <button type="button" onClick={nextHandler}>
                Next {'>'}
              </button>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-8 lg:w-[40%]">
          {/* Map */}
          <div>
            <h2 className="text-2xl font-bold">Map</h2>
            <MapContainer
              center={center}
              zoom={15}
              scrollWheelZoom
              className="mt-2 h-52 w-full"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={center} icon={toilet} />
            </MapContainer>
          </div>
          {/* Overall Ratings */}
          <div className="flex h-full flex-col">
            <h2 className="text-2xl font-bold">Overall Ratings</h2>
            <div className="mt-4 flex flex-col items-center justify-center gap-3 rounded-lg border p-10">
              {reviews.length === 0 ? (
                'No reviews'
              ) : (
                <>
                  <Rating name="Cleanliness" rating={cleanliness} />
                  <Rating name="Availability" rating={availability} />
                  <Rating name="Aesthetics" rating={aesthetics} />
                  <Rating name="Comfort" rating={comfort} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Facilities */}
      <div className="my-10">
        <h2 className="text-2xl font-bold">Features</h2>
        <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-6">
          <FacilityIcon name="Baby Changing" isChecked={babyChanging} />
          <FacilityIcon name="Accessible" isChecked={accessible} />
          <FacilityIcon name="Unisex" isChecked={unisex} />
        </div>
      </div>
    </>
  );
}

function Rating({ name, rating }) {
  return (
    <div className="flex w-full justify-between">
      {name}
      <div className="flex gap-3">
        <p className="text-primary">{rating.toFixed(1)}</p>
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
  rating: PropTypes.number.isRequired,
};

FacilityIcon.propTypes = {
  name: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
};

ToiletInfo.propTypes = {
  toiletData: PropTypes.shape({
    name: PropTypes.string,
    babyChanging: PropTypes.bool,
    unisex: PropTypes.bool,
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
    reviews: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  ratings: PropTypes.number.isRequired,
};

export default ToiletInfo;
