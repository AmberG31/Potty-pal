import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "../../pages/Home";
import ToiletPage from "../../pages/ToiletPage";
import ModalList from "../ModalList";

const App = () => {
  return (
    <BrowserRouter>
      <main className="mx-auto max-w-6xl">
        <ModalList />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/toilet/:id" element={<ToiletPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
