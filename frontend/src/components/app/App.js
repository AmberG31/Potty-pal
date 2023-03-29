import React from "react";
import { BrowserRouter, Route, Routes, redirect } from "react-router-dom";

import ToiletList from "../toiletList/ToiletList";
import SignUpForm from "../signUpForm/SignUpForm";
import LoginForm from "../loginForm/LoginForm";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} redirect={redirect} />
        <Route path="/signup" element={<SignUpForm />} redirect={redirect} />
        <Route path="/" element={<ToiletList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
