import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
// import Toilet from 'backend/models/toilet';
// import Address from 'backend/models/toilet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Icon } from 'leaflet';
import { AuthContext } from '../context/AuthContext';

const toiletIcon = new Icon({
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

function MapPage() {
  const { token } = useContext(AuthContext);
  const [toiletData, setToiletData] = useState([]);

  const [center] = useState(['51.505', '-0.09']);
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
      // console.log(response.data.toilets);
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
      scrollWheelZoom={false}
      className="fixed left-0 h-[100vh] w-full"
    >
      <TileLayer
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
        url={`https://api.mapbox.com/styles/v1/pottypal/clfwebyca00bm01o5bom9s0rl/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
      />
      {toiletData.map((toilet) => (
        <Marker
          key={toilet._id}
          position={[toilet.address.geolocation[0], toilet.address.geolocation[1]]}
          icon={toiletIcon}
        >
          <Popup>
            <PopupContainer toiletName={toilet.name} />
          </Popup>
        </Marker>
      ))}

    </MapContainer>
  );
}

export default MapPage;
