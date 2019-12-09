import React, { Component } from "react";
import * as THREE from "three";
import LeftContainer from "../../containers/LeftContainer";
import ObjectControls from "../../components/three-object-controls/ObjectControls";
import "./index.css";

const dataArray = require("../../data/spiral");
const OrbitControls = require("three-orbit-controls")(THREE);

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

var scene;

class sphere {
  constructor(pos) {
    this.x_pos = pos.x;
    this.y_pos = pos.y;
    this.z_pos = pos.z;
    this.name = pos.name;
    let geometry = new THREE.SphereGeometry(this.RADIUS, 30, 30);
    let material = new THREE.MeshPhongMaterial({
      color: 0x0000ff,
      shininess: 100,
      side: THREE.DoubleSide
    });
    let s = new THREE.Mesh(geometry, material);
    s.position.set(this.x_pos, this.y_pos, this.z_pos);
    this.object = s;
    scene.add(s);
  }
  get_x() {
    return this.x_pos;
  }
  get_y() {
    return this.y_pos;
  }
  get_z() {
    return this.z_pos;
  }
  get_name() {
    return this.name;
  }
}

class Test2 extends Component {
  constructor(props) {
    super(props);

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.animate = this.animate.bind(this);
    this.mapDataTo3Dscene = this.mapDataTo3Dscene.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);

    this.camera = null;
    scene = null;
    this.renderer = null;
    this.light1 = null;
    this.rayCast = null;
    this.mouse = null;
    this.controls = null;
    this.intersects = null;
    this.container = null;

    this.ADD = 0.003;
    this.theta = 0;
    this.RADIUS = 0.1;
    this.BASE_X = 0;
    this.BASE_Y = 0;
    this.divider = 10;

    this.cube = null
    this.spheres = [];

