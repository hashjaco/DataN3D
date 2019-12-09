import React from "react";
import LeftContainer from "../../containers/LeftContainer";
import "./index.css";

const THREE = require('three');
const OrbitControls = require("three-orbit-controls")(THREE);
const dataArray = require("../../data/spiral");

 function load() {
   var div = document.getElementById("data-points-wrapper");
  for (var i = 0; i < dataArray.length / divider; i++) {
    div.innerHTML =
      div.innerHTML +
      "<button class='inner' id=" +
      i +
      ">" +
      dataArray[i].name +
      "</button>" +
      "<br>";
  }

  var buttons = document.getElementsByTagName("button");
  var buttonsCount = buttons.length;
  for (var i = 0; i < buttonsCount; i++) {
    buttons[i].onclick = function(e) {
      focusCamera(this.id);
    };
  }
}

let scene, camera, renderer, light1, rayCast, mouse, controls, container;
let spheres = [];
let ADD = 0.003,
  theta = 0;
const RADIUS = 0.1,
  BASE_X = 0,
  BASE_Y = 0,
  divider = 10;
const CANVAS_WIDTH = 1100,
  CANVAS_HEIGHT = 500;

let onMouseClick = function(e) {
  var rect = renderer.domElement.getBoundingClientRect();
  mouse.x = ((e.clientX - rect.left) / (rect.right - rect.left)) * 2 - 1;
  mouse.y = -((e.clientY - rect.top) / (rect.bottom - rect.top)) * 2 + 1;

  rayCast.setFromCamera(mouse, camera);
  var intersects = rayCast.intersectObjects(scene.children);
  if (intersects.length == 0) return;
  let hit = intersects[0].object;

  spheres.forEach((s, ind) => {
    if (s.object == hit) {
      //retarget orbit controls
      controls.target = new THREE.Vector3(s.get_x(), s.get_y(), s.get_z());
      controls.update();

      console.log(
        s.get_x() + " " + s.get_y() + " " + s.get_z() + " " + s.get_name()
      );

      var div = document.getElementById("data-description");
      div.innerHTML = "";
      div.innerHTML =
        div.innerHTML +
        "<p>Name: " +
        s.get_name() +
        ", Location: X = " +
        s.get_x() +
        ", Y = " +
        s.get_y() +
        ", Z = " +
        s.get_z() +
        "</p>";
    }
  });
};

let focusCamera = function(pos) {
  controls.target = new THREE.Vector3(
    spheres[pos].get_x(),
    spheres[pos].get_y(),
    spheres[pos].get_z()
  );
  controls.update();

  var div = document.getElementById("data-description");
  div.innerHTML = "";
  div.innerHTML =
    div.innerHTML +
    "<p>Name: " +
    spheres[pos].get_name() +
    ", Location: X = " +
    spheres[pos].get_x() +
    ", Y = " +
    spheres[pos].get_y() +
    ", Z = " +
    spheres[pos].get_z() +
    "</p>";
};

class sphere {
  constructor(pos) {
    this.x_pos = pos.x;
    this.y_pos = pos.y;
    this.z_pos = pos.z;
    this.name = pos.name;
    let geometry = new THREE.SphereGeometry(RADIUS, 30, 30);
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

let init = function() {
  // create the scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xababab);

  // create an locate the camera
  camera = new THREE.PerspectiveCamera(
    75,
    CANVAS_WIDTH / CANVAS_HEIGHT,
    1,
    1000
  );

  camera.position.set(5, 5, 25);

  //lighting effects
  light1 = new THREE.DirectionalLight(0xffffff, 1);
  light1.position.set(0, 10, 15);
  scene.add(light1);

  //createTheSpheres();
  for (let i = 0; i < dataArray.length / divider; i++) {
    spheres.push(new sphere(dataArray[i]));
  }

  //create rayCaster
  rayCast = new THREE.Raycaster();
  mouse = new THREE.Vector2();
  mouse.x = mouse.y = -1;

  // creates the axis on the screen
  let axes = new THREE.AxesHelper(20);
  scene.add(axes);

  // create the renderer
  renderer = new THREE.WebGLRenderer();
  //renderer.setSize(window.innerWidth, window.innerHeight);

  container = document.getElementById("canvas");
  document.body.appendChild(container);
  renderer.setSize(CANVAS_WIDTH, CANVAS_HEIGHT);
  container.appendChild(renderer.domElement);

  //add event lister for the click function
  document.addEventListener("click", onMouseClick, false);

  controls = new OrbitControls(camera, renderer.domElement);

  //testing controls
  camera.position.set(5, 5, 10);
  controls.update();
};

// main animation loop
let mainLoop = function() {
  renderer.render(scene, camera);
  requestAnimationFrame(mainLoop);
};



class Test extends React.Component {
  componentDidMount() {
    init();
    mainLoop();
  }

  render() {
    return (
      <div onLoad={load} style={{ display: 'block'}}>
        <LeftContainer />
        <div id="canvas-wrapper">
          <div id="canvas" />
          <div id="data-description-container"><p id="data-description" /></div>
        </div>
        <div id="data-points-wrapper" />
      </div>
    );
  }
}

export default Test;
