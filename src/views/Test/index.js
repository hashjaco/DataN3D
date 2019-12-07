import React, { Component, useState, useEffect, useContext } from "react";
import * as THREE from "three";
import { Canvas } from 'react-three-fiber'
import LeftContainer from "../../containers/LeftContainer";
import "../../App.css";
// import Point from "../../components/Point";
import { Vector3 } from "three";
import { SphereGeometry } from "three";
import { PointsMaterial } from "three";

const dataArray = require("../../data/spiral");
const OrbitControls = require("three-orbit-controls")(THREE);
const ObjectControls = require("../../components/three-object-controls/ObjectControls")

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

let selectedObject;
var objectControls;

let camera, scene, renderer;


const Point = props => {

  const { xVal, yVal, zVal } = props;

  const selectMe = (e) => {
    selectedObject = e.target;
    objectControls = new ObjectControls(camera, renderer.domElement, e.target)
  };

  return(
    <mesh
      onClick={(e)=> {
        console.log("clicked me");
        selectMe(e);
      }}
      position={new Vector3(xVal, yVal, zVal)}
      geometry={new SphereGeometry(1, 16, 16)}
      material={new PointsMaterial({ color: 0xffffff, transparent: true })}
    />
  )
};





class Home extends Component {
  constructor(props) {
    super(props);

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.animate = this.animate.bind(this);
    this.mapDataTo3Dscene = this.mapDataTo3Dscene.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);
  }

  componentDidMount() {
    const { clientWidth: width, clientHeight: height } = this.mount;

    // Foundational components of the WebGL/Three.js interactive scene
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true });

    // Collection of 3D objects created below

    // Cube start
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshNormalMaterial({ flatShading: true });
    const cube = new THREE.Mesh(geometry, material);
    // scene.add(cube)

    // Grid start
    const gridSize = 400;
    const divisions = 50;
    var gridX = new THREE.GridHelper(gridSize, divisions);
    var gridY = new THREE.GridHelper(gridSize, divisions);
    var gridZ = new THREE.GridHelper(gridSize, divisions);
    // gridZ.rotateZ(90);
    gridX.rotateX(1.571);
    gridZ.rotateZ(1.571);
    scene.add( gridX, gridY, gridZ );

    // Axes start
    const axisSize = 200;
    var axes = new THREE.AxesHelper( axisSize );
    scene.add( axes )

    // Data mapping start: dataArray is JSON imported
    this.mapDataTo3Dscene(dataArray, scene);

    camera.position.z = 200;
    camera.position.x = 200;
    camera.position.y = 200;
    renderer.setClearColor("#000000");
    renderer.setSize(width, height);

    this.scene = scene;
    this.camera = camera;

    this.renderer = renderer;
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.material = material;
    this.cube = cube;

    this.mount.appendChild(this.renderer.domElement);

    window.addEventListener( 'resize', this.onWindowResize, false );

    this.start();
  }

  onWindowResize() {
    this.camera.aspect = this.mount.clientWidth / this.mount.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize( window.innerWidth*.75, window.innerHeight*.7 );
  }

  componentWillUnmount() {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
  }

  start() {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  }

  stop() {
    cancelAnimationFrame(this.frameId);
  }

  animate() {
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;

    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  }

  // This function will map any array of data points to our interactive grid
  mapDataTo3Dscene(dataArray, scene) {
    var dataGeometry = new THREE.Geometry();
    var max = 0;
    var min = 0;
    dataArray.map(data => {
      if (data.z*15 < min) min = data.z*15;
      if (data.z*15 > max) max = data.z*15;
      var point = new THREE.Vector3(data.x * 15, data.y * 15, data.z * 15);
      dataGeometry.vertices.push(point);
      var dataMaterial = new THREE.PointsMaterial({ color: 0xffffff });
      var dataPoint = new THREE.Points(dataGeometry, dataMaterial);
      if (min < 0) dataPoint.position.z = min;
      // dataMap.position.z = 0 - (max + min) / 2;
      scene.add(dataPoint);
    });

  }

  renderScene() {
    this.renderer.render(this.scene, this.camera);
  }

  // Render our Home component
  render() {
    return (
      <div className="App" style={{ height: screenHeight, width: screenWidth }}>
        <LeftContainer style={{ display: "inline-block", left: 0, height: this.mount.clientHeight }}
        />
        <div
          style={{ width: "75%", height: "80%", display: "inline-block", top: "auto",
            margin: 0,
            position: "absolute", background: "transparent" }}
          ref={mount => {
            this.mount = mount;
          }}
        >
          <Canvas camera={this.camera} orthographic={false} children={this.mount}>
            <Point />
          </Canvas>
        </div>
      </div>
    );
  }
}

export default Home;