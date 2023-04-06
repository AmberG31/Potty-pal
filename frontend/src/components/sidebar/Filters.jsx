import React, { useRef, useState } from 'react';
import {
  AdjustmentsVerticalIcon,
  ChevronRightIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/solid';
import PropTypes from 'prop-types';

function Filters({
  setIsAccessible,
  setIsBabyChanging,
  setIsFree,
  setIsUnisex,
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="my-2 mt-4 rounded-lg border p-2 px-4">
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
        <div className="my-4 grid gap-2 lg:grid-cols-2">
          <CheckBoxComponent
            name="Baby Changing"
            filterSetter={setIsBabyChanging}
          />
          <CheckBoxComponent name="Accessible" filterSetter={setIsAccessible} />
          <CheckBoxComponent name="Unisex" filterSetter={setIsUnisex} />
          <CheckBoxComponent name="Free" filterSetter={setIsFree} />
        </div>
      )}
    </div>
  );
}

function CheckBoxComponent({ name, filterSetter }) {
  const tag = name.toLowerCase().split(' ').join('-');
  const inputRef = useRef();

  const onChangeHandler = () => {
    filterSetter(inputRef.current.checked);
  };

  return (
    <div>
      <label
        htmlFor={tag}
        className="relative inline-flex cursor-pointer items-center"
      >
        <input
          type="checkbox"
          ref={inputRef}
          onChange={onChangeHandler}
          id={tag}
          className="peer sr-only"
        />
        <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full" />
        <span className="text-md ml-3 font-semibold text-gray-900 dark:text-gray-300">
          {name}
        </span>
      </label>
    </div>
  );
}

Filters.propTypes = {
  setIsBabyChanging: PropTypes.func.isRequired,
  setIsFree: PropTypes.func.isRequired,
  setIsAccessible: PropTypes.func.isRequired,
  setIsUnisex: PropTypes.func.isRequired,
};

CheckBoxComponent.propTypes = {
  name: PropTypes.string.isRequired,
  filterSetter: PropTypes.func.isRequired,
};

export default Filters;
