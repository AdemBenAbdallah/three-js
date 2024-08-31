import gsap from "gsap";
import GUI from "lil-gui";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const gui = new GUI();

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update Sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update aspect
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Full Screen
window.addEventListener("dblclick", () => {
  !document.fullscreenElement
    ? canvas.requestFullscreen()
    : document.exitFullscreen();
});

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Crusor
const cursor = { x: 0, y: 0 };
window.addEventListener("mousemove", (e) => {
  cursor.x = e.clientX / sizes.width - 0.5;
  cursor.y = -(e.clientY / sizes.height - 0.5);
});

// Scene
const scene = new THREE.Scene();

const debugObjet = {
  color: 0xffbe6f,
};
// Object
const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
const material = ({ color }) =>
  new THREE.MeshBasicMaterial({ color: color, wireframe: true });
const mesh = new THREE.Mesh(geometry, material({ color: debugObjet.color }));
scene.add(mesh);

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Debug
gui.add(camera.position, "y").min(-3).max(3).step(0.01);
gui.add(mesh, "visible");
gui.add(mesh.material, "wireframe");
gui.addColor(debugObjet, "color").onChange(() => {
  material.color.set(debugObjet.color);
});

debugObjet.spin = () => {
  gsap.to(mesh.rotation, { y: mesh.rotation.y * Math.PI * 2 });
};
gui.add(debugObjet, "spin");

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.render(scene, camera);

// Animations
const tick = () => {
  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
  // camera.position.y = cursor.y * 5;
  camera.lookAt(mesh.position);

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
