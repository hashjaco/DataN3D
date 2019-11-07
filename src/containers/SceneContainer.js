import React, { Component } from "react";
import Scene from "../components/Scene";

const SceneContainer = props => {
  return <div style={sceneContainer}>
    <Scene />
  </div>;
};

const sceneContainer = {
  top: 0,
  height: "70%",
  width: "100%",
  borderWidth: 1,
  borderBottomStyle: "solid",
  borderColor: "#000"
};

export default SceneContainer;