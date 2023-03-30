import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Signup from '../../pages/SignUpPage';
import LoginPage from '../../pages/LoginPage';
import Home from '../../pages/Home';
import ToiletPage from '../../pages/ToiletPage';
import ModalList from '../ModalList';

function App() {
  return (
    <main className="mx-auto max-w-6xl">
      <ModalList />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/toilet/:id" element={<ToiletPage />} />
      </Routes>
    </main>
  );
}

export default App;
