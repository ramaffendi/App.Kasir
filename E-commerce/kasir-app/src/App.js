import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BasicExample from "./Component/Navbar";
import { Home, Sukses } from "./Pages/Index";

export default class App extends Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <BasicExample />
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/sukses" element={<Sukses />} exact />
          </Routes>
        </BrowserRouter>
      </>
    );
  }
}
