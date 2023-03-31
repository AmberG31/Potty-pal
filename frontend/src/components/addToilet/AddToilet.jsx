import axios from 'axios';
import React, { useRef, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

function AddToilet() {
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

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    
    async function convertAddressToGeolocation({address, city, postcode}) {
      const nominatimEndpoint = 'https://nominatim.openstreetmap.org/search?';

      //  https://nominatim.openstreetmap.org/search?city=terry&format=json

      // address = "18 New Street" => "18_new_street"

      const convertToCorrectAddress = (string) => {
        return string
      }

      const fetchingURL = `${nominatimEndpoint}street=${address}&city=${city}&postcode=${postcode}`

      // city
      // street
      // postcode

      // const query = `q=${encodeURIComponent(address)}&format=json&limit=1`;
    
      // try {
      //   const response = await fetch(`${nominatimEndpoint}?${query}`);
      //   const data = await response.json();
    
      //   if (data.length > 0) {
      //     const { lat, lon } = data[0];
      //     const geolocation = { type: 'Point', coordinates: [lon, lat] };
    
      //     // create a new Address document using the schema
      //     const newAddress = new Address({ geolocation });
      //     await newAddress.save();
    
      //     return geolocation;
      //   } else {
      //     throw new Error('No results found');
      //   }
      // } catch (error) {
      //   console.error(error);
      //   throw new Error('Failed to convert address to geolocation');
      // }
    }

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
      geolocation:{ convertAddressToGeolocation(address)
      }
    };

    const response = await axios.post('/toilets', data, config);

    if (response.status !== 201) {
      throw new Error('Failed to add toilet');
    } else {
      tokenHandler(response.data.token);
      nameInputRef.current.value = '';
      babyChangingInputRef.current.value = '';
      accessibleInputRef.current.value = '';
      priceInputRef.current.value = '';
      streetAddressInputRef.current.value = '';
      cityInputRef.current.value = '';
      postcodeInputRef.current.value = '';
    }
  };

  return (
    <div className="rounded-md bg-gray-100 px-4 py-6 shadow-md">
      <form className="" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4">
          <label className="font-semibold" htmlFor="name">
            Name
            <input
              type="text"
              id="name"
              ref={nameInputRef}
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </label>

          <label className="font-semibold" htmlFor="babyChanging">
            Baby Changing
            <input
              type="checkbox"
              id="babyChanging"
              value="1"
              ref={babyChangingInputRef}
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </label>

          <label className="font-semibold" htmlFor="accessible">
            Accessible
            <input
              type="checkbox"
              id="accessible"
              value="1"
              ref={accessibleInputRef}
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </label>

          <label className="font-semibold" htmlFor="price">
            Price
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
          </label>

          <hr className="my-6 border-gray-300" />
          <div className="grid grid-cols-1 gap-4">
            <label className="font-semibold" htmlFor="streetAddress">
              Street Address
              <input
                type="text"
                id="streetAddress"
                ref={streetAddressInputRef}
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </label>

            <label className="font-semibold" htmlFor="city">
              City
              <input
                type="text"
                id="city"
                ref={cityInputRef}
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </label>

            <label className="font-semibold" htmlFor="postcode">
              Postcode
              <input
                type="text"
                id="postcode"
                ref={postcodeInputRef}
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
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
  );
}

export default AddToilet;
