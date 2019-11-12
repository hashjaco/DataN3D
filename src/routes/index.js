import React from "react";
import { Router } from "@reach/router";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "../views/Home";
import About from "../views/About";
import AboutUs from "../views/AboutUs";
import Jackie from "../views/AboutUs/Jackie";
import Marlon from "../views/AboutUs/Marlon";
import Hashim from "../views/AboutUs/Hashim";
import Test from "../views/Test";
import Test2 from "../views/Test2";

const Routes = () => {
  return (
    <Router>
      <Home path="/" />
      <About path="/about" />
      <AboutUs path="/team" />
      <Marlon path="/team/marlon" />
      <Jackie path="/team/jackie" />
      <Hashim path="/team/hashim" />
    </Router>
  );
};

export default Routes;
