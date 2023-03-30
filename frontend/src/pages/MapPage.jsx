import React, { useState } from 'react';

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

function PopupContainer() {
  return (
    <div className="w-52 h-52">
      <p>123</p>
    </div>
  );
}

function MapPage() {
  const [center] = useState([51.505, -0.09]);

  return (
    <MapContainer center={center} zoom={15} scrollWheelZoom={false} className="h-[100vh] w-full">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={center}>
        <Popup>
          <PopupContainer />
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default MapPage;
