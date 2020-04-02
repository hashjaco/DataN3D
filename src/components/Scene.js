import React, { Component } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'
import * as THREE from 'three'

export default class Scene extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: []
    }
  }

  componentDidMount() {
    this.setState({
      data: this.props.data
    })
    var drawingSurface = document.getElementById('sceneContainer')
    var scene = new THREE.Scene()
    var camera = new THREE.PerspectiveCamera(
      75,
      drawingSurface.clientWidth / drawingSurface.clientHeight,
      0.1,
      1000
    )
    var renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: drawingSurface
    })

    renderer.setSize(500, 300)
    document.body.appendChild(renderer.domElement)

    const geometry = new THREE.BoxBufferGeometry(100, 100, 100)
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })

    const grid = new THREE.Mesh(geometry, material)

    scene.add(grid)
    camera.position.z = 50
  }

  render() {
    return <mesh id="sceneContainer" style={styles.sceneContainer} />
  }
}

const styles = {
  sceneContainer: {
    display: 'inline-block',
    flex: 1,
    position: 'relative',
    height: '100%',
    width: '100%'
  }
}
