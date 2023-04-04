import React from 'react';
import Map from '../components/map/Map';
import Sidebar from '../components/sidebar/Sidebar';

function MapLayoutPage() {
  return (
    <div className="flex h-full flex-1">
      <Sidebar />
      <div className="flex-1">
        <Map />
      </div>
    </div>
  );
}

export default MapLayoutPage;
