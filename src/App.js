import React, { useState } from "react";
import "./App.css";

import CardProfile, { Edit } from "./components/CardProfile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WebcamComp from "./components/WebcamComp";

export const DataContext = React.createContext();

function App() {
  const [data, setData] = useState({});
  return (
    <div className="App">
      <BrowserRouter>
        <DataContext.Provider
          value={{
            data,
            setData,
          }}
        >
          <Routes>
            <Route path="/" element={<CardProfile />} />
            <Route path="/Validation" element={<Edit name="Back" />} />
            <Route path="/Webcam" element={<WebcamComp />} />
          </Routes>
        </DataContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
