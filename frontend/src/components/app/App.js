import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Signup from "../../pages/SignUpPage";
import LoginPage from "../../pages/LoginPage";
import Home from "../../pages/Home";
import { AuthContext } from "../../context/AuthContext";

const App = () => {
  const { token } = useContext(AuthContext);
  return (
    <Routes>
      <Route
        path="/login"
        element={token ? <Navigate to="/" /> : <LoginPage />}
      />
      <Route
        path="/signup"
        element={token ? <Navigate to="/" /> : <Signup />}
      />
      <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
