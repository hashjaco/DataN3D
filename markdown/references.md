# This is where all the junk code ends up

> Main purpose of this file is to have code to look back on because code can look messy when when its comments every other line

## Code

Setting up your canvas, scene, geometry, and mesh

> Turns out there is an easier way thanks to the _three-three-fiber_ library

```javascript
const sketch = ({ context }) => {
  // Create the renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: context.canvas
  })

  // Set a nice background color
  renderer.setClearColor('#FFEEE4', 1)

  // Time for the cam setup
  const camera = new THREE.PerspectiveCamera(50, 1, 0.01, 100)
  camera.position.set(0, 0, -4)
  camera.lookAt(new THREE.Vector3())

  // Setting up camera controller
  const controls = new OrbitControls(camera, context.canvas)

  // Setup the Scene
  const scene = new THREE.Scene()

  // Geometry Setup
  const geometry = new THREE.SphereGeometry(1, 32, 16)

  // Material Setup
  const material = new THREE.MeshBasicMaterial({
    color: '#6E7783'
  })

  // Mesh
  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)

  // return each drawn frame
  return {
    // Handle Resize events
    resize({ pixelRatio, viewportWidth, viewportHeight }) {
      renderer.setPixelRatio(pixelRatio)
      renderer.setSize(pixelRatio)
      camera.aspect = viewportWidth / viewportHeight
      camera.updateProjectionMatrix()
    },

    // Update & render the scence
    render({ time }) {
      controls.update()
      renderer.render(scene, camera)
    },
    // Clean up events
    unload() {
      controls.dispose()
      renderer.dispose()
    }
  }
}
```

But when you're finish reading this you can head back to the [README]('../README.md')
