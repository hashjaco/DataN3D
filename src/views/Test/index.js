import React from "react";
import { Canvas, useThree } from "react-three-fiber";
import "../../App.css";
const dataArray = require("../../data/spiral");
const THREE = require("three");
const OrbitControls = require("three-orbit-controls")(THREE);

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

const sceneWidth = screenWidth * 0.7;
const sceneHeight = screenHeight * 0.8;

class Test extends React.Component {
  constructor(props){
    super(props);

    this.animate = this.animate.bind(this);
    this.initializeOrbits = this.initializeOrbits.bind(this);
    this.initializeCamera = this.initializeCamera.bind(this);
  }

  componentDidMount() {
    // Initializing Scene and Camera
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1000
    );
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.renderer.setSize(width, height);
    this.mount.appendChild(this.renderer.domElement);

    this.initializeCamera();
    this.initializeOrbits();

    // Build collection of 3D objects below

    // Axes start
    const size = 20;
    const divisions = 20;
    this.gridAxes = new THREE.GridHelper(size, divisions);
    this.scene.add( this.gridAxes );

    // Cube to start
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xff00ff });
    const cube = new THREE.Mesh(geometry, material);
    this.scene.add(cube);
    // End Cube

    // Imported data mapping
    // this.mapDataTo3Dscene(dataArray);
    // End Imported data mapping

    // End Collection of 3D objects
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.frameId);
    this.mount.removeChild(this.renderer.domElement);
  }

  initializeCamera() {
    this.camera.position.x = 0;
    this.camera.position.y = 0;
    this.camera.position.z = 40;
  }

  initializeOrbits() {
    this.controls.rotateSpeed = 1.0;
    this.controls.zoomSpeed = 1.2;
    this.controls.panSpeed = 0.8;
  }

  animate() {
    this.frameId = window.requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
  }

  /**
   * function mapDataTo3Dscene:
   * This function takes in an array from imported JSON file and maps it to the 3d scene. Basically the main shunt bunting.
   * @param dataArray
   * @param scene
   */
  mapDataTo3Dscene(dataArray) {
    var dataGeometry = new THREE.Geometry();

    dataArray.map(data => {
      var point = new THREE.Vector3(data.x, data.y, data.z);
      dataGeometry.vertices.push(point);
    });

    var dataMaterial = new THREE.PointsMaterial({ color: 0xffffff });
    var dataMap = new THREE.Points(dataGeometry, dataMaterial);
    this.scene.add(dataMap);
  }

  render() {
    return (
      <div className="App" style={{ height: screenHeight, width: screenWidth }}>
        <div
          id="boardCanvas"
          ref={(mount) => {
            this.mount = mount;
          }}
          style={{
            height: sceneHeight,
            width: sceneWidth,
            display: "inline-block",
            top: "auto",
            margin: 0,
            position: "absolute"
          }}
        />
      </div>
    );
  }
}

export default Test;