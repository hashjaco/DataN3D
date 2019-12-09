import React, { Component } from "react";
import * as THREE from "three";
import LeftContainer from "../../containers/LeftContainer";
import ObjectControls from "../../components/three-object-controls/ObjectControls";
import "../../App.css";

const dataArray = require("../../data/spiral");
const OrbitControls = require("three-orbit-controls")(THREE);

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

class Home extends Component {
  constructor(props) {
    super(props);

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.animate = this.animate.bind(this);
    this.mapDataTo3Dscene = this.mapDataTo3Dscene.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);
    this.controls = null

    this.state = {
      selectedObject: null,
    }
  }

  componentDidMount() {
    let camera, scene, renderer;
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

  updateObjectControls = (object) => {
    this.controls = new ObjectControls( this.camera, this.renderer, object )
    this.controls.setDistance(8, 200); // set min - max distance for zoom
    this.controls.setZoomSpeed(0.5); // set zoom speed
    this.controls.enableVerticalRotation();
    this.controls.setMaxVerticalRotationAngle(Math.PI / 4, Math.PI / 4);
    this.controls.setRotationSpeed(0.05);
    console.log("state has changed")
  }

  // This function will map any array of data points to our interactive grid
  mapDataTo3Dscene(dataArray, scene) {
    var max = 0;
    var min = 0;
    dataArray.map(data => {
      var dataGeometry = new THREE.SphereGeometry(.5,5,5);
      var point = new THREE.Vector3(data.x * 15, data.y * 15, data.z * 15);
      // dataGeometry.vertices.push(point);
      var dataMaterial = new THREE.PointsMaterial({ color: 0xeb4034 });
      var dataPoint = new THREE.Points(dataGeometry, dataMaterial);
      dataPoint.position.setX(data.x*15);
      dataPoint.position.setY(data.y*15);
      dataPoint.position.setZ(data.z*15);
      dataPoint.addEventListener('click', (object)=>{
        this.updateObjectControls(object)
      });
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
        <LeftContainer style={{ display: "inline-block", left: 0 }} />
        <div
          style={{ width: "75%", height: "80%", display: "inline-block", top: "auto",
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

export default Home;