import React, { useState } from 'react';

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Icon } from 'leaflet';

const toilet = new Icon({
  iconUrl: '/toilet.svg',
  iconSize: [40, 40],
});

function PopupContainer() {
  return (
    <div className="h-52 w-52">
      <h2 className="text-xl font-bold">Toilet A</h2>
      <p>Content</p>
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
