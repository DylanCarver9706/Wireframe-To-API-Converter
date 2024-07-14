import React from "react";
import { Routes, Route } from "react-router-dom";
import WireFrameMaker from "./WireFrameMaker";
import Home from "./Home";
import Navbar from "./Navbar";
import HowToUse from "./HowToUse";
import './App.css';

const App = () => {
  return (
    <div className="App">
      <div className="content-container">
      <>
        <Navbar />
      </>

      <Routes>
        <Route path="/Wireframe-To-API-Converter" exact element={<Home />} />
        <Route path="Wireframe-To-API-Converter/wireframe-maker" element={<WireFrameMaker />} />
        <Route path="Wireframe-To-API-Converter/how-to-use" element={<HowToUse />} />
      </Routes>
      </div>
    </div>
  );
};

export default App;
