import React, { useContext, useEffect, useState } from 'react';

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Icon } from 'leaflet';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import PopupContainer from './PopupContainer';

const toiletIcon = new Icon({
  iconUrl: '/toilet.svg',
  iconSize: [60, 60],
});

const makersIcon = new Icon({
  iconUrl: '/makers.svg',
  iconSize: [60, 60],
});

function Map() {
  const { token } = useContext(AuthContext);
  const [toiletData, setToiletData] = useState([]);

  const [center] = useState(['51.52351', '-0.0839073']);
  const [refresh] = useState(false);
  const fetchData = async () => {
    try {
      // fetch data from API
      const response = await axios.get('/toilets', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // assign state
      setToiletData(response.data.toilets);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);

  return (
    <MapContainer
      center={center}
      zoom={16}
      scrollWheelZoom
      className="h-full min-h-[60vh] w-full"
    >
      {/* <TileLayer
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
        url={`https://api.mapbox.com/styles/v1/pottypal/clfwebyca00bm01o5bom9s0rl/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
      /> */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={center} icon={makersIcon}>
        <Popup>We are now here!</Popup>
      </Marker>
      {toiletData.map((toilet) => (
        <Marker
          key={toilet._id}
          position={[
            toilet.address.geolocation[0],
            toilet.address.geolocation[1],
          ]}
          icon={toiletIcon}
        >
          <Popup>
            <PopupContainer toilet={toilet} />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Map;
