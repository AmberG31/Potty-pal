import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import ToiletList from "../toiletList/ToiletList";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ToiletList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
