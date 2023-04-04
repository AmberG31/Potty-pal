/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import {
  AdjustmentsVerticalIcon,
  ChevronRightIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/solid';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import PropTypes from 'prop-types';
import RatingStars from '../ratingStars/RatingStars';

const toilets = [
  {
    id: 1,
    name: 'Bloomsbury Central Baptist Church',
    rating: 3.4,
    imageURL:
      'https://www.esafety.gov.au/sites/default/files/2019-08/Remove%20images%20and%20video.jpg',
  },
  {
    id: 2,
    name: 'Toilet B',
    rating: 4.2,
    imageURL:
      'https://media.istockphoto.com/id/1322277517/photo/wild-grass-in-the-mountains-at-sunset.jpg?s=612x612&w=0&k=20&c=6mItwwFFGqKNKEAzv0mv6TaxhLN3zSE43bWmFN--J5w=',
  },
  {
    id: 3,
    name: 'Toilet C',
    rating: 1.1,
    imageURL:
      'https://www.esafety.gov.au/sites/default/files/2019-08/Remove%20images%20and%20video.jpg',
  },
  {
    id: 4,
    name: 'Toilet D',
    rating: 2,
    imageURL:
      'https://media.istockphoto.com/id/1322277517/photo/wild-grass-in-the-mountains-at-sunset.jpg?s=612x612&w=0&k=20&c=6mItwwFFGqKNKEAzv0mv6TaxhLN3zSE43bWmFN--J5w=',
  },
];

function Sidebar() {
  return (
    <div className="w-full max-w-[500px] border border-r-2 p-4">
      <FilterContainer />
      <div className="mt-8">
        <div className="flex gap-2">
          <InformationCircleIcon className="w-7" />
          <h3 className="text-xl font-bold">
            Nearby Toilets <span>{`(${toilets.length})`}</span>
          </h3>
        </div>
        <ToiletList />
      </div>
    </div>
  );
}

function ToiletList() {
  return (
    <div className="mt-4 flex flex-col gap-4">
      {toilets.map(({ id, name, rating, imageURL }) => (
        <div
          className="flex cursor-pointer overflow-hidden rounded-lg border hover:border-primary hover:bg-[#FFF8F0]"
          key={id}
        >
          <div className="flex-0 relative h-32 w-32">
            <img src={imageURL} alt="" className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-1 flex-col justify-center gap-1 p-8 py-6">
            <div>
              <h4 className="text-xl font-bold">{name}</h4>
              <div className="mt-1 flex items-center gap-2 text-lg font-bold text-primary">
                {rating}
                <RatingStars rating={rating} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function FilterContainer() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="my-2 rounded-lg border p-2 px-4">
      <button
        type="button"
        className="flex w-full items-center justify-between py-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-center gap-3">
          <AdjustmentsVerticalIcon className="w-7" />
          <p className="text-xl font-bold">Filters</p>
        </div>
        <div className="flex justify-center">
          {isOpen ? (
            <ChevronDownIcon className="w-5" />
          ) : (
            <ChevronRightIcon className="w-5" />
          )}
        </div>
      </button>
      {isOpen && (
        <>
          <div className="my-4 grid grid-cols-2 gap-2">
            <CheckBoxComponent name="Baby Changing" />
            <CheckBoxComponent name="Accessible" />
            <CheckBoxComponent name="Unisex" />
            <CheckBoxComponent name="Free" />
          </div>
          <button type="button" className="btn-outline my-2 w-full p-2 text-lg">
            Update results
          </button>
        </>
      )}
    </div>
  );
}

function CheckBoxComponent({ name }) {
  const tag = name.toLowerCase().split(' ').join('-');
  return (
    <div>
      <label
        htmlFor={tag}
        className="relative inline-flex cursor-pointer items-center"
      >
        <input type="checkbox" value="" id={tag} className="peer sr-only" />
        <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full" />
        <span className="text-md ml-3 font-semibold text-gray-900 dark:text-gray-300">
          {name}
        </span>
      </label>
    </div>
  );
}

CheckBoxComponent.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Sidebar;
