import React, { Component } from "react";
import Scene from "../../components/Scene";
import * as THREE from "three";
import { Canvas, useFrame } from "react-three-fiber";

class SceneContainer extends Component {
  render() {
    return (
      <>
        <Canvas
         camera={{ position: [0,0,5]}}
         onCreated={({ gl }) => {
           gl.shadowMap.enabled = true
           gl.shadowMap.type = THREE.PCFSoftShadowMap
         }}
        >
          <ambientLight intensity={0.5} />
          <spotLight position={[15,20,5]} penumbra={1} castShadow />

        </Canvas>
        <h1>Hello Everyone</h1>
      </>
    );
  }
}

var container = document.createElement("div");
container.id = "canvas";
document.body.appendChild(container);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(container.offsetWidth, container.offsetHeight);

container.appendChild(renderer.domElement);

const styles = {
  sceneContainer: {
    top: 0,
    height: "70%",
    width: "100%",
    borderWidth: 1,
    borderBottomStyle: "solid",
    borderColor: "#000"
  }
};

export default SceneContainer;
