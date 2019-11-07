import React, { Component } from "react";
import * as THREE from "three";

export default class ThreeDScene extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fieldOfView: 60,
      aspectRatio: window.innerWidth / window.innerHeight,
      nearView: 0.1,
      farView: 1000,
      gridWidth: 10,
      gridHeight: 10,
      gridDepth: 10,
      gridColor: 0xffffff,
      numDataPoints: 1000
    };

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      this.state.fieldOfView,
      this.state.aspectRatio,
      this.state.nearView,
      this.state.farView
    );
    this.clock = new THREE.Clock();
    this.time = 0;
    this.renderer = new THREE.WebGLRenderer();
    this.gridGeometry = new THREE.BufferGeometry();
    this.material = new THREE.MeshBasicMaterial({ color: 0xfffffff });
    this.grid = new THREE.Mesh(this.gridGeometry, this.material);
    this.positionAttribute = new THREE.Float32BufferAttribute(this.getPositions(), 3);

  }

  mapTo3D = i => {
    let z = Math.floor((i / this.state.gridWidth) * this.state.gridHeight);
    i -= z * this.state.gridWidth * this.state.gridHeight;
    let y = Math.floor((i / this.state.gridWidth) * this.state.gridDepth);
    let x = i % this.state.gridWidth;
    return { x: x, y: y, z: z };
  };

  mapFrom3D = (x, y, z) => {
    return (
      x +
      y * this.state.gridWidth +
      z * this.state.gridHeight * this.state.gridDepth
    );
  };

  componentDidMount = () => {
    // Create the scene, camera, and set their configurations


    this.gridGeometry.addAttribute("position", this.positionAttribute);
    this.gridGeometry.setIndex(this.getIndexPairs());
    let lines = new THREE.LineSegments(this.gridGeometry, new THREE.LineBasicMaterial());
    this.camera.position.set(0.5, 0.7, 0.5);
    this.camera.lookAt(this.scene.position);
    this.scene.add(lines, this.grid);
    let points = new THREE.Points(
      this.gridGeometry,
      new THREE.PointsMaterial({ size: 0.04 })
    );
    this.scene.add(points);

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
    this.renderGrid();
  };

  renderGrid = () => {
    requestAnimationFrame(this.renderGrid);
    this.time += this.clock.getDelta();
    for (let i = 0; i < this.state.numDataPoints; i++) {
      let p = this.mapTo3D(i);
      let a = p.x + p.y + p.z;
      let b = 0.001 * Math.sin(5 * this.time + a);
      this.gridGeometry.attributes.position.array[3 * i] += b;
      this.gridGeometry.attributes.position.array[3 * i + 1] += b;
      this.gridGeometry.attributes.position.array[3 * i + 2] += b;
    }
    this.gridGeometry.attributes.position.needsUpdate = true;
    this.renderer.render(this.scene, this.camera);
  }

  getPositions = () => {
    let positions = [];
    let gridWidth = this.state.gridWidth;
    let gridHeight = this.state.gridHeight;
    let gridDepth = this.state.gridDepth;
    for (let i = 0; i < this.state.numDataPoints; i++) {
      let pos = this.mapTo3D(i);
      if (pos.x + 1 < gridWidth) {
        positions.push((pos.x - gridWidth / 2) / gridWidth);
        positions.push((pos.y - gridHeight / 2) / gridHeight);
        positions.push((pos.z - gridDepth / 2) / gridDepth);
      }
    }
    return positions;
  };

  getIndexPairs = () => {
    let indexPairs = [];
    for (let i = 0; i < this.state.numDataPoints; i++) {
      let p = this.mapTo3D(i);
      if (p.x + 1 < this.state.gridWidth) {
        indexPairs.push(i);
        indexPairs.push(this.mapFrom3D(p.x + 1, p.y, p.z));
      }
      if (p.y + 1 < this.state.gridHeight) {
        indexPairs.push(i);
        indexPairs.push(this.mapFrom3D(p.x, p.y + 1, p.z));
      }
      if (p.z + 1 < this.state.gridDepth) {
        indexPairs.push(i);
        indexPairs.push(this.mapFrom3D(p.x, p.y, p.z + 1));
      }
    }
    return indexPairs
  };

  render() {
    return <div />;
  }
}
