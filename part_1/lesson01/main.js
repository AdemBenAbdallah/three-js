import * as THREE from "three";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = ({ color }) => new THREE.MeshBasicMaterial({ color: color });
const mesh = new THREE.Mesh(geometry, material({ color: 0xff0000 }));
scene.add(mesh);

// Group
const group = new THREE.Group();
scene.add(group);
const cube1 = new THREE.Mesh(geometry, material({ color: 0x00ff00 }));
const cube2 = new THREE.Mesh(geometry, material({ color: 0xff0000 }));
const cube3 = new THREE.Mesh(geometry, material({ color: 0x0000ff }));

cube2.position.x = 2;
cube3.position.x = -2;
group.add(cube1, cube2, cube3);
group.position.y = 2;
group.scale.y = 2;

// Scale
mesh.scale.x = 2;
mesh.scale.y = 0.5;
mesh.scale.z = 0.5;

// Axes Helper
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

// Rotation
mesh.rotation.reorder("YXZ");
mesh.rotation.y = Math.PI * 0.25;
mesh.rotation.x = Math.PI * 0.25;

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.set(1, 1, 5);
scene.add(camera);

// Camera Controls
camera.lookAt(mesh.position);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
