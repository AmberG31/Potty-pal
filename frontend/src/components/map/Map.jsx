import React, { useState } from 'react';
import { StarIcon, CheckCircleIcon } from '@heroicons/react/24/solid';

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Icon } from 'leaflet';

const toilet = new Icon({
  iconUrl: '/toilet.svg',
  iconSize: [60, 60],
});

function PopupContainer() {
  const rating = 4;

  return (
    <div className="h-80 w-80 overflow-auto">
      <h2 className="text-xl font-bold">My beautiful toilet</h2>
      <p className="text-gray-500">153 London High Street, Waterloo, W3 5PH</p>
      <div className="font-bold text-orange-600">
        <div className="flex items-center">
          <span className="mr-2" style={{ display: 'inline-block' }}>
            4
          </span>
          <StarIcon
            className={`w-4 ${
              rating >= 1 ? 'text-orange-600' : 'text-gray-400'
            }`}
          />
          <StarIcon
            className={`w-4 ${
              rating >= 2 ? 'text-orange-600' : 'text-gray-400'
            }`}
          />
          <StarIcon
            className={`w-4 ${
              rating >= 3 ? 'text-orange-600' : 'text-gray-400'
            }`}
          />
          <StarIcon
            className={`w-4 ${
              rating >= 4 ? 'text-orange-600' : 'text-gray-400'
            }`}
          />
          <StarIcon
            className={`w-4 ${
              rating >= 5 ? 'text-orange-600' : 'text-gray-400'
            }`}
          />
        </div>
      </div>
      <div className="text-xs text-gray-500"> based on 21 reviews</div>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwGdczG6yAHDyI-DJW0TmjHK0Id8CZfouh2FXAnQcuDG9oC5op0YYcIJhYYKj_ycbB7AQ&usqp=CAU"
        alt=""
        className="h-50 w-50 object-cover"
      />
      <div>
        <h3 className="text-m font-bold"> Facilities </h3>
        <p className="text-s grid grid-cols-2 gap-2">
          <div className="flex items-center">
            <CheckCircleIcon className="w-3 text-green-400" />
            <span className="break-all">Unisex </span>
          </div>
          <div className="flex items-center">
            <CheckCircleIcon className="w-3 text-green-400" />
            <span className="break-all">Accesible </span>
          </div>
          <div className="flex items-center">
            <CheckCircleIcon className="w-3 text-gray-400" />
            <span className="break-all">Baby-changing </span>
          </div>
          <div className="flex items-center">
            <CheckCircleIcon className="w-3 text-gray-400" />
            <span className="break-all">Sanitary dressings </span>
          </div>
          <div className="flex items-center">
            <CheckCircleIcon className="w-3 text-green-400" />
            <span className="break-all">Hot &amp; cold water </span>
          </div>
          <div className="flex items-center">
            <CheckCircleIcon className="w-3 text-gray-400" />
            <span className="break-all">Toilet paper </span>
          </div>
        </p>
        <div>
          <h3 className="text-m font-bold"> Price </h3>
          <p className="text-s divide-y divide-slate-100">Free</p>
        </div>
      </div>
      <div className="text-right">
        <button type="button" className="btn w-20">
          Reviews
        </button>
      </div>
    </div>
  );
}

function Map() {
  const [center] = useState([51.505, -0.09]);

  return (
    <MapContainer
      center={center}
      zoom={16}
      scrollWheelZoom
      className="h-full w-full"
    >
      <TileLayer
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
        url={`https://api.mapbox.com/styles/v1/pottypal/clfwebyca00bm01o5bom9s0rl/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
      />
      {/* <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      /> */}
      <Marker position={center} icon={toilet}>
        <Popup>
          <PopupContainer />
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default Map;
