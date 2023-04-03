import axios from 'axios';
import React, { useRef, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import ImageUploader from '../imageUploader/ImageUploader';

function AddToilet() {
  const [images, setImages] = useState([]);
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
      photos: images.map(({ image }) => image),
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
      setImages([]);
      useNavigate('/');
    }
  };

  const fileSizeCalculator = () => {
    let total = 0;
    images.forEach((file) => {
      total += file.size / 1024 / 1024;
    });
    return total;
  };

  // !TODO: Centre the form so it doesn't look so ugly

  return (
    <div className="items-center justify-center py-4">
      <div className="rounded-md px-4 py-6 shadow-md">
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
                  className="form-input form-width"
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
                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800" />
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
                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800" />
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
                    className="form-input py-2 pl-8 pr-2"
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
                  className="form-input form-width"
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
                  className="form-input form-width"
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
                  className="form-input form-width"
                />
              </label>
            </div>
            <ImageUploader
              images={images}
              setImages={setImages}
              fileSizeCalculator={fileSizeCalculator}
            />
          </div>
          <button
            className="btn mt-4 min-w-[200px]"
            type="submit"
            value="Submit"
            disabled={fileSizeCalculator() > 5}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddToilet;
