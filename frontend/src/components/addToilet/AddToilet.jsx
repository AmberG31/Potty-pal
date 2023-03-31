import axios from 'axios';
import React, { useRef, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

function AddToilet() {
  const nameInputRef = useRef(null);
  const babyChangingRef = useRef(null);
  const accessibleRef = useRef(null);
  const priceInputRef = useRef(null);
  const streetAddressInputRef = useRef(null);
  const cityInputRef = useRef(null);
  const postcodeInputRef = useRef(null);
  const { token, tokenHandler } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    const data = {
      name: nameInputRef.current.value,
      babyChanging: babyChangingRef.current.checked,
      accessible: accessibleRef.current.checked,
      price: parseFloat(priceInputRef.current.value),
      address: {
        address: streetAddressInputRef.current.value,
        city: cityInputRef.current.value,
        postcode: postcodeInputRef.current.value,
      },
    };

    const response = await axios.post('/toilets', data, config);

    if (response.status !== 201) {
      throw new Error('Failed to add toilet');
    } else {
      tokenHandler(response.data.token);
      nameInputRef.current.value = '';
      babyChangingRef.current.value = '';
      accessibleRef.current.value = '';
      priceInputRef.current.value = '';
      streetAddressInputRef.current.value = '';
      cityInputRef.current.value = '';
      postcodeInputRef.current.value = '';
    }
  };

  // !TODO: Centre the form so it doesn't look so ugly

  return (
    <div className="items-center justify-center py-4">
      <div className="rounded-md bg-gray-100 px-4 py-6 shadow-md">
        <p className="mb-4 text-2xl font-bold">Add New Toilet</p>
        <form onSubmit={handleSubmit} data-cy="form">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex flex-col">
              <label className="mb-1 block font-semibold " htmlFor="name">
                <p className="text-gray-900">Name</p>
                <input
                  type="text"
                  id="name"
                  ref={nameInputRef}
                  required
                  className="mt-1 w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-blue-300 focus:text-gray-900 focus:ring focus:ring-blue-200 focus:ring-opacity-50 sm:w-1/2"
                />
              </label>
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="babyChanging"
                className="relative inline-flex cursor-pointer items-center"
              >
                <input
                  type="checkbox"
                  value=""
                  id="babyChanging"
                  className="peer sr-only"
                  ref={babyChangingRef}
                />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800" />
                <span className="text-md ml-3 font-semibold text-gray-900 dark:text-gray-300">
                  Baby Changing Facilities Available
                </span>
              </label>
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="accessible"
                className="relative inline-flex cursor-pointer items-center"
              >
                <input
                  type="checkbox"
                  value=""
                  id="accessible"
                  className="peer sr-only"
                  ref={accessibleRef}
                />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800" />
                <span className="text-md ml-3 font-semibold text-gray-900 dark:text-gray-300">
                  Accessible Facilities
                </span>
              </label>
            </div>
            <div className="flex flex-col">
              <label className="mb-1 block font-semibold" htmlFor="price">
                <p className="text-gray-900">Price</p>
                <div className="relative mt-1">
                  <input type="hidden" name="price" value="0.00" />
                  <p className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-600">
                    £
                  </p>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    id="price"
                    ref={priceInputRef}
                    placeholder="0.00"
                    className="rounded-md border-gray-300 py-2 pl-8 pr-2 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </div>
              </label>
            </div>
            <div className="flex flex-col">
              <label
                className="mb-1 block font-semibold"
                htmlFor="streetAddress"
              >
                <p className="text-gray-900">Street Address</p>
                <input
                  type="text"
                  id="streetAddress"
                  ref={streetAddressInputRef}
                  required
                  className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 sm:w-1/2"
                />
              </label>
            </div>
            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="city">
                <p className="text-gray-900">City</p>
                <input
                  type="text"
                  id="city"
                  ref={cityInputRef}
                  required
                  className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 sm:w-1/2"
                />
              </label>
            </div>
            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="postcode">
                <p className="text-gray-900">Postcode</p>
                <input
                  type="text"
                  id="postcode"
                  ref={postcodeInputRef}
                  required
                  className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 sm:w-1/2"
                />
              </label>
            </div>
          </div>
          <button
            className="mt-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            type="submit"
            value="Submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddToilet;
