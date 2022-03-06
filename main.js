import "./style.css";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { DragControls } from "three/examples/jsm/controls/DragControls.js";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector("#bg"),
});

const light = new THREE.PointLight();
light.position.set(2.5, 7.5, 15);
scene.add(light);

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  wireframe: true,
});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();
function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.02;
  torus.rotation.y += 0.001;
  torus.rotation.z += 0.001;
  // camera.position.z = 0.1;
  controls.update();
  renderer.render(scene, camera);
}

animate();

document.addEventListener("mousemove", (e) => {
  torus.position.x = e.x * 0.1 - 60;
  torus.position.y = e.y * 0.1 - 30;
});
document.addEventListener("keydown", function (event) {
  if (event.code == "ArrowUp") {
    torus.position.y += 0.5;
  } else if (event.code == "ArrowDown") {
    torus.position.y -= 0.5;
  } else if (event.code == "ArrowLeft") {
    torus.position.x -= 0.5;
  } else if (event.code == "ArrowRight") {
    torus.position.x += 0.5;
  }
});
