import React from 'react';
import * as THREE from "three";
import ThreeDScene from "./components/ThreeDScene";

function App() {
  let scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x000000, 0.6);
  let camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight);
  camera.position.set(0.5, 0.7, 0.5);
  camera.lookAt(scene.position);
  let renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  let clock = new THREE.Clock();
  let time = 0;
  document.body.appendChild(renderer.domElement);

  let xSize = 3;
  let ySize = 4;
  let zSize = 5;
  let n = xSize * ySize * zSize;

  let geometry = new THREE.BufferGeometry();
  geometry.dynamic = true;

  function mapTo3D(i) {
    let z = Math.floor(i / (xSize * ySize));
    i -= z * xSize * ySize;
    let y = Math.floor(i / xSize);
    let x = i % xSize;
    return { x: x, y: y, z: z };
  }

  function mapFrom3D(x, y, z) {
    return x + y * xSize + z * xSize * ySize;
  }

  let positions = [];
  for (let i = 0; i < n; i++) {
    let p = mapTo3D(i);
    positions.push((p.x - xSize / 2) / xSize);
    positions.push((p.y - ySize / 2) / ySize);
    positions.push((p.z - zSize / 2) / zSize);
  }
  let positionAttribute = new THREE.Float32BufferAttribute(positions, 3);
  geometry.addAttribute("position", positionAttribute);
  let points = new THREE.Points(
    geometry,
    new THREE.PointsMaterial({ size: 0.04 })
  );
  scene.add(points);

  let indexPairs = [];
  for (let i = 0; i < n; i++) {
    let p = mapTo3D(i);
    if (p.x + 1 < xSize) {
      indexPairs.push(i);
      indexPairs.push(mapFrom3D(p.x + 1, p.y, p.z));
    }
    if (p.y + 1 < ySize) {
      indexPairs.push(i);
      indexPairs.push(mapFrom3D(p.x, p.y + 1, p.z));
    }
    if (p.z + 1 < zSize) {
      indexPairs.push(i);
      indexPairs.push(mapFrom3D(p.x, p.y, p.z + 1));
    }
  }
  geometry.setIndex(indexPairs);
  let lines = new THREE.LineSegments(geometry, new THREE.LineBasicMaterial());
  scene.add(lines);

  function render() {
    requestAnimationFrame(render);
    time += clock.getDelta();
    for (let i = 0; i < n; i++) {
      let p = mapTo3D(i);
      let a = p.x + p.y + p.z;
      let b = 0.001 * Math.sin(5 * time + a);
      geometry.attributes.position.array[3 * i + 0] += b;
      geometry.attributes.position.array[3 * i + 1] += b;
      geometry.attributes.position.array[3 * i + 2] += b;
    }
    geometry.attributes.position.needsUpdate = true;
    renderer.render(scene, camera);
  }

  return (
    <div className="App">
      {render()}
    </div>
  );
}

export default App;
