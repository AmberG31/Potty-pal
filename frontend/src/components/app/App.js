import React, { useContext } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import ToiletList from "../toiletList/ToiletList";
import SignUpForm from "../signUpForm/SignUpForm";
import LoginForm from "../loginForm/LoginForm";
import { AuthContext } from "../../context/AuthContext";

const App = () => {
  const { token } = useContext(AuthContext);
  return (
    <Routes>
      <Route path="/login" element={<LoginForm navigate={useNavigate()} />} />
      <Route path="/signup" element={<SignUpForm navigate={useNavigate()} />} />
      <Route path="/" element={<ToiletList />} />
    </Routes>
  );
};

export default App;
