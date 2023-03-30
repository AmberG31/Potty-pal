import axios from "axios";
import React, { useRef, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../context/AuthContext";

const AddToilet = ({ setRefresh }) => {
  const nameInputRef = useRef();
  const babyChangingInputRef = useRef();
  const accessibleInputRef = useRef();
  const priceInputRef = useRef();
  const streetAddressInputRef = useRef();
  const cityInputRef = useRef();
  const postcodeInputRef = useRef();
  const { token, tokenHandler } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    let config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const data = {
      name: nameInputRef.current.value,
      babyChanging: babyChangingInputRef.current.value,
      accessible: accessibleInputRef.current.value,
      price: parseFloat(priceInputRef.current.value),
      address: {
        address: streetAddressInputRef.current.value,
        city: cityInputRef.current.value,
        postcode: postcodeInputRef.current.value,
      },
    };

    const response = await axios.post("/toilets", data, config);

    if (response.status !== 201) {
      throw new Error("Failed to add toilet");
    } else {
      tokenHandler(response.data.token);
      nameInputRef.current.value = "";
      babyChangingInputRef.current.value = "";
      accessibleInputRef.current.value = "";
      priceInputRef.current.value = "";
      streetAddressInputRef.current.value = "";
      cityInputRef.current.value = "";
      postcodeInputRef.current.value = "";
    }
  };

  return (
    <>
      <div className="rounded-md bg-gray-100 px-4 py-6 shadow-md">
        <form className="" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4">
            <label className="font-semibold" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              ref={nameInputRef}
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            <label className="font-semibold" htmlFor="babyChanging">
              Baby Changing
            </label>
            <input
              type="checkbox"
              id="babyChanging"
              value="1"
              ref={babyChangingInputRef}
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />

            <label className="font-semibold" htmlFor="accessible">
              Accessible
            </label>
            <input
              type="checkbox"
              id="accessible"
              value="1"
              ref={accessibleInputRef}
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />

            <label className="font-semibold" htmlFor="price">
              Price
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-600">
                £
              </span>
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
            <hr className="my-6 border-gray-300" />
            <div className="grid grid-cols-1 gap-4">
              <label className="font-semibold" htmlFor="streetAddress">
                Street Address
              </label>
              <input
                type="text"
                id="streetAddress"
                ref={streetAddressInputRef}
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />

              <label className="font-semibold" htmlFor="city">
                City
              </label>
              <input
                type="text"
                id="city"
                ref={cityInputRef}
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />

              <label className="font-semibold" htmlFor="postcode">
                Postcode
              </label>
              <input
                type="text"
                id="postcode"
                ref={postcodeInputRef}
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
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
    </>
  );
};

AddToilet.propTypes = {
  setRefresh: PropTypes.func.isRequired,
};

export default AddToilet;