    this.state = {
      selectedObject: null
    };
  }

  onMouseClick = e => {
    var rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((e.clientX - rect.left) / (rect.right - rect.left)) * 2 - 1;
    this.mouse.y = -((e.clientY - rect.top) / (rect.bottom - rect.top)) * 2 + 1;

    this.rayCast.setFromCamera(this.mouse, this.camera);
    this.intersects = this.rayCast.intersectObjects(scene.children);
    if (this.intersects.length === 0) return;
    let hit = this.intersects[0].object;

    this.spheres.forEach((s, ind) => {
      if (s.object === hit) {
        //retarget orbit controls
        this.controls.target = new THREE.Vector3(
          s.get_x(),
          s.get_y(),
          s.get_z()
        );
        this.controls.update();

        console.log(
          s.get_x() + " " + s.get_y() + " " + s.get_z() + " " + s.get_name()
        );

        var div = document.getElementById("data-description");
        div.innerHTML = "";
        div.innerHTML = div.innerHTML + `<p>Name: ${s.get_name()}, Location: X = ${s.get_x()}, Y = ${s.get_y()}, Z = ${s.get_z()}</p>`;
      }
    });
  };

  focusCamera = pos => {
    this.controls.target = new THREE.Vector3(
      this.spheres[pos].get_x(),
      this.spheres[pos].get_y(),
      this.spheres[pos].get_z()
    );
    this.controls.update();

    var div = document.getElementById("data-description");
    div.innerHTML = "";
    div.innerHTML =
      div.innerHTML +
      "<p>Name: " +
      this.spheres[pos].get_name() +
      ", Location: X = " +
      this.spheres[pos].get_x() +
      ", Y = " +
      this.spheres[pos].get_y() +
      ", Z = " +
      this.spheres[pos].get_z() +
      "</p>";
  };

  componentDidMount() {
    // let camera, scene, renderer, light1, rayCast, mouse, controls, container;
    const { clientWidth: width, clientHeight: height } = this.mount;
    // this.spheres = [];
    this.ADD = 0.003;
    this.theta = 0;
    this.RADIUS = 0.1;
    this.BASE_X = 0;
    this.BASE_Y = 0;
    this.divider = 10;

    // Foundational components of the WebGL/Three.js interactive scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xababab);
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.set(5, 5, 25);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });

    //lighting effects
    this.light1 = new THREE.DirectionalLight(0xffffff, 1);
    this.light1.position.set(0, 10, 15);
    scene.add(this.light1);

    //createTheSpheres();
    for (let i = 0; i < dataArray.length / this.divider; i++) {
      this.spheres.push(new sphere(dataArray[i]));
    }

    //create rayCaster
    this.rayCast = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.mouse.x = this.mouse.y = -1;

    document.addEventListener("click", this.onMouseClick, false);


    // Collection of 3D objects created below

    // Cube start
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshNormalMaterial({ flatShading: true });
    this.cube = new THREE.Mesh(geometry, material);
    // scene.add(this.cube)

    // Grid start
    const gridSize = 400;
    const divisions = 50;
    var gridX = new THREE.GridHelper(gridSize, divisions);
    var gridY = new THREE.GridHelper(gridSize, divisions);
    var gridZ = new THREE.GridHelper(gridSize, divisions);
    // gridZ.rotateZ(90);
    gridX.rotateX(1.571);
    gridZ.rotateZ(1.571);
    scene.add(gridX, gridY, gridZ);

    // Axes start
    const axisSize = 200;
    var axes = new THREE.AxesHelper(axisSize);
    scene.add(axes);

    // Data mapping start: dataArray is JSON imported
    // this.mapDataTo3Dscene(dataArray, scene);

    this.renderer.setClearColor("#000000");
    this.renderer.setSize(width, height);

    // scene = scene;
    // this.camera = camera;
    //
    // this.renderer = renderer;
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    //
    // this.material = material;

    this.mount.appendChild(this.renderer.domElement);

    window.addEventListener("resize", this.onWindowResize, false);

    this.start();
  }

  onWindowResize() {
    this.camera.aspect = this.mount.clientWidth / this.mount.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth * 0.75, window.innerHeight * 0.7);
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

  updateObjectControls = object => {
    this.controls = new ObjectControls(this.camera, this.renderer, object);
    this.controls.setDistance(8, 200); // set min - max distance for zoom
    this.controls.setZoomSpeed(0.5); // set zoom speed
    this.controls.enableVerticalRotation();
    this.controls.setMaxVerticalRotationAngle(Math.PI / 4, Math.PI / 4);
    this.controls.setRotationSpeed(0.05);
    console.log("state has changed");
  };

  // This function will map any array of data points to our interactive grid
  mapDataTo3Dscene(dataArray, scene) {
    dataArray.map(data => {
      var dataGeometry = new THREE.SphereGeometry(0.5, 5, 5);
      var point = new THREE.Vector3(data.x * 15, data.y * 15, data.z * 15);
      // dataGeometry.vertices.push(point);
      var dataMaterial = new THREE.PointsMaterial({ color: 0xeb4034 });
      var dataPoint = new THREE.Points(dataGeometry, dataMaterial);
      dataPoint.position.setX(data.x * 15);
      dataPoint.position.setY(data.y * 15);
      dataPoint.position.setZ(data.z * 15);
      dataPoint.addEventListener("click", object => {
        this.updateObjectControls(object);
      });
      scene.add(dataPoint);
    });
  }

  renderScene() {
    this.renderer.render(scene, this.camera);
  }

  // Render our Home component
  render() {
    return (
      <div className="App" style={{ height: screenHeight, width: screenWidth }}>
        <LeftContainer style={{ display: "inline-block", left: 0 }} />
        <div
          style={{
            width: "75%",
            height: "80%",
            display: "inline-block",
            top: "auto",
            margin: 0,
            position: "absolute"
          }}
          ref={mount => {
            this.mount = mount;
          }}
          onLoad={this.load}
        />
        <div id="data-description-container">
          <p id="data-description" />
        </div>
      </div>
    );
  }
}

export default Test2;
