import React from 'react';
import { Outlet } from 'react-router-dom';

import Navbar from '../components/navbar/Navbar';

function MainLayout() {
  return (
    <div className="flex h-[100vh] flex-col">
      <header className="z-20">
        <Navbar />
      </header>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
export default MainLayout;
