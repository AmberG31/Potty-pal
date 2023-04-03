import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import SignupPage from '../../pages/SignUpPage';
import LoginPage from '../../pages/LoginPage';
import Home from '../../pages/Home';
import ToiletPage from '../../pages/ToiletPage';
import ModalList from '../modalList/ModalList';

import { AuthContext } from '../../context/AuthContext';
import MapPage from '../../pages/MapPage';
import ErrorPage from '../../pages/ErrorPage';
import MapLayoutPage from '../../pages/MapLayoutPage';

function App() {
  const { token } = useContext(AuthContext);
  return (
    <main className="mx-auto">
      <ModalList />
      <Routes>
        <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
        <Route
          path="/login"
          element={token ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path="/signup"
          element={token ? <Navigate to="/" /> : <SignupPage />}
        />
        <Route path="/map" element={<MapPage />} />
        <Route path="/layout" element={<MapLayoutPage />} />
        <Route path="/toilets/:id" element={<ToiletPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </main>
  );
}

export default App;
