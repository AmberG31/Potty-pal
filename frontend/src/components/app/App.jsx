import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Signup from '../../pages/SignUpPage';
import LoginPage from '../../pages/LoginPage';
import Home from '../../pages/Home';
import ToiletPage from '../../pages/ToiletPage';
import ModalList from '../ModalList';

import { AuthContext } from '../../context/AuthContext';
import MapPage from '../../pages/MapPage';

function App() {
  const { token } = useContext(AuthContext);
  return (
    <main className="mx-auto max-w-6xl">
      <ModalList />
      <Routes>
        <Route
          path="/login"
          element={token ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path="/signup"
          element={token ? <Navigate to="/" /> : <Signup />}
        />
        <Route path="/map" element={<MapPage />} />
        <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
        <Route path="/toilets/:id" element={<ToiletPage />} />
      </Routes>
    </main>
  );
}

export default App;
