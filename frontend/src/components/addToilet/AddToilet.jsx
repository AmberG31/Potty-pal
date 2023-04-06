import axios from 'axios';
import React, { useRef, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthContext } from '../../context/AuthContext';
import ImageUploader from '../imageUploader/ImageUploader';
import { ApiUrlContext } from '../../context/ApiUrlContext';
import { ModalContext } from '../../context/ModalContext';

function AddToilet() {
  const [images, setImages] = useState([]);
  const nameInputRef = useRef();
  const babyChangingRef = useRef();
  const accessibleRef = useRef();
  const priceInputRef = useRef();
  const streetAddressInputRef = useRef();
  const genderNeutralRef = useRef();
  const cityInputRef = useRef();
  const postcodeInputRef = useRef();
  const { token, tokenHandler } = useContext(AuthContext);
  const { url } = useContext(ApiUrlContext);
  const { pushModal } = useContext(ModalContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    const convertAddressToGeolocation = async ({ address, city, postcode }) => {
      const nominatimEndpoint = 'https://nominatim.openstreetmap.org/search?';
      const fetchingURL = `${nominatimEndpoint}street=${address}&city=${city}&postcode=${postcode}&format=json`;
      const response = await axios.get(fetchingURL);
      const { lat, lon } = response.data[0];
      return [lat, lon];
    };

    const address = {
      address: streetAddressInputRef.current.value,
      city: cityInputRef.current.value,
      postcode: postcodeInputRef.current.value,
      geolocation: await convertAddressToGeolocation({
        address: streetAddressInputRef.current.value,
        city: cityInputRef.current.value,
        postcode: postcodeInputRef.current.value,
      }),
    };

    const data = {
      name: nameInputRef.current.value,
      babyChanging: babyChangingRef.current.checked,
      unisex: genderNeutralRef.current.checked,
      accessible: accessibleRef.current.checked,
      price: parseFloat(priceInputRef.current.value),
      address,
      photos: images.map(({ image }) => image),
    };

    try {
      const response = await axios.post(`${url}/toilets`, data, config);

      if (response.status !== 201) {
        throw new Error('Failed to add toilet');
      }
      tokenHandler(response.data.token);
      pushModal({
        type: 'success',
        message: 'A new toilet has been added!',
      });
      navigate('/');
    } catch (error) {
      pushModal({
        type: 'error',
        message: error.response.data.message,
      });
    }
    nameInputRef.current.value = '';
    babyChangingRef.current.value = '';
    accessibleRef.current.value = '';
    priceInputRef.current.value = '';
    streetAddressInputRef.current.value = '';
    cityInputRef.current.value = '';
    postcodeInputRef.current.value = '';
    genderNeutralRef.current.value = '';
    setImages([]);
  };

  const fileSizeCalculator = () => {
    let total = 0;
    images.forEach((file) => {
      total += file.size / 1024 / 1024;
    });
    return total;
  };

  return (
    <div className="relative flex h-full items-center justify-center px-4 py-10">
      <img
        src="/bg.jpeg"
        alt="background"
        className="absolute -z-10 h-full w-full object-cover opacity-40"
      />
      <div className="mx-auto w-full items-center justify-center rounded-lg bg-white p-10 shadow-md xl:max-w-6xl">
        <div className="rounded-md px-4 py-6">
          <p className="mb-4 text-2xl font-bold">Add New Toilet</p>
          <form onSubmit={handleSubmit} data-cy="form">
            <div className="flex flex-col gap-4">
              {/* Name */}
              <label className="mb-1 block " htmlFor="name">
                <p className="font-bold text-gray-900">Name</p>
                <input
                  type="text"
                  id="name"
                  ref={nameInputRef}
                  required
                  className="form-input w-full"
                />
              </label>
              {/* Facilities */}
              <div className="my-3">
                <p className="font-bold text-gray-900">Features</p>
                <div className="mt-3 grid gap-y-4 lg:grid-cols-3">
                  <ToggleInput
                    name="baby changing"
                    reference={babyChangingRef}
                  />
                  <ToggleInput name="accessible" reference={accessibleRef} />
                  <ToggleInput
                    name="gender neutral"
                    reference={genderNeutralRef}
                  />
                </div>
              </div>
              {/* Price */}
              <div className="mb-3 flex flex-col">
                <label className="mb-1 block" htmlFor="price">
                  <p className="font-bold text-gray-900">Price</p>
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
              {/* Address */}
              <div className="flex flex-col gap-y-2">
                <p className="mb-2 font-bold text-gray-900">Address</p>
                <AddressInput name="street" reference={streetAddressInputRef} />
                <div className="grid grid-cols-2 gap-4">
                  <AddressInput name="city" reference={cityInputRef} />
                  <AddressInput name="postcode" reference={postcodeInputRef} />
                </div>
              </div>
              {/* Image Uploader */}
              <ImageUploader
                images={images}
                setImages={setImages}
                fileSizeCalculator={fileSizeCalculator}
              />
            </div>
            <button
              className="btn mt-4 w-full p-4"
              type="submit"
              value="Submit"
              disabled={fileSizeCalculator() > 5}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function ToggleInput({ name, reference }) {
  const tag = name.split(' ').join('-');

  return (
    <label
      htmlFor={tag}
      className="relative inline-flex cursor-pointer items-center"
    >
      <input
        type="checkbox"
        value=""
        id={tag}
        className="peer sr-only"
        ref={reference}
      />
      <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800" />
      <span className="text-md ml-3 capitalize text-gray-900 dark:text-gray-300">
        {name}
      </span>
    </label>
  );
}

function AddressInput({ name, reference }) {
  const tag = name.split(' ').join('-');

  return (
    <label className="mb-1 block" htmlFor={tag}>
      <p className="capitalize text-gray-900">{name}</p>
      <input
        type="text"
        id={tag}
        ref={reference}
        required
        className="form-input w-full"
      />
    </label>
  );
}

ToggleInput.propTypes = {
  name: PropTypes.string.isRequired,
  reference: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
};

AddressInput.propTypes = {
  name: PropTypes.string.isRequired,
  reference: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
};

export default AddToilet;
