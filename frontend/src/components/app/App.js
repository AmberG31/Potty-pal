import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "../../pages/Home";
import ToiletPage from "../../pages/ToiletPage";

const App = () => {
  return (
    <BrowserRouter>
      <main className="max-w-6xl mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/toilet/:id" element={<ToiletPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
