import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Home from '../../pages/Home';
import LoginPage from '../../pages/LoginPage';
import SignupPage from '../../pages/SignUpPage';
import ToiletPage from '../../pages/ToiletPage';
import ModalList from '../modalList/ModalList';

import { AuthContext } from '../../context/AuthContext';
import ErrorPage from '../../pages/ErrorPage';
import AddToilet from '../addToilet/AddToilet';
import MainLayout from '../../layouts/MainLayout';
import UserProfile from '../../pages/UserProfile';

function App() {
  const { token } = useContext(AuthContext);
  return (
    <>
      <ModalList />
      <Routes>
        <Route
          path="/login"
          element={token ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path="/signup"
          element={token ? <Navigate to="/" /> : <SignupPage />}
        />
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/toilets/add"
            element={token ? <AddToilet /> : <Navigate to="/login" />}
          />
          <Route path="/user/profile" element={<UserProfile />} />
          <Route path="/toilets/:id" element={<ToiletPage />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
