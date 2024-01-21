import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "../pages/Main";
// import Homepage from "../pages/Homepage";
// import Catalog from "../pages/Catalog";
// import Manual from "../pages/Manual";
// import Reference from "../pages/Reference";
// import Feedback from "../pages/Feedback";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        {/* <Route path="Homepage" element={<Homepage />} />
        <Route path="Catalog" element={<Catalog />} /> */}
      </Route>
      {/* <Route path="/Manual" element={<Manual />} />
      <Route path="/Reference" element={<Reference />} />
      <Route path="/Feedback" element={<Feedback />} /> */}
    </Routes>
  );
}

export default App;
