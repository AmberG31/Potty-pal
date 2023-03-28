import Home from "./pages/Home.js";
import ToiletPage from "./pages/ToiletPage.js";
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
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
}

export default App;
