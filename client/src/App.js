import React from "react";
import { Routes, Route } from "react-router-dom";
import WireFrameMaker from "./WireFrameMaker";
import Home from "./Home";
import Navbar from "./Navbar";
import HowToUse from "./HowToUse";
// import AboutTheAuthor from "./AboutTheAuthor";
import './App.css';
// import Modal from "./Modal";

const App = () => {
  return (
    <div className="App">
      <div className="content-container">
      {/* <WireFrameMaker/> */}
      <>
        <Navbar />
      </>

      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/wireframe-maker" element={<WireFrameMaker />} />
        <Route path="/how-to-use" element={<HowToUse />} />
        {/* <Route path="/about-the-author" element={<AboutTheAuthor />} /> */}
      </Routes>
      </div>
    </div>
  );
};

export default App;
