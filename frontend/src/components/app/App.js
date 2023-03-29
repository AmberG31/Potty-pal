import React from "react";
import { Route, Routes } from "react-router-dom";

import Signup from "../../pages/SignUpPage";
import LoginPage from "../../pages/LoginPage";
import Home from "../../pages/Home";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default App;
