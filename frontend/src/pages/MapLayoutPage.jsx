import React from 'react';
import Map from '../components/map/Map';
import Navbar from '../components/navbar/Navbar';
import Sidebar from '../components/sidebar/Sidebar';

function MapLayoutPage() {
  return (
    <div className="flex h-[100vh] flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1">
          <Map />
        </div>
      </div>
    </div>
  );
}

export default MapLayoutPage;
