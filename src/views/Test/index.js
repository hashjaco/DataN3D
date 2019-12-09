import React from "react";
import { Canvas } from "react-three-fiber";

import LeftContainer from "../../containers/LeftContainer";
import Scene from "../Test2";
import Controls from "../../components/Controls";
import Point from "../../components/Point";

import './index.css'

const Test = () => {
  return (
    <>
      <LeftContainer />
      <Canvas>
        <Scene />
        <Controls />
      </Canvas>
    </>
  );
};

export default Test;
