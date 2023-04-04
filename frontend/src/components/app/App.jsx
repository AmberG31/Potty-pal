import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Home from '../../pages/Home';
import LoginPage from '../../pages/LoginPage';
import SignupPage from '../../pages/SignUpPage';
import ToiletPage from '../../pages/ToiletPage';
import ModalList from '../modalList/ModalList';
import Navbar from '../navbar/Navbar';

import { AuthContext } from '../../context/AuthContext';
import MapPage from '../../pages/MapPage';
import ErrorPage from '../../pages/ErrorPage';
import MapLayoutPage from '../../pages/MapLayoutPage';
import AddToilet from '../addToilet/AddToilet';

function App() {
  const { token } = useContext(AuthContext);
  return (
    <main className="mx-auto">
      <ModalList />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/toilets/add"
          element={token ? <AddToilet /> : <Navigate to="/login" />}
        />
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
