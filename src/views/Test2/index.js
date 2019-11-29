import React, { Component } from "react";
import * as THREE from "three";
import LeftContainer from "../../containers/LeftContainer";
import "../../App.css";
const dataArray = require("../../data/spiral");
const OrbitControls = require("three-orbit-controls")(THREE);

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

const sceneWidth = screenWidth * 0.75;
const sceneHeight = screenHeight * 0.8;

class Test2 extends Component {
  constructor(props) {
    super(props);

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.animate = this.animate.bind(this);
    this.mapDataTo3Dscene = this.mapDataTo3Dscene.bind(this);
  }

  componentDidMount() {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;

    // Foundational components of the WebGL/Three.js interactive scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    // Collection of 3D objects created below
    // Cube start
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: "#433F81" });
    const cube = new THREE.Mesh(geometry, material);
    // scene.add(cube)

    // Grid start
    const gridSize = 400;
    const divisions = 50;
    var grid = new THREE.GridHelper(gridSize, divisions);
    scene.add( grid );

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
    this.start();
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
    dataArray.map(data => {
      var point = new THREE.Vector3(data.x * 15, data.y * 15, data.z * 15);
      dataGeometry.vertices.push(point);
    });
    var dataMaterial = new THREE.PointsMaterial({ color: 0xffffff });
    var dataMap = new THREE.Points(dataGeometry, dataMaterial);
    scene.add(dataMap);
  }

  renderScene() {
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    return (
      <div className="App" style={{ height: screenHeight, width: screenWidth }}>
        <LeftContainer style={{ display: "inline-block", left: 0 }}
        />
        <div
          style={{ width: sceneWidth, height: sceneHeight, display: "inline-block", top: "auto",
            margin: 0,
            position: "absolute" }}
          ref={mount => {
            this.mount = mount;
          }}
        />
      </div>
    );
  }
}

export default Test2;