import React, { useState } from 'react';

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Icon } from 'leaflet';

const toilet = new Icon({
  iconUrl: '/toilet.svg',
  iconSize: [40, 40],
});

function PopupContainer() {
  return (
    <div className="h-80 w-80 overflow-auto">
      <h2 className="text-xl font-bold">Toilet name</h2>
      <div className="text-gray-500">
        153 London High Street, Waterloo, W3 5PH
      </div>
      <div className="font-bold text-orange-600">3.5 *** (ratings)</div>
      <div className="text-xs text-gray-500"> based on 21 reviews</div>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwGdczG6yAHDyI-DJW0TmjHK0Id8CZfouh2FXAnQcuDG9oC5op0YYcIJhYYKj_ycbB7AQ&usqp=CAU"
        alt=""
        className="h-50 w-50 object-cover"
      />
      <div>
        <h3 className="text-m font-bold"> Facilities </h3>
        <p className="text-s" style={{ columnCount: 2 }}>
          Unisex Accesible Baby-changing Sanitary dressings Hot & cold water
        </p>
        <div>
          <h3 className="text-m font-bold"> Price </h3>
          <p className="text-s divide-y divide-slate-100">Free (add price)</p>
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
      scrollWheelZoom={false}
      className="h-full w-full"
    >
      {/* <TileLayer
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
        url={`https://api.mapbox.com/styles/v1/pottypal/clfwebyca00bm01o5bom9s0rl/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
      /> */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={center} icon={toilet}>
        <Popup>
          <PopupContainer />
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default Map;
