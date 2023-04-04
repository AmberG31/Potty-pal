/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import {
  AdjustmentsVerticalIcon,
  ChevronRightIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/solid';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import PropTypes from 'prop-types';
import ToiletList from '../toiletList/ToiletList';
import { toiletPropTypes } from '../toilet/Toilet';

function Sidebar({ toilets, isLoading }) {
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
        {isLoading ? (
          <p className="mt-10 animate-pulse text-center text-lg font-medium text-gray-500">
            Loading...
          </p>
        ) : (
          <ToiletList toilets={toilets} />
        )}
      </div>
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
Sidebar.propTypes = {
  toilets: PropTypes.arrayOf(toiletPropTypes).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default Sidebar;
